import { integer } from "@utils/index";
import React, { useState } from "react"
import { Button } from "./button";
import { Input } from "./input";
import { Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";

interface CounterProps {
    count?: any,
    onChange?: (value: number) => void
}

export const CounterButton: React.FC<CounterProps> = ({ count, onChange }) => {
    const [value, setValue] = useState(integer(count) || 0);

    const handleChange = (increment: boolean) => {
        if (increment) {
            setValue(prev => prev + 1)
        }
        else {
            setValue(prev => prev - 1)
        }

        onChange?.(value);
    }


    return (
        <div>
            <div className="flex items-center border border-slate-300 rounded-3xl p-1">
                <button
                    className="rounded-full cursor-pointer p-1.5 hover:bg-gray-200 transition-colors"
                    onClick={() => handleChange(false)}
                >
                    <MinusIcon className="size-5" />
                </button>

                <input
                    className="text-sm text-center h-full outline-none px-2 w-10"
                    type="number"
                    onChange={(e) => setValue(integer(e.target.value))}
                    defaultValue={count}
                />

                <button
                    className="rounded-full cursor-pointer p-1.5 hover:bg-gray-200 transition-colors"
                    onClick={() => handleChange(true)}
                >
                    <PlusIcon className="size-5" />
                </button>
            </div></div>
    )
}