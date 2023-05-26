"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { 
    Droppable, 
    DragDropContext, 
    Draggable 
} from "react-beautiful-dnd"


const initialData = {
    seats: ["A1", "A2", "A3"]
}

export default function SeatPlanMaker() {
    const queryAttr = "data-rbd-drag-handle-draggable-id";
    const [state, setState] = useState(initialData);
    const [placeholderProps, setPlaceholderProps] = useState({});

    const reorderSeats = (seats: Array<any>, startIndex: number, endIndex: number) => {
        const newTaskList = Array.from(seats);
        const [removed] = newTaskList.splice(startIndex, 1);
        newTaskList.splice(endIndex, 0, removed);
        return newTaskList;
    };

    const removeSeat = (seats: Array<any>, startIndex: number, endIndex: number) => {
        const newTaskList = Array.from(seats);
        return newTaskList
    };

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
        const { seats } = state;
        const newSeats = reorderSeats(seats, source.index, destination.index);
    
        const newState = {
          ...state,
          seats: newSeats,
        };
        setState(newState)
    }

    return (
        <div className="mx-auto mt-4">
            
            <Card className="w-full">
                <CardHeader className="flex">
                    <CardTitle>Seat plan maker</CardTitle>
                    <div>

                    </div>
                </CardHeader>
                <Separator />
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex flex-grow h-[600px]">
                        <div className="basis-2/3">
                            <Droppable droppableId="plan">
                                {(droppableProvided) => (
                                    <div
                                        className="h-full"
                                        {...droppableProvided.droppableProps}
                                        ref={droppableProvided.innerRef}
                                    >

                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div className="basis-1/3 bg-sky-50 border-l-2">
                            <Droppable droppableId="seats">
                                {(droppableProvided) => (
                                    <div
                                        className="h-full"
                                        {...droppableProvided.droppableProps}
                                        ref={droppableProvided.innerRef}
                                    >
                                        {state.seats.map((seat, index) => (
                                            <Draggable key={index} index={index} draggableId={String(index)}>
                                                {(draggableProvided, draggableSnapshot) => (
                                                    <div 
                                                        className={`w-20 h-20 flex justify-center items-center border rounded-sm ${draggableSnapshot.isDragging ? 'bg-indigo-100' : 'bg-indigo-400'}`}
                                                        {...draggableProvided.dragHandleProps}
                                                        {...draggableProvided.draggableProps}
                                                        ref={draggableProvided.innerRef}
                                                    >
                                                        <h1>{seat}</h1>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {droppableProvided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                </DragDropContext>
            </Card>
        </div>
    )
}