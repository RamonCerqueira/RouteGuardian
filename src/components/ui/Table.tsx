import React from 'react';
import { EmptyState } from './Alert';
import { Skeleton } from './Alert';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
}

export function Table<T extends { id?: string | number }>({
  columns,
  data,
  isLoading = false,
  emptyTitle = 'Nenhum registro encontrado',
  emptyDescription = 'Não existem dados correspondentes aos filtros aplicados.',
  onRowClick,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="space-y-3 p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <table className="w-full text-left text-sm text-slate-300 border-collapse">
        <thead className="bg-slate-950/80 text-xs uppercase font-bold text-slate-400 border-b border-slate-800 tracking-wider">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {data.map((item, rowIdx) => (
            <tr
              key={item.id || rowIdx}
              onClick={() => onRowClick && onRowClick(item)}
              className={`hover:bg-slate-800/40 transition-colors ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={`px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-200 ${col.className || ''}`}>
                  {col.cell ? col.cell(item) : col.accessorKey ? (item[col.accessorKey] as any) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
