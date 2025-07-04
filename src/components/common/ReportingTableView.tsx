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
  Typography,
  Icon
} from '@mui/material';
import {
  Edit,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { get, isArray } from 'lodash';
import { SortDirection, ColumnDataType } from '../../types/reporting';
import type { ColumnConfig, BaseTableItem, TableConfig, ActionConfig } from '../../types/reporting';
import { EditableTableRow } from './EditableTableRow';
import ActionsMenu from '../ActionsMenu/ActionsMenu';
import BaseChip from '../BaseChip/BaseChip';
import Link from '../Link/Link';
import { MenuIcon, SortAscIcon, SortDescIcon, SortIcon } from '../../assets/icons';

interface ReportingTableViewProps<T extends BaseTableItem> {
  data: T[];
  columns: TableConfig;
  onEdit: (item: T) => void;
  onSave: (item: T) => void;
  onCancel: (item: T) => void;
  order?: SortDirection;
  orderBy?: string;
  onSort?: (field: string) => void;
  tableActions?: ActionConfig<T>[];
  customCellFallback?: React.ReactNode;
  handleCustomCellClick?: (row: T, id?: string) => void;
  displayedColumns?: string[] | null;
  tableKey?: string;
  dimmedRowConfig?: {
    keyPath: string;
    value: any;
  };
  sortMap?: Record<string, string>;
}

export function ReportingTableView<T extends BaseTableItem>({
  data,
  columns,
  onEdit,
  onSave,
  onCancel,
  order = SortDirection.NONE,
  orderBy = '',
  onSort,
  tableActions = [],
  customCellFallback,
  handleCustomCellClick,
  displayedColumns,
  tableKey = 'id',
  dimmedRowConfig,
  sortMap = {}
}: ReportingTableViewProps<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const newRowRef = useRef<HTMLTableRowElement>(null);
  const [visibleColumns, setVisibleColumns] = useState<ColumnConfig[]>([]);
  const [sortedVisibleColumns, setSortedVisibleColumns] = useState<ColumnConfig[]>([]);

  // Filter and sort columns exactly like your reference
  useEffect(() => {
    if (displayedColumns?.length) {
      setVisibleColumns(columns.filter((item) => displayedColumns.includes(item.field) || !item.group));
    } else {
      setVisibleColumns(columns.filter((item) => item.default));
    }
  }, [displayedColumns, columns]);

  useEffect(() => {
    const sortedCols = visibleColumns?.sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
    setSortedVisibleColumns(sortedCols);
  }, [visibleColumns]);

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

  const getSortDir = (property: string): SortDirection => {
    const isAsc = orderBy === property && order === SortDirection.ASC;
    const isDesc = orderBy === property && order === SortDirection.DESC;
    
    if (isAsc) {
      return SortDirection.DESC;
    } else if (isDesc) {
      return SortDirection.NONE;
    } else {
      return SortDirection.ASC;
    }
  };

  const handleSort = (property: string) => {
    if (onSort && sortedVisibleColumns.find(col => col.field === property)?.sortable) {
      onSort(property);
    }
  };

  const renderCell = (item: T, colConfig: ColumnConfig) => {
    const { type, path, id, href, customCellPath, customCellKeyPath, customClass, field } = colConfig;
    const cellContent = get(item, path) as string | T | T[];
    
    if (!cellContent && type !== ColumnDataType.CUSTOM && type !== ColumnDataType.ACTIONS && type !== ColumnDataType.NUMBER) {
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
        return (
          <Link
            isExternal={!!href}
            to={href ? (get(item, href) as string) : `details?id=${get(item, tableKey)}`}
            target={href ? '_blank' : '_self'}
            rel="noopener noreferrer"
          >
            {cellContent as string}
          </Link>
        );
      
      case ColumnDataType.CUSTOM:
        return customCellPath && customCellKeyPath && ((Array.isArray(cellContent) && cellContent.length) || get(cellContent, customCellPath)) ? (
          <BaseChip
            maxCount={3}
            className={customClass}
            variant="outlined"
            label={
              isArray(cellContent)
                ? cellContent.map((item) => ({
                    label: get(item, customCellPath) as string,
                    link: `${href}?id=${get(item, customCellKeyPath)}`
                  }))
                : {
                    label: get(cellContent, customCellPath) as string,
                    link: `${href}?id=${get(cellContent, customCellKeyPath)}`
                  }
            }
          />
        ) : (
          <Box
            onClick={() => handleCustomCellClick?.(item, id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleCustomCellClick?.(item);
              }
            }}
          >
            {customCellFallback}
          </Box>
        );
      
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

  const getSortIcon = (field: string) => {
    const mappedField = sortMap[field] || field;
    if (orderBy === mappedField && order === 'asc') {
      return <img src={SortAscIcon} alt="asc-sort" />;
    } else if (orderBy === mappedField && order === 'desc') {
      return <img src={SortDescIcon} alt="desc-sort" />;
    } else {
      return <img src={SortIcon} alt="" />;
    }
  };

  const renderSortIcon = (field: string) => {
    return <Icon>{getSortIcon(field)}</Icon>;
  };

  const renderHeaderContent = (column: ColumnConfig) => {
    const mappedField = sortMap[column.field] || column.field;
    
    if (column.sortable) {
      return (
        <TableSortLabel
          hideSortIcon={!sortMap[column.field] && !column.sortable}
          active={sortMap[column.field] ? orderBy === mappedField : orderBy === column.field}
          direction={orderBy === mappedField ? order : 'asc'}
          onClick={() => handleSort(mappedField)}
          IconComponent={() => renderSortIcon(column.field)}
        >
          {column.label || column.field}
        </TableSortLabel>
      );
    }
    return column.label || column.field;
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
            {sortedVisibleColumns?.map((column) => (
              <TableCell
                key={column.field}
                className="!tw-font-semibold !tw-text-base !tw-py-4 !tw-bg-gray-50 !tw-sticky !tw-top-0 !tw-z-10"
                align={column.align || (column.field === 'actions' || column.field === 'associatedRfes' ? 'center' : 'left')}
                component="th"
                sortDirection={orderBy === (sortMap[column.field] || column.field) ? order : false}
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
                key={`${get(item, tableKey)}`}
                className="hover:!tw-bg-gray-50"
                hover
              >
                {sortedVisibleColumns?.map((colConfig) => (
                  <TableCell 
                    key={`${colConfig.field}-${get(item, tableKey)}`}
                    className={`${
                      dimmedRowConfig && get(item, dimmedRowConfig.keyPath) === dimmedRowConfig.value ? 'inactive' : ''
                    } ${colConfig.wide ? '!tw-min-w-[28rem]' : ''} ${
                      colConfig.field === 'name' ? "!tw-font-medium" : ""
                    }`}
                    align={colConfig.align || (colConfig.field === 'actions' || colConfig.field === 'associatedRfes' ? 'center' : 'left')}
                    component="td"
                    scope="row"
                    sx={{ 
                      ...(colConfig.field === 'name' && {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      })
                    }}
                  >
                    {renderCell(item, colConfig)}
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