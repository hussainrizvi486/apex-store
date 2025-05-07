import React from 'react';
import moment from 'moment';
import { cn } from '../utils/index';
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GridColDef {
    label: string
    accessor: string
    width?: string | number
    type?: 'text' | 'number' | 'date' | 'currency' | "datetime" | "float"
    align?: "left" | "right" | "center",
    sortable?: boolean,
    renderCell?: (row: any) => React.ReactNode
}

interface GridDataDef { }

interface DataGridProps {
    columns: Array<GridColDef>;
    data: { [key: string]: any }[];
}


interface DataGridCellProps {
    column: GridColDef;
    value: object
}


interface GridHeadCellProps {
    column: GridColDef;
}

const DATE_FORMAT = "DD-MM-YYYY";
const DATETIME_FORMAT = "DD-MM-YYYY HH:mm:ss";
const ALIGNMENT_TYPE = {
    'text': "left",
    'number': "right",
    'float': "right",
    'date': "left",
    'currency': "right",
    "datetime": "left",
}

const ALIGNMENT_CLASS = {
    "left": "text-left",
    "right": "text-right",
    "center": "text-center",
}

const DataGrid: React.FC<DataGridProps> = ({ columns, data }) => {

    return (
        <div>

            <div className="rounded-md overflow-hidden">
                <div className="w-full border border-gray-200 ">
                    <div className='bg-gray-100'>
                        <div className='flex'>
                            {columns.map((column, index) => (
                                <div className="basis-full" key={index} style={{ width: column.width || 'auto', flex: column.width ? 'none' : 1 }}>
                                    <GridColCell key={index} column={column} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div >
                        {data?.map((row, rowIndex) => (
                            <div key={rowIndex} className='flex border-b border-gray cursor-pointer hover:bg-gray-50 transition-all'>
                                {columns.map((column, index) => (
                                    <div className='basis-full' key={index} style={{ width: column.width || 'auto', flex: column.width ? 'none' : 1 }}>
                                        <DataGridCell column={column} value={row[column.accessor]} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex justify-end mt-4'>
                <Pagination />
            </div>
        </div>
    );
};

const DataGridCell: React.FC<DataGridCellProps> = ({ column, value }) => {
    const { type, renderCell } = column;

    const getValue = () => {
        if (renderCell) {
            return renderCell(value);
        }

        if (type === "date") {
            return moment(value).format(DATE_FORMAT);
        }

        if (type === "datetime") {
            return moment(value).format(DATETIME_FORMAT);
        }
        if (type === "currency") {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        }

        return value || "-";
    }


    let align = column.align ? column.align : ALIGNMENT_TYPE[column.type || "text"];


    return (
        <div className={cn("px-4 py-2 whitespace-nowrap text-sm  border-gray-200", ALIGNMENT_CLASS[align])}>
            {getValue()}
        </div>
    )

}


const GridColCell: React.FC<GridHeadCellProps> = ({ column }) => {
    let alignClass = ALIGNMENT_CLASS[ALIGNMENT_TYPE[column.type || "text"]];
    return (
        <div className={cn("px-4 py-2 border-b border-gray-200 text-xs font-medium text-slate-600", alignClass)}>
            {column.label}
        </div>

    )
}


export default DataGrid;


export const Pagination: React.FC = () => {
    // inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9
    const pages = [1, 2, 3, 4, 5, 6]
    return (
        <div >
            <div className='flex items-center gap-1'>
                <div className="inline-flex items-center justify-center gap-2 border border-gray-200 whitespace-nowrap rounded-md text-sm font-medium shadow-sm h-8 w-8 focus-visible:ring-1 focus-visible:outline-none hover:bg-gray-100 transition-all">
                    <ChevronLeft className='size-4 shrink-0' />
                </div>
                {
                    pages.map((page, index) => (

                        <div key={index} role='button' className='inline-flex items-center justify-center gap-2 border border-gray-200 whitespace-nowrap rounded-md text-sm font-medium shadow-sm h-8 w-8 focus-visible:ring-1 focus-visible:outline-none hover:bg-gray-100 transition-all'>
                            {page}
                        </div>

                    ))}
                <div className="inline-flex items-center justify-center gap-2 border border-gray-200 whitespace-nowrap rounded-md text-sm font-medium shadow-sm h-8 w-8 focus-visible:ring-1 focus-visible:outline-none hover:bg-gray-100 transition-all">

                    <ChevronRight className='size-4 shrink-0' />
                </div>
            </div>
        </div>
    )

}