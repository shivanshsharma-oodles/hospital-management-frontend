import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React from "react";

export type Column<T> = {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
};

type BaseTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    rowKey: (row: T) => string | number;
    className?: string;
    emptyMessage?: string;
};

const BaseTable = <T,>({
    columns,
    data,
    rowKey,
    className,
    emptyMessage = "No records found",
}: BaseTableProps<T>) => {
    return (
        <div className={cn("rounded-md border", className)}>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.key} className={`${col.className}`}>
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center text-muted-foreground py-6"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => (
                            <TableRow key={rowKey(row)}>
                                {columns.map((col) => (
                                    <TableCell
                                        key={String(col.key)}
                                        className={cn(
                                            "whitespace-normal wrap-break-word",
                                            col.className
                                        )}
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : (row as any)[col.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default BaseTable;