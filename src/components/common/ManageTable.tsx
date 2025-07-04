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
import type { ManageTableProps } from '../../types/reporting';
import { DataTable } from './DataTable';

export function ManageTable<T extends { 
  id: string; 
  name: string; 
  associatedActiveRfe: number;
  isNew?: boolean; 
  isEditing?: boolean 
}>({
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
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: '70vh'
        }
      }}
    >
      <DialogTitle
        className="!tw-flex !tw-justify-between !tw-items-center !tw-pb-2 !tw-border-b !tw-border-gray-200"
      >
        <span className="!tw-text-2xl !tw-font-semibold !tw-text-gray-900">
          {title}
        </span>
        <IconButton onClick={onClose} size="large">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box className="!tw-p-6 !tw-flex !tw-justify-end">
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAdd}
            className="!tw-rounded-full !tw-px-6 !tw-py-2 !tw-text-base !tw-normal-case"
          >
            Add New
          </Button>
        </Box>

        <DataTable
          data={data}
          columns={columns}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
        />

        <Box className="!tw-p-6 !tw-flex !tw-justify-start">
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