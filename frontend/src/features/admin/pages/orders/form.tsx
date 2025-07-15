import { AutoComplete } from "@components/ui/autocomplete";
import { TableInput } from "@components/table-input";

const itemFields = [
    {
        name: 'product',
        label: 'Product',
        type: 'autocomplete',
        options: [],
        required: true,
    },
    {
        name: 'quantity',
        label: 'Quantity',
        type: 'number',
        required: true,
    },
    {
        name: 'price',
        label: 'Price',
        type: 'number',
        required: true,
    },
    {
        name: 'total',
        label: 'Total',
        type: 'number',
    }
]

const Index = () => {
    return (
        <div className="py">
            <div className="font-semibold">Create Order</div>

            <div className="flex ">
                <div className="mt-4 flex-auto bg-white p-4 rounded-md">
                    <div className="text-sm font-medium mb-2">Items</div>
                    <div>
                        <TableInput fields={itemFields} actionLabel="Add Product" />
                    </div>
                </div>

                <div className="min-w-[300px] ml-4 shrink-0 bg-white p-4 rounded-md">
                    <div>
                        <div className="font-medium text-sm mb-2">Customer</div>
                        <AutoComplete label="Select Customer" options={[
                            { label: 'John Doe', value: 'john_doe' },
                            { label: 'Jane Smith', value: 'jane_smith' },
                            { label: 'Alice Johnson', value: 'alice_johnson' },
                            { label: 'Bob Brown', value: 'bob_brown' },
                            { label: 'Charlie Davis', value: 'charlie_davis' },
                        ]}

                            value={{ label: 'John Doe', value: 'john_doe' }}
                        />


                        <div>
                            <div className="font-medium text-sm mt-4 mb-2">Shipping Address</div>
                            <div className="text-sm">
                                <div >123 Main St, Springfield, IL 62701</div>
                                <div >Phone: (555) 123-4567</div>
                                <div >Email: example@example.com</div>
                            </div>
                        </div>

                        <div>
                            <div className="4 mb-2">Billing Address</div>
                            <div className="text-sm">
                                <div >123 Main St, Springfield, IL 62701</div>
                                <div >Phone: (555) 123-4567</div>
                                <div >Email: example@example.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default Index;
