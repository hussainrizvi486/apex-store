import React from "react";
import { flexRender, Table, Header } from "@tanstack/react-table";
import { cn } from "@utils/index";

interface DataListProps<TData> {
    table: Table<TData>;
}


export const getGridTemplateColumns: string = (headers: object[], withCheckbox = true) => {
    const checkBoxWidth = withCheckbox ? '2rem ' : '';

    const columnsWidth = headers
        .map((header) => {
            if (header.id == "select") {
                return null
            }

            const width = header.column?.columnDef?.meta?.width;
            console.log(width);
            if (typeof width === 'number') {
                return `${width}px`;
            } else if (width) {
                return width;
            } else {
                return "1fr";
            }
        })
        .filter(Boolean)
        .join(' ');

    return checkBoxWidth + columnsWidth;
}

export const DataList: React.FC<DataListProps<TData>> = () => {
    return <div className="border rounded-md overflow-hidden"></div>;
};



export const DataCell: React.FC = () => {
    return (
        <td></td>
    )
}


export const DataListHeader: React.FC = ({ header }) => {
    return (
        <div
            key={header.id}
            className={cn(
                "flex items-center text-left text-sm font-medium px-4 py-3 bg-gray-100 text-gray-700"
            )}
        >
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
    )
}

export const DataListRow: React.FC<{ children: React.ReactNode, styles: React.CSSProperties, }> = ({ children, styles, ...props }) => {
    let rowClass = "";

    if (props.row?.getIsSelected()) {
        rowClass = "bg-gray-100";
    }

    return (
        <div className={cn("border-b last-of-type:border-b-0 hover:bg-gray-50 h-12 overflow-hidden", rowClass)}>
            <div className="grid items-center h-12" style={styles} {...props}>
                {children}
            </div>
        </div>
    )
}
