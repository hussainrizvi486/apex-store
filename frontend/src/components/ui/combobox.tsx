import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { ChevronsUpDown, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger, } from "@components/ui/popover";
import { cn } from '@utils/index';
import { Spinner } from '@components/loaders/spinner';


export interface Option {
    label: string;
    value: string;
}

interface ComboBoxProps {
    options?: Option[];
    className?: string;
    label?: string;
    placeholder?: string;
    getOptions?: () => Promise<{ label: string; value: string }[]>; onChange?: (option: Option | null) => void;
    value?: Option | null | undefined;
    renderOption?: (option: Option, current: Option | null | undefined) => React.ReactNode;
}


const defaultRenderOption = (option: Option | null, current: Option | null | undefined) => {
    if (!option) return null;

    return (
        <div className=''>
            <div className='flex-1 truncate text-sm'>{option.label}</div>

        </div>
    )
};


export const ComboBox: React.FC<ComboBoxProps> = ({
    options = [],
    className = "",
    placeholder = "Search",
    onChange,
    value,
    getOptions,
    renderOption
}) => {

    const [results, setResults] = useState<Option[]>(options);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Option | null | undefined>(value);


    const handleSelect = (option: Option) => {
        setSelected(option);
        onChange?.(option);
        setOpen(false);
    };


    useEffect(() => {
        if (getOptions) {
            const obj = getOptions();

            if (obj instanceof Promise) {
                obj.then((data) => {
                    setResults(data);
                });
            }
        }

    }, [getOptions]);

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        className={cn('h-10 w-full px-3 py-2 border text-sm text-left text-gray-600 rounded-md  border-input bg-background', className)}
                        aria-expanded={open}
                    >
                        <div className='flex flex-auto items-center justify-between gap-2'>
                            {selected ? selected.label : placeholder}
                        </div>
                    </button>
                </PopoverTrigger>

                <PopoverContent
                    style={{
                        width: "var(--radix-popover-trigger-width)"
                    }}
                    className='border-input bg-popover shadow-md '
                >

                    <Command >
                        <Command.Input
                            className='border border-input  w-full py-1.5 px-2 rounded text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                            placeholder={"Search"}
                        />

                        <Command.Empty className="py-2 text-sm text-center text-gray-500">No results found.</Command.Empty>
                        <Command.Group className='mt-2 max-h-60 overflow-auto'>
                            {results.map((option, i) => (
                                <Command.Item
                                    key={option.value || i}
                                    onSelect={() => handleSelect(option)}
                                    className="cursor-pointer"
                                >
                                    <div className='py-1 px-2 items-center hover:bg-gray-100 cursor-pointer rounded-md transition-colors flex justify-between'>
                                        {renderOption ? renderOption(option, selected) : defaultRenderOption(option, selected)}

                                        <Check
                                            className={cn(
                                                "ml-auto size-4",
                                                option?.value === selected?.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </div>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}