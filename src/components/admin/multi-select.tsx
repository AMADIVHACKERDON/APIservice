"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select…",
  emptyText = "Nothing found.",
}: {
  options: Option[];
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  emptyText?: string;
}) {
  const [open, setOpen] = useState(false);

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {selected.length > 0
              ? `${selected.length} selected`
              : placeholder}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search…" />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={`${option.label} ${option.hint ?? ""}`}
                    onSelect={() => toggle(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    <span className="flex-1">{option.label}</span>
                    {option.hint && (
                      <span className="text-xs text-muted-foreground">
                        {option.hint}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value) => {
            const option = options.find((o) => o.value === value);
            if (!option) return null;
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggle(value)}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs transition hover:bg-secondary"
              >
                {option.label}
                <X className="size-3" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
