import { useEffect, useState } from 'react';
import { ChevronsUpDown, Check, Search as SearchIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger, } from "@components/ui/popover";
import { cn } from '@utils/index';
// import { Spinner } from '@components/loaders/spinner';


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

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Option[]>(props.options || []);
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState<Option | null>(null);



    const handleSelect = (option: Option) => {
        setSelected(option);
        props.onChange?.(option);
        setOpen(false);
    };


    const handleSearch = () => {
        if (!query) {
            setResults(props.options || []);
            return
        }

        const filteredOptions = props.options?.filter((option) =>
            option.label.toLowerCase().trim().includes(query.toLowerCase())
        );
        setResults(filteredOptions || []);
    }

    useEffect(() => {
        handleSearch();
    }, [query]);

    return (
        <div className="">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        className={cn('w-full border border-input py-1.5 px-2 rounded text-sm text-left text-gray-600')}
                        aria-expanded={open}
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <div className='text-sm truncate'>
                                {selected ? selected.label : props.placeholder || "Select an option"}
                            </div>

                            <ChevronsUpDown className='size-4' />
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    style={{
                        width: "var(--radix-popover-trigger-width)"
                    }}
                    className="p-2"
                >
                    <div className="mb-2 border-b border-b-input flex items-center">
                        <div>
                            <SearchIcon className='size-3' />
                        </div>
                        <input type="text" className='px-2 py-1 w-full outline-none text-xs rounded-md flex-auto' placeholder='Search here'
                            value={query} onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    {results.map((option, i) => (
                        <div
                            key={option.value || i}
                            onClick={() => handleSelect(option)}
                            className="cursor-pointer "
                        >
                            <div className='flex gap-2 px-2 py-1.5 overflow-hidden items-center hover:bg-accent cursor-pointer rounded-md transition-colors'>
                                <div className='flex-1 truncate text-xs'>{option.label}</div>
                                <Check
                                    className={cn(
                                        "ml-auto size-4",
                                        option?.value === selected?.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </div>

                        </div>
                    ))}
                </PopoverContent>
            </Popover>
        </div>
    );
}

