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
import type { TableColumn } from '../../types/reporting';
import { EditableTableRow } from './EditableTableRow';

interface DataTableProps<T extends { 
  id: string; 
  name: string; 
  associatedActiveRfe: number;
  isNew?: boolean; 
  isEditing?: boolean 
}> {
  data: T[];
  columns: TableColumn[];
  onEdit: (item: T) => void;
  onSave: (item: T) => void;
  onCancel: (item: T) => void;
}

export function DataTable<T extends { 
  id: string; 
  name: string; 
  associatedActiveRfe: number;
  isNew?: boolean; 
  isEditing?: boolean 
}>({
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

  return (
    <TableContainer 
      component={Paper} 
      ref={tableContainerRef}
      className="!tw-mx-6 !tw-mb-6 !tw-rounded-lg"
    >
      <Table>
        <TableHead>
          <TableRow className="!tw-bg-gray-50">
            {columns.map((column) => (
              <TableCell
                key={column.id}
                className="!tw-font-semibold !tw-text-base !tw-py-4"
                style={{ width: column.width }}
                align={column.id === 'actions' || column.id === 'associatedRfes' ? 'center' : 'left'}
              >
                <Box className="!tw-flex !tw-items-center !tw-gap-2">
                  {column.label}
                  {column.sortable && (
                    <Box className="!tw-flex !tw-flex-col">
                      <ArrowUpward className="!tw-text-xs !tw-text-gray-400" />
                      <ArrowDownward className="!tw-text-xs !tw-text-gray-400" />
                    </Box>
                  )}
                </Box>
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
                onSave={onSave}
                onCancel={onCancel}
                ref={item.isNew ? newRowRef : undefined}
                rowNumber={getRowNumber(index)}
              />
            ) : (
              <TableRow
                key={item.id}
                className="hover:!tw-bg-gray-50"
              >
                <TableCell>{getRowNumber(index)}</TableCell>
                <TableCell className="!tw-font-medium">{item.name}</TableCell>
                <TableCell align="center">{item.associatedActiveRfe}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => onEdit(item)}
                    size="small"
                    className="!tw-text-blue-600 hover:!tw-bg-blue-100 hover:!tw-text-white"
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}