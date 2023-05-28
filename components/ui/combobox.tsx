"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type comboboxItem = {
    value: string
    label: string
}

export interface ComboboxProps {
    placeholder: string
    searchHint: string
    items: Array<comboboxItem>
    handleSelect?: (item: comboboxItem) => void
}

export function Combobox({ 
    placeholder, 
    searchHint, 
    items,
    handleSelect
} : ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<comboboxItem | undefined>(undefined)

  const onSelect = (currentValue: string, selectedItem: comboboxItem) => {
    setSelected(currentValue === selected?.label.toLowerCase() ? undefined : selectedItem)
    setOpen(false)

    if(handleSelect) handleSelect(selectedItem)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selected
            ? items.find((item) => item.value.toLowerCase() === selected.value.toLowerCase())?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={searchHint} />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={(currentValue) => onSelect(currentValue, item)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected?.value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
