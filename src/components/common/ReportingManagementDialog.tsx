import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import type { ManageTableProps, BaseTableItem } from '../../types/reporting';
import { SortDirection } from '../../types/reporting';
import { ReportingTableView } from './ReportingTableView';
import { CommonDialog } from './CommonDialog';

export function ReportingManagementDialog<T extends BaseTableItem>({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onSave,
  onCancel,
  onClose
}: ManageTableProps<T>) {
  const [order, setOrder] = useState<SortDirection>(SortDirection.NONE);
  const [orderBy, setOrderBy] = useState<string>('');

  const handleSort = (field: string) => {
    const isAsc = orderBy === field && order === SortDirection.ASC;
    const isDesc = orderBy === field && order === SortDirection.DESC;
    
    if (isAsc) {
      setOrder(SortDirection.DESC);
    } else if (isDesc) {
      setOrder(SortDirection.NONE);
      setOrderBy('');
    } else {
      setOrder(SortDirection.ASC);
      setOrderBy(field);
    }
  };

  const renderNoRecords = () => {
    if (data.length === 0) {
      return (
        <Box className="!tw-flex !tw-flex-col !tw-items-center !tw-justify-center !tw-py-16">
          <Typography className="!tw-text-gray-500 !tw-text-lg">
            No records found
          </Typography>
          <Typography className="!tw-text-gray-400 !tw-text-sm !tw-mt-2">
            Click "Add New" to create your first entry
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const headerActions = (
    <Button
      variant="contained"
      startIcon={<Add />}
      onClick={onAdd}
      className="!tw-rounded-full !tw-px-6 !tw-py-2 !tw-text-base !tw-normal-case"
    >
      Add New
    </Button>
  );
  
  return (
    <CommonDialog
      open={true}
      onClose={onClose}
      title={title}
      size="medium"
      headerActions={headerActions}
      showFooter={true}
      secondaryAction={{
        label: 'Close',
        onClick: onClose,
        variant: 'text'
      }}
      disablePadding={true}
      contentClassName="!tw-p-0"
    >
      <Box className="!tw-flex-1 !tw-overflow-hidden !tw-px-3 !tw-pt-6">
        {data.length > 0 ? (
          <ReportingTableView
            data={data}
            columns={columns}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
            order={order}
            orderBy={orderBy}
            onSort={handleSort}
          />
        ) : (
          renderNoRecords()
        )}
      </Box>
    </CommonDialog>
  );
}