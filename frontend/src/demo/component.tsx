
import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@components/ui/accordion"
import { Input } from "@components/ui/input"
import { Checkbox } from "@components/ui/checkbox"
import { ComboBox } from "@components/ui/combobox"
import { TableInput } from "@components/table-input";
import { Dialog, DialogContent, DialogClose, DialogTrigger } from "@components/ui/dialog";
import { X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";

export const DemoComponent = () => {
    return (
        <div className="p-2">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <SelectDemo />
                </div>

                <div className="mb-12">
                    <InputDemo />
                </div >

                <div className="mb-12">
                    <CheckboxDemo />
                </div>
                <div className="mb-12">
                    <ComboBoxDemo />
                </div>

                <div className="mb-12">
                    <InputTable />
                </div>

                <div className="mb-12">
                    <DialogDemo />
                </div>
                <div className="mb-12">
                    <PopoverDemo />
                </div>

                <div className="mb-12">
                    <DemoAccordion />
                </div>
                <div className="mb-12"></div>
                <div className="mb-12"></div>
                <div className="mb-12"></div>
                <div className="mb-12"></div>
                <div className="mb-12"></div>
            </div>
        </div>
    )
}


function SelectDemo() {
    return (
        <div>
            <div >
                <div className="ml-1 mb-2 text-sm text-muted-foreground font-semibold">Select component</div>
            </div>
            <Select >
                <SelectTrigger >
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent  >
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

function InputDemo() {
    return (
        <>
            <div >
                <div className="ml-1 mb-2 text-sm text-muted-foreground font-semibold">Input component</div>
            </div>
            <Input placeholder="Enter text" />
        </>
    )
}



function CheckboxDemo() {
    return (
        <div>


            <div >
                <div className="ml-1 mb-2 text-sm text-muted-foreground font-semibold">Checkbox</div>
            </div>

            <div className="mb-1 flex items-center ">
                <Checkbox className="mr-2" id="checkbox-demo" />
                <label className="text-sm text-muted-foreground select-none cursor-pointer" htmlFor="checkbox-demo">Click to Disable</label>
            </div>

        </div>
    )
}

function ComboBoxDemo() {
    return (
        <div>
            <div className="text-sm mb-2 ">Combobox </div>
            <ComboBox
                options={[
                    { label: "Option 1", value: "option1" },
                    { label: "Option 2", value: "option2" },
                    { label: "Option 3", value: "option3" },
                ]}
                placeholder="Select an option"
                onChange={(value) => console.log("Selected:", value)}
            />
        </div>
    )
}

function InputTable() {
    return (
        <div>
            <TableInput
                fields={[{
                    "label": "Item Name",
                    "name": "itemName",
                    "type": "text",
                    "placeholder": "Enter item name",
                    "required": true,
                }]}
            />
        </div>
    )

}


function DialogDemo() {
    return (
        <div>
            <div className="mb-4"><h1 className="text-base font-medium">Dialog Demo</h1></div>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="bg-primary text-primary-foreground text-sm p-2 rounded-md font-medium"
                        type="button" role="button">Edit Profile</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" >
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="">Edit Profile</div>
                            <div>
                                <DialogClose asChild>

                                    <button className="cursor-pointer" aria-label="Close" type="button" role="button">
                                        <X />
                                    </button>
                                </DialogClose>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <div className="mb-2 text-sm text-muted-foreground font-medium">Username</div>
                                <Input placeholder="Enter your username" />
                            </div>

                            <div className="mb-2">
                                <div className="mb-2 text-sm text-muted-foreground font-medium">Input component</div>
                                <Input placeholder="Enter text" />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


const PopoverDemo = () => {
    return (
        <div>
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="bg-primary text-primary-foreground text-sm p-2 rounded-md font-medium">Popover Demo</button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="p-4">This is the content of the popover.</div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

const DemoAccordion = () => {
    return (
        <div className="">
            <div className="mb-4 text-sm text-muted-foreground font-semibold">Accordion</div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                    <AccordionContent>
                        Our return policy allows returns within 30 days of purchase with a receipt.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>Do you offer technical support?</AccordionTrigger>
                    <AccordionContent>
                        Yes, we offer 24/7 technical support via email and chat.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Where are you located?</AccordionTrigger>
                    <AccordionContent>
                        Our main office is located in San Francisco, California.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};