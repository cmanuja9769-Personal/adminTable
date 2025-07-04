import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { HeaderDropdown } from '../common/HeaderDropdown';

interface HeaderProps {
  onManageFrameworks: () => void;
  onManageDestinations: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onManageFrameworks,
  onManageDestinations
}) => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Typography 
          variant="h6" 
          component="h1" 
          sx={{ 
            color: 'text.primary',
            fontWeight: 600
          }}
        >
          Reporting Management System
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HeaderDropdown
            onManageFrameworks={onManageFrameworks}
            onManageDestinations={onManageDestinations}
          />
          
          <IconButton size="large" sx={{ color: 'text.primary' }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};