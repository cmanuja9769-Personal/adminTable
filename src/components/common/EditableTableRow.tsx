import React, { useState, useEffect, useRef, forwardRef } from 'react';
import {
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Box
} from '@mui/material';
import {
  Check,
  Close
} from '@mui/icons-material';

interface EditableRowProps<T> {
  item: T;
  onSave: (item: T) => void;
  onCancel: (item: T) => void;
  rowNumber?: number;
}

export const EditableTableRow = forwardRef<HTMLTableRowElement, EditableRowProps<any>>(function EditableTableRow<T extends { id: string; name: string; isNew?: boolean; isEditing?: boolean; associatedActiveRfe?: number }>({
  item,
  onSave,
  onCancel,
  rowNumber
}: EditableRowProps<T>, ref) {
  const [editedName, setEditedName] = useState(item.name);
  const [originalName] = useState(item.name);
  const [hasChanges, setHasChanges] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedName(item.name);
    setHasChanges(false);
  }, [item.name]);

  // Auto-focus the text field for new rows
  useEffect(() => {
    if (item.isNew && textFieldRef.current) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        textFieldRef.current?.focus();
      }, 100);
    }
  }, [item.isNew]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEditedName(newValue);
    setHasChanges(newValue !== originalName);
  };

  const handleSave = () => {
    if (item.isNew && !editedName.trim()) {
      onCancel(item);
      return;
    }
    
    onSave({
      ...item,
      name: editedName.trim()
    });
  };

  const handleCancel = () => {
    if (item.isNew) {
      onCancel(item);
    } else {
      setEditedName(originalName);
      setHasChanges(false);
      onCancel(item);
    }
  };

  const getAssociatedRFEs = () => {
    return item.isNew ? '-' : (item.associatedActiveRfe || 0);
  };

  // Determine if save button should be disabled
  const isSaveDisabled = () => {
    if (item.isNew) {
      // For new rows, disable if name is empty
      return !editedName.trim();
    } else {
      // For existing rows, disable if no changes or name is empty
      return !hasChanges || !editedName.trim();
    }
  };

  return (
    <TableRow
      ref={ref}
      className={`${
        item.isNew 
          ? '!tw-bg-blue-50 hover:!tw-bg-blue-100' 
          : 'hover:!tw-bg-gray-50'
      }`}
    >
      <TableCell>{rowNumber || '-'}</TableCell>
      <TableCell>
        <TextField
          inputRef={textFieldRef}
          value={editedName}
          onChange={handleNameChange}
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Enter name"
          className="!tw-bg-white"
        />
      </TableCell>
      <TableCell align="center">{getAssociatedRFEs()}</TableCell>
      <TableCell align="center">
        <Box className="!tw-flex !tw-gap-2 !tw-justify-center">
          <IconButton
            onClick={handleCancel}
            size="small"
            className="!tw-text-red-600 hover:!tw-bg-red-500 hover:!tw-text-white"
          >
            <Close />
          </IconButton>
          <IconButton
            onClick={handleSave}
            size="small"
            disabled={isSaveDisabled()}
            className="!tw-text-green-600 hover:!tw-bg-green-500 hover:!tw-text-white disabled:!tw-text-gray-400"
          >
            <Check />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
});