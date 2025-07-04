import React, { useRef, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TableSortLabel,
  Typography
} from '@mui/material';
import {
  Edit,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { get } from 'lodash';
import { SortDirection, ColumnDataType } from '../../types/reporting';
import type { ColumnConfig, BaseTableItem, TableConfig } from '../../types/reporting';
import { EditableTableRow } from './EditableTableRow';

interface ReportingTableViewProps<T extends BaseTableItem> {
  data: T[];
  columns: TableConfig;
  onEdit: (item: T) => void;
  onSave: (item: T) => void;
  onCancel: (item: T) => void;
  order?: SortDirection;
  orderBy?: string;
  onSort?: (field: string) => void;
}

export function ReportingTableView<T extends BaseTableItem>({
  data,
  columns,
  onEdit,
  onSave,
  onCancel,
  order = SortDirection.NONE,
  orderBy = '',
  onSort
}: ReportingTableViewProps<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const newRowRef = useRef<HTMLTableRowElement>(null);
  const [visibleColumns, setVisibleColumns] = useState<ColumnConfig[]>([]);

  // Filter and sort columns similar to your reference
  useEffect(() => {
    const filteredColumns = columns.filter(col => col.default !== false);
    const sortedColumns = filteredColumns.sort((a, b) => 
      (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
    );
    setVisibleColumns(sortedColumns);
  }, [columns]);

  // Scroll to new row when a new item is added
  useEffect(() => {
    const newItem = data.find(item => item.isNew && item.isEditing);
    if (newItem && newRowRef.current && tableContainerRef.current) {
      newRowRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [data]);
  
  const getRowNumber = (index: number) => {
    return index + 1;
  };

  const getColumnWidth = (column: ColumnConfig) => {
    if (column.wide) return '28rem';
    
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

  const renderCell = (item: T, colConfig: ColumnConfig) => {
    const { type, path, field } = colConfig;
    const cellContent = get(item, path);
    
    if (!cellContent && type !== ColumnDataType.ACTIONS && type !== ColumnDataType.NUMBER) {
      return '-';
    }

    switch (type) {
      case ColumnDataType.DATE:
        return cellContent ? new Date(cellContent as string).toLocaleDateString() : '-';
      
      case ColumnDataType.NUMBER:
        if (field === 'number') {
          return getRowNumber(data.indexOf(item));
        }
        return cellContent || 0;
      
      case ColumnDataType.ACTIONS:
        return (
          <IconButton
            onClick={() => onEdit(item)}
            size="small"
            className="!tw-text-blue-600 hover:!tw-bg-blue-100 hover:!tw-text-white"
          >
            <Edit />
          </IconButton>
        );
      
      case ColumnDataType.LINK:
        // Add link rendering logic here if needed
        return (
          <Typography 
            display="inline-block" 
            title={cellContent as string} 
            className="!tw-text-sm !tw-text-blue-600 !tw-cursor-pointer" 
            component="span"
          >
            {cellContent as string}
          </Typography>
        );
      
      case ColumnDataType.CUSTOM:
        // Add custom cell rendering logic here if needed
        return cellContent as string;
      
      case ColumnDataType.TEXT:
      default:
        return (
          <Typography 
            display="inline-block" 
            title={cellContent as string} 
            className="!tw-text-sm" 
            component="span"
          >
            {cellContent as string}
          </Typography>
        );
    }
  };

  const handleSort = (field: string) => {
    if (onSort && visibleColumns.find(col => col.field === field)?.sortable) {
      onSort(field);
    }
  };

  const renderSortIcon = (column: ColumnConfig) => {
    if (!column.sortable) return null;
    
    const isActive = orderBy === column.field;
    
    if (isActive && order === SortDirection.ASC) {
      return <ArrowUpward className="!tw-text-xs" />;
    } else if (isActive && order === SortDirection.DESC) {
      return <ArrowDownward className="!tw-text-xs" />;
    } else {
      return (
        <Box className="!tw-flex !tw-flex-col">
          <ArrowUpward className="!tw-text-xs !tw-text-gray-400" />
          <ArrowDownward className="!tw-text-xs !tw-text-gray-400" />
        </Box>
      );
    }
  };

  const renderHeaderContent = (column: ColumnConfig) => {
    if (column.sortable) {
      return (
        <TableSortLabel
          active={orderBy === column.field}
          direction={orderBy === column.field ? order : SortDirection.ASC}
          onClick={() => handleSort(column.field)}
          IconComponent={() => renderSortIcon(column)}
          className="!tw-flex !tw-items-center !tw-gap-2"
        >
          {column.label}
        </TableSortLabel>
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
            {visibleColumns.map((column) => (
              <TableCell
                key={column.field}
                className="!tw-font-semibold !tw-text-base !tw-py-4 !tw-bg-gray-50 !tw-sticky !tw-top-0 !tw-z-10"
                align={column.align || (column.field === 'actions' || column.field === 'associatedRfes' ? 'center' : 'left')}
                sx={{ width: getColumnWidth(column) }}
                component="th"
                sortDirection={orderBy === column.field ? order : false}
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
                onSave={onSave}
                onCancel={onCancel}
                ref={item.isNew ? newRowRef : undefined}
                rowNumber={getRowNumber(index)}
              />
            ) : (
              <TableRow
                key={item.id}
                className="hover:!tw-bg-gray-50"
                hover
              >
                {visibleColumns.map((column) => (
                  <TableCell 
                    key={`${column.field}-${item.id}`}
                    className={`${column.field === 'name' ? "!tw-font-medium" : ""} ${column.wide ? '!tw-min-w-[28rem]' : ''}`}
                    align={column.align || (column.field === 'actions' || column.field === 'associatedRfes' ? 'center' : 'left')}
                    component="td"
                    scope="row"
                    sx={{ 
                      width: getColumnWidth(column),
                      ...(column.field === 'name' && {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      })
                    }}
                  >
                    {renderCell(item, column)}
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