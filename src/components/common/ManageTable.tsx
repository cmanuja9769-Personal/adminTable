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
        sx: {
          borderRadius: 3,
          height: '80vh',
          width: '650px',
          maxWidth: '650px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <DialogTitle
        className="!tw-flex !tw-justify-between !tw-items-center !tw-pb-2 !tw-border-b !tw-border-gray-200"
        sx={{ flexShrink: 0 }}
      >
        <span className="!tw-text-2xl !tw-font-semibold !tw-text-gray-900">
          {title}
        </span>
        <IconButton onClick={onClose} size="large">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent 
        sx={{ 
          p: 0, 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <Box 
          className="!tw-p-6 !tw-flex !tw-justify-end"
          sx={{ flexShrink: 0 }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAdd}
            className="!tw-rounded-full !tw-px-6 !tw-py-2 !tw-text-base !tw-normal-case"
          >
            Add New
          </Button>
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden', px: 3 }}>
          <DataTable
            data={data}
            columns={columns}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
          />
        </Box>

        <Box 
          className="!tw-p-6 !tw-flex !tw-justify-start"
          sx={{ flexShrink: 0 }}
        >
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