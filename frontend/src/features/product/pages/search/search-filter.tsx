import { Checkbox } from "@components/ui/checkbox";


export const SearchFilters = () => {
    let filters = {
        "Brand": ["Apple", "Samsung", "Google"],
        "Colors": ["Red", "Blue", "Green"],
        "Sizes": ["Small", "Medium", "Large"],
    }
    return (
        <div className="py-4">
            {Object.keys(filters).map((key) => (
                <div key={key} className="mb-4">
                    <div className="font-medium">{key}</div>
                    <div>
                        {filters[key].map((value) => (
                            <div key={value} className="flex items-center">
                                <Checkbox id={value} name={value} className="mr-2" />
                                <label htmlFor={value} className="text-sm"> {value}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
} 