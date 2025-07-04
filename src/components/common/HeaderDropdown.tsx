import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import {
  KeyboardArrowDown,
  TableChart,
  Description
} from '@mui/icons-material';

interface DropdownOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface HeaderDropdownProps {
  onManageFrameworks: () => void;
  onManageDestinations: () => void;
}

export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  onManageFrameworks,
  onManageDestinations
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options: DropdownOption[] = [
    {
      id: 'frameworks',
      label: 'Manage Reporting Frameworks',
      icon: <TableChart />,
      onClick: () => {
        onManageFrameworks();
        handleClose();
      }
    },
    {
      id: 'destinations',
      label: 'Manage Report Destinations',
      icon: <Description />,
      onClick: () => {
        onManageDestinations();
        handleClose();
      }
    }
  ];

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        sx={{
          textTransform: 'none',
          borderRadius: 2,
          px: 3,
          py: 1
        }}
      >
        Manage Reports
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 250,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={option.onClick}
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {option.icon}
            </ListItemIcon>
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};