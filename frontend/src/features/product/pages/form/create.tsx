import { DataForm } from "@components/data-form/main";
import { fields } from "@components/data-form/test";

const Index = () => {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <div>Create New Product</div>
            <div><DataForm fields={fields} /></div>
        </div>
    )
}

export default Index;