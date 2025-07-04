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

  return (
    <TableContainer 
      component={Paper} 
      ref={tableContainerRef}
      className="!tw-rounded-lg"
      sx={{ 
        height: '100%',
        overflow: 'auto',
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
        sx={{ 
          tableLayout: 'fixed', 
          width: '100%'
        }}
        stickyHeader
      >
        <TableHead>
          <TableRow className="!tw-bg-gray-50">
            <TableCell
              className="!tw-font-semibold !tw-text-base !tw-py-4 !tw-bg-gray-50"
              sx={{ 
                width: '60px',
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}
            >
              #
            </TableCell>
            <TableCell
              className="!tw-font-semibold !tw-text-base !tw-py-4 !tw-bg-gray-50"
              sx={{ 
                width: 'auto',
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}
            >
              <Box className="!tw-flex !tw-items-center !tw-gap-2">
                Name
                <Box className="!tw-flex !tw-flex-col">
                  <ArrowUpward className="!tw-text-xs !tw-text-gray-400" />
                  <ArrowDownward className="!tw-text-xs !tw-text-gray-400" />
                </Box>
              </Box>
            </TableCell>
            <TableCell
              className="!tw-font-semibold !tw-text-base !tw-py-4 !tw-bg-gray-50"
              align="center"
              sx={{ 
                width: '120px',
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}
            >
              <Box className="!tw-flex !tw-items-center !tw-gap-2 !tw-justify-center">
                # RFEs
                <Box className="!tw-flex !tw-flex-col">
                  <ArrowUpward className="!tw-text-xs !tw-text-gray-400" />
                  <ArrowDownward className="!tw-text-xs !tw-text-gray-400" />
                </Box>
              </Box>
            </TableCell>
            <TableCell
              className="!tw-font-semibold !tw-text-base !tw-py-4 !tw-bg-gray-50"
              align="center"
              sx={{ 
                width: '80px',
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}
            >
              Actions
            </TableCell>
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
                <TableCell sx={{ width: '60px' }}>{getRowNumber(index)}</TableCell>
                <TableCell 
                  className="!tw-font-medium" 
                  sx={{ 
                    width: 'auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.name}
                </TableCell>
                <TableCell align="center" sx={{ width: '120px' }}>{item.associatedActiveRfe}</TableCell>
                <TableCell align="center" sx={{ width: '80px' }}>
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