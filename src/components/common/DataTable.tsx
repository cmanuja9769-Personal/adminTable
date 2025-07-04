import React, { useRef, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box
} from '@mui/material';
import {
  Edit,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import type { TableColumn, BaseTableItem } from '../../types/reporting';
import { ColumnDataType } from '../../types/reporting';
import { EditableTableRow } from './EditableTableRow';

interface DataTableProps<T extends BaseTableItem> {
  data: T[];
  columns: TableColumn[];
  onEdit: (item: T) => void;
  onSave: (item: T) => void;
  onCancel: (item: T) => void;
}

export function DataTable<T extends BaseTableItem>({
  data,
  columns,
  onEdit,
  onSave,
  onCancel
}: DataTableProps<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const newRowRef = useRef<HTMLTableRowElement>(null);

  // Scroll to new row when a new item is added
  useEffect(() => {
    const newItem = data.find(item => item.isNew && item.isEditing);
    if (newItem && newRowRef.current && tableContainerRef.current) {
      // Smooth scroll to the new row
      newRowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [data]);

  const getRowNumber = (index: number) => {
    return index + 1;
  };

  const getColumnWidth = (column: TableColumn) => {
    switch (column.field) {
      case 'number':
        return '60px';
      case 'actions':
        return '80px';
      case 'associatedRfes':
        return '120px';
      default:
        return 'auto';
    }
  };

  const renderCellContent = (item: T, column: TableColumn) => {
    switch (column.field) {
      case 'number':
        return getRowNumber(data.indexOf(item));
      case 'name':
        return item.name;
      case 'associatedRfes':
        return item.associatedActiveRfe;
      case 'actions':
        return (
          <IconButton
            onClick={() => onEdit(item)}
            size="small"
            className="!tw-text-blue-600 hover:!tw-bg-blue-100 hover:!tw-text-white"
          >
            <Edit />
          </IconButton>
        );
      default:
        return '';
    }
  };

  const renderHeaderContent = (column: TableColumn) => {
    if (column.sortable && column.field !== 'actions') {
      return (
        <Box className="!tw-flex !tw-items-center !tw-gap-2 !tw-justify-center">
          {column.label}
          <Box className="!tw-flex !tw-flex-col">
            <ArrowUpward className="!tw-text-xs !tw-text-gray-400" />
            <ArrowDownward className="!tw-text-xs !tw-text-gray-400" />
          </Box>
        </Box>
      );
    }
    return column.label;
  };

  return (
    <TableContainer
      component={Paper}
      ref={tableContainerRef}
      className="!tw-rounded-lg !tw-h-full !tw-overflow-auto"
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c1c1c1',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: '#a8a8a8',
          },
        },
      }}
    >
      <Table
        className="!tw-table-fixed !tw-w-full"
        stickyHeader
      >
        <TableHead>
          <TableRow className="!tw-bg-gray-50">
            {columns.map((column) => (
              <TableCell
                key={column.field}
                className="!tw-font-semibold !tw-text-base !tw-py-4 !tw-bg-gray-50 !tw-sticky !tw-top-0 !tw-z-10"
                align={column.field === 'actions' || column.field === 'associatedRfes' ? 'center' : 'left'}
                sx={{ width: getColumnWidth(column) }}
              >
                {renderHeaderContent(column)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            item.isEditing ? (
              <EditableTableRow
                key={item.id}
                item={item}
                onSave={onSave as (item: BaseTableItem) => void}
                onCancel={onCancel as (item: BaseTableItem) => void}
                ref={item.isNew ? newRowRef : undefined}
                rowNumber={getRowNumber(index)}
              />
            ) : (
              <TableRow
                key={item.id}
                className="hover:!tw-bg-gray-50"
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    className={column.field === 'name' ? "!tw-font-medium" : ""}
                    align={column.field === 'actions' || column.field === 'associatedRfes' ? 'center' : 'left'}
                    sx={{
                      width: getColumnWidth(column),
                      ...(column.field === 'name' && {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      })
                    }}
                  >
                    {renderCellContent(item, column)}
                  </TableCell>
                ))}
              </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}