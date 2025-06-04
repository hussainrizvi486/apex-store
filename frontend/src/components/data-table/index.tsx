import { Checkbox } from '@components/ui/checkbox';
import { getCoreRowModel, useReactTable, ColumnDef, flexRender, Table, getSortedRowModel, SortingState } from '@tanstack/react-table'
import { cn } from "@utils/index";
import React from 'react';

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    className?: string;
    selectAbleRows?: boolean;
    onRowSelectionChange?: (selectedRows: T[]) => void;
    enableSorting?: boolean;
}

interface DataTableRowProps {
    children: React.ReactNode;
    isHeader?: boolean;
    className?: string;
    isSelected?: boolean;
}

interface DataTableCellProps {
    children: React.ReactNode;
    isHeader?: boolean;
    className?: string;
    width?: string | number;
}

// Sort Icon Component
const SortIcon: React.FC<{ direction?: 'asc' | 'desc' | false }> = ({ direction }) => {
    if (direction === 'asc') {
        return (
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        );
    }
    if (direction === 'desc') {
        return (
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        );
    }
    return (
        <svg className="w-4 h-4 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
    );
};

const DataTableRow: React.FC<DataTableRowProps> = (props) => {
    return (
        <tr className={cn(
            "text-xs transition-colors duration-200",
            props.isHeader
                ? 'bg-gray-50'
                : props.isSelected
                    ? 'bg-blue-50 hover:bg-blue-100'
                    : 'hover:bg-gray-50',
            props.className
        )}>
            {props.children}
        </tr>
    );
};

const DataTableCell: React.FC<DataTableCellProps> = (props) => {
    const Tag = props.isHeader ? 'th' : 'td';
    return (
        <Tag className={cn(
            "text-sm font-normal text-left py-1.5 px-2 whitespace-nowrap overflow-hidden text-ellipsis",
            props.className,
            props.isHeader ? "bg-muted text-muted-foreground font-medium" : ""
        )}>
            {props.children || <></>}
        </Tag>
    );
};

const DataTable = <T,>({
    data,
    columns,
    className,
    selectAbleRows = true,
    onRowSelectionChange,
    enableSorting = true
}: DataTableProps<T>): React.ReactElement => {

    if (!columns || columns.length === 0) {
        return <></>
    }
    const [rowSelection, setRowSelection] = React.useState({});
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const tableColumns: ColumnDef<T>[] = React.useMemo(() => {
        if (!selectAbleRows) return columns;
        return [
            {
                id: 'select',
                header: ({ table }: { table: Table<T> }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all rows"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
                size: 30,
            },
            ...columns
        ];
    }, [columns, selectAbleRows]);



    const table = useReactTable({
        data,
        columns: tableColumns,
        state: {
            rowSelection,
            sorting,
        },
        enableRowSelection: selectAbleRows,
        enableSorting: enableSorting,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    React.useEffect(() => {
        if (onRowSelectionChange && selectAbleRows) {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
            onRowSelectionChange(selectedRows);
        }
    }, [rowSelection, onRowSelectionChange, table, selectAbleRows]);


    return (
        <div className={cn("rounded-md", className)}>
            <table className="border-collapse table-fixed border border-gray-200 w-full">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <DataTableRow key={headerGroup.id} isHeader>
                            {headerGroup.headers.map(header => {
                                const canSort = header.column.getCanSort();
                                const sortDirection = header.column.getIsSorted();

                                if (header.id === "select") {
                                    return (
                                        <DataTableCell key={header.id} isHeader className='w-[30px]'>
                                            <div className="flex items-center">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </div>
                                        </DataTableCell>
                                    );
                                }

                                return (
                                    <DataTableCell key={header.id} isHeader width={header.column.columnDef.size}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={cn(
                                                    "flex items-center",
                                                    canSort ? "cursor-pointer select-none hover:text-gray-900 transition-colors" : ""
                                                )}
                                                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {canSort && (
                                                    <SortIcon direction={sortDirection} />
                                                )}
                                            </div>
                                        )}
                                    </DataTableCell>
                                );
                            })}
                        </DataTableRow>
                    ))}
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={tableColumns.length}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map(row => (
                            <DataTableRow
                                key={row.id}
                                isSelected={row.getIsSelected()}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <DataTableCell key={cell.id} className="text-sm">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </DataTableCell>
                                ))}
                            </DataTableRow>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export { DataTable };