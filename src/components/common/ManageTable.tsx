import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Box
} from '@mui/material';
import {
  Close,
  Add
} from '@mui/icons-material';
import type { ManageTableProps, BaseTableItem } from '../../types/reporting';
import { DataTable } from './DataTable';

export function ManageTable<T extends BaseTableItem>({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onSave,
  onCancel,
  onClose
}: ManageTableProps<T>) {
  
  return (
    <Dialog
      open={true}
      onClose={onClose}
      PaperProps={{
        className: "!tw-rounded-xl !tw-h-[80vh] !tw-w-[650px] !tw-max-w-[650px] !tw-max-h-[80vh] !tw-flex !tw-flex-col"
      }}
    >
      <DialogTitle className="!tw-flex !tw-justify-between !tw-items-center !tw-pb-2 !tw-border-b !tw-border-gray-200 !tw-flex-shrink-0">
        <span className="!tw-text-2xl !tw-font-semibold !tw-text-gray-900">
          {title}
        </span>
        <IconButton onClick={onClose} size="large">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="!tw-p-0 !tw-overflow-hidden !tw-flex !tw-flex-col !tw-flex-1">
        <Box className="!tw-p-6 !tw-flex !tw-justify-end !tw-flex-shrink-0">
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAdd}
            className="!tw-rounded-full !tw-px-6 !tw-py-2 !tw-text-base !tw-normal-case"
          >
            Add New
          </Button>
        </Box>

        <Box className="!tw-flex-1 !tw-overflow-hidden !tw-px-3">
          <DataTable
            data={data}
            columns={columns}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
          />
        </Box>

        <Box className="!tw-p-6 !tw-flex !tw-justify-start !tw-flex-shrink-0">
          <Button
            variant="text"
            onClick={onClose}
            className="!tw-text-blue-600 !tw-normal-case !tw-text-base !tw-font-medium"
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}