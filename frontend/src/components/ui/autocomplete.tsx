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

interface AutoCompleteProps {
    options?: Option[];
    className?: string;
    label?: string;
    placeholder?: string;
    getOptions?: () => Promise<{ label: string; value: string }[]>; onChange?: (option: Option | null) => void;
    value?: Option | null | object;
    renderOption?: (option: Option) => React.ReactNode;
}


const defaultRenderOption = (option: Option | null, current: Option) => {
    if (!option) return null;

    return (
        <div className='flex gap-2 px-2.5 py-1.5 overflow-hidden items-center hover:bg-gray-100 cursor-pointer rounded-md transition-colors'>
            <div className='flex-1 truncate text-sm'>{option.label}</div>
            <Check
                className={cn(
                    "ml-auto size-4",
                    option?.value === current?.value ? "opacity-100" : "opacity-0"
                )}
            />
        </div>
    )
};


export const AutoComplete: React.FC<AutoCompleteProps> = ({
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
    const [selected, setSelected] = useState<Option | null>(value || null);
    const [isLoading, setIsLoading] = useState(false);


    const handleSelect = (option: Option) => {
        setSelected(option);
        onChange?.(option);
        setOpen(false);
    };


    useEffect(() => {
        if (getOptions) {
            const obj = getOptions();

            if (obj instanceof Promise) {
                setIsLoading(true);

                obj.then((data) => {
                    setResults(data);
                    setIsLoading(false);
                });
            }
        }

    }, [getOptions]);

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        className={cn('w-full border py-1.5 px-2 rounded text-sm text-left text-gray-600', className)}
                        aria-expanded={open}
                    >
                        <div className='flex items-center justify-between gap-2'>
                            {selected && renderOption ? renderOption(selected) : selected && !renderOption ? defaultRenderOption(selected) : placeholder}
                            {/* <div>{selected ? selected.label : placeholder}</div> */}
                            <ChevronsUpDown className='size-4' />
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    style={{
                        width: "var(--radix-popover-trigger-width)"
                    }}
                >

                    <Command>
                        <Command.Input
                            className='border w-full py-1.5 px-2 rounded text-sm ring-0 focus:ring-2 outline-none'
                            placeholder={"Search"}
                        />
                        <Command.Loading className='absolute top-2 right-2'>
                            <Loader />
                        </Command.Loading>
                        <Command.Empty className="py-2 text-sm text-center text-gray-500">No results found.</Command.Empty>
                        <Command.Group className='mt-2 max-h-60 overflow-auto'>
                            {results.map((option, i) => (
                                <Command.Item
                                    key={option.value || i}
                                    onSelect={() => handleSelect(option)}
                                    className="cursor-pointer"
                                >
                                    {renderOption ? renderOption(option) : defaultRenderOption(option, selected)}
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command>

                </PopoverContent>
            </Popover>
        </div>
    );
}



const Loader = () => {
    return (
        <>
            <Spinner size='sm' />
        </>
    )
}