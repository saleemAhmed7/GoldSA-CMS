"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";

// Table
export interface TableProps {
  children: ReactNode;
  variant?: "basic" | "dense" | "striped" | "selectable";
  className?: string;
}

export function Table({ children, variant = "basic", className }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-sm border border-border bg-surface shadow-flat">
      <table
        className={cn(
          "w-full text-left font-interface text-body-small text-foreground",
          variant === "dense" && "[&_td]:py-2 [&_th]:py-2",
          variant === "striped" && "[&_tbody_tr:nth-child(even)]:bg-background/40",
          className,
        )}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <thead className={cn("border-b border-border bg-background text-label-meta text-muted uppercase tracking-label h-10", className)}>{children}</thead>;
}

export function TableBody({ children, className }: { children: ReactNode; className?: string }) {
  return <tbody className={cn("divide-y divide-border", className)}>{children}</tbody>;
}

export function TableRow({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <tr
      onClick={onClick}
      className={cn("h-14 transition-colors hover:bg-accent-subtle/50", onClick && "cursor-pointer", className)}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className }: { children: ReactNode; className?: string }) {
  return <th className={cn("px-4 font-medium align-middle", className)}>{children}</th>;
}

export function TableCell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("px-4 align-middle", className)}>{children}</td>;
}

// DataGrid
export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
}

export interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataGrid<T>({ columns, data, keyExtractor, onRowClick, className }: DataGridProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = (a as Record<string, unknown>)[sortKey];
    const valB = (b as Record<string, unknown>)[sortKey];
    if (valA === valB) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;
    const result = valA < valB ? -1 : 1;
    return sortOrder === "asc" ? result : -result;
  });

  return (
    <Table className={className}>
      <TableHeader>
        <tr>
          {columns.map((col) => (
            <TableHead key={col.key}>
              <div
                onClick={() => col.sortable && handleSort(col.key)}
                className={cn("flex items-center gap-1", col.sortable && "cursor-pointer select-none hover:text-brand-gold-polished")}
              >
                <span>{col.header}</span>
                {col.sortable && sortKey === col.key && (
                  <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                )}
              </div>
            </TableHead>
          ))}
        </tr>
      </TableHeader>
      <TableBody>
        {sortedData.map((row) => (
          <TableRow key={keyExtractor(row)} onClick={() => onRowClick?.(row)}>
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
