"use client"

import { departure } from '@/types/departure'
import React, { useEffect, useMemo, useState } from 'react'
import { Combobox, comboboxItem } from './ui/combobox'
import { 
    Droppable, 
    DragDropContext, 
    Draggable 
} from "react-beautiful-dnd"
import { XIcon } from 'lucide-react'

export interface RouteMakerProps {
    places: Array<departure>,
    initials: Array<departure>,
    onChange?: (places: Array<departure>) => void
}

export default function RouteMaker({ places, initials, onChange }: RouteMakerProps) {
    const queryAttr = "data-rbd-drag-handle-draggable-id";
    const [state, setState] = useState({
        places: initials
    });

    useEffect(() => {
        if(onChange) onChange(state.places)
    }, [state])

    const placesMap = useMemo(() => {
        return places.reduce((placesMap, place, index) => {
            placesMap[place.id || String(index)] = place
            return placesMap
        }, {} as {[key: string | number]: departure})
    }, [places, initials])

    const routePlacesMap = useMemo(() => {
        return state.places.reduce((placesMap, place, index) => {
            placesMap[place.id || String(index)] = place
            return placesMap
        }, {} as {[key: string | number]: departure})
    }, [state])

    const selectablePlaces = places.filter((place, index) => !routePlacesMap[place.id || index])

    const reorderPlaces = (places: Array<any>, startIndex: number, endIndex: number) => {
        const newPlaceList = Array.from(places);
        const [removed] = newPlaceList.splice(startIndex, 1);
        newPlaceList.splice(endIndex, 0, removed);
        return newPlaceList;
    };

    const removePlace = (place: departure) => {
        let index = 0
        let newPlaces = [...state.places]

        do {
            index = newPlaces.findIndex((item) => item.id === place.id)
    
            if(index >= 0) {
                newPlaces.splice(index, 1)
            } else {
                const newState = {
                    places: newPlaces,
                };
                setState(newState)
            }
        } while(index >= 0)
    };

    const addPlace = (newPlace: departure) => {
        const newState = {
            places: [...state.places, newPlace],
        };
        setState(newState)
    }

    const getDraggedDom = (draggableId: string) => {
        const domQuery = `[${queryAttr}='${draggableId}']`;
        const draggedDOM = document.querySelector(domQuery);
    
        return draggedDOM;
    };
    
    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        // if the user drops outside of a droppable destination
        if (!destination) { return; }
    
        // If the user drags and drops back in the same position
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
            return;
        }
    
        // If the user drops in a different postion
        const { places } = state;
        const newPlaces = reorderPlaces(places, source.index, destination.index);
    
        const newState = {
          ...state,
          places: newPlaces,
        };
        setState(newState)
    }

    const handleSelectPlace = (item: comboboxItem | undefined) => {
        if(item) addPlace(placesMap[item.value])
    }

    return (
        <div className="flex flex-col min-h-[240px]">
            <Combobox 
                placeholder="Add place" 
                searchHint="Search place" 
                items={selectablePlaces.map((departure, index) => ({
                    value: departure.id || String(index),
                    label: departure.city
                }))}
                handleSelect={handleSelectPlace}
            />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="border border-dashed bg-gray-50 flex-1">
                    <Droppable droppableId="places">
                        {(droppableProvided) => (
                            <div
                                className="h-full"
                                {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef}
                            >
                                {state.places.map((place, index) => (
                                    <Draggable key={index} index={index} draggableId={String(index)}>
                                        {(draggableProvided, draggableSnapshot) => (
                                            <div 
                                                className={`
                                                    flex items-center border rounded-sm space-x-2 p-2
                                                    ${draggableSnapshot.isDragging ? 'bg-blue-100' : 'bg-blue-400'}
                                                `}
                                                {...draggableProvided.dragHandleProps}
                                                {...draggableProvided.draggableProps}
                                                ref={draggableProvided.innerRef}
                                            >
                                                <div className="text-white text-xs">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1 text-white text-xs">
                                                    {place.city}
                                                </div>
                                                <div 
                                                    className="rounded-full bg-blue-300 p-1 cursor-pointer"
                                                    onClick={() => removePlace(place)}
                                                >
                                                    <XIcon size="16" color="white" />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}
