import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Button,
  Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';

export interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  
  // Size options
  size?: 'small' | 'medium' | 'large' | 'fullWidth';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullScreen?: boolean;
  
  // Header customization
  showCloseButton?: boolean;
  headerActions?: ReactNode;
  subtitle?: string;
  
  // Footer customization
  showFooter?: boolean;
  footerActions?: ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'contained' | 'outlined' | 'text';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'contained' | 'outlined' | 'text';
  };
  
  // Content customization
  disablePadding?: boolean;
  scrollable?: boolean;
  dividers?: boolean;
  
  // Style customization
  className?: string;
  contentClassName?: string;
  
  // Behavior
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
}

export const CommonDialog: React.FC<CommonDialogProps> = ({
  open,
  onClose,
  title,
  children,
  
  // Size options
  size = 'medium',
  maxWidth,
  fullScreen = false,
  
  // Header customization
  showCloseButton = true,
  headerActions,
  subtitle,
  
  // Footer customization
  showFooter = false,
  footerActions,
  primaryAction,
  secondaryAction,
  
  // Content customization
  disablePadding = false,
  scrollable = true,
  dividers = false,
  
  // Style customization
  className = '',
  contentClassName = '',
  
  // Behavior
  disableBackdropClick = false,
  disableEscapeKeyDown = false
}) => {
  
  const getSizeStyles = () => {
    if (fullScreen) return {};
    
    switch (size) {
      case 'small':
        return {
          width: '400px',
          maxWidth: '400px',
          height: '50vh',
          maxHeight: '50vh'
        };
      case 'medium':
        return {
          width: '650px',
          maxWidth: '650px',
          height: '70vh',
          maxHeight: '70vh'
        };
      case 'large':
        return {
          width: '900px',
          maxWidth: '900px',
          height: '80vh',
          maxHeight: '80vh'
        };
      case 'fullWidth':
        return {
          width: '95vw',
          maxWidth: '95vw',
          height: '90vh',
          maxHeight: '90vh'
        };
      default:
        return {};
    }
  };

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (disableBackdropClick && reason === 'backdropClick') return;
    if (disableEscapeKeyDown && reason === 'escapeKeyDown') return;
    onClose();
  };

  const renderFooter = () => {
    if (!showFooter && !primaryAction && !secondaryAction && !footerActions) {
      return null;
    }

    return (
      <DialogActions className="!tw-p-6 !tw-flex !tw-justify-between !tw-items-center !tw-flex-shrink-0">
        <Box className="!tw-flex !tw-gap-2">
          {footerActions}
        </Box>
        
        <Box className="!tw-flex !tw-gap-2">
          {secondaryAction && (
            <Button
              variant={secondaryAction.variant || 'text'}
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
              className="!tw-normal-case"
            >
              {secondaryAction.label}
            </Button>
          )}
          
          {primaryAction && (
            <Button
              variant={primaryAction.variant || 'contained'}
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className="!tw-normal-case"
            >
              {primaryAction.label}
            </Button>
          )}
        </Box>
      </DialogActions>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth={maxWidth || false}
      PaperProps={{
        className: `!tw-rounded-xl !tw-flex !tw-flex-col ${className}`,
        sx: getSizeStyles()
      }}
    >
      <DialogTitle className="!tw-flex !tw-justify-between !tw-items-start !tw-pb-2 !tw-border-b !tw-border-gray-200 !tw-flex-shrink-0">
        <Box className="!tw-flex !tw-flex-col !tw-gap-1">
          <Typography className="!tw-text-2xl !tw-font-semibold !tw-text-gray-900">
            {title}
          </Typography>
          {subtitle && (
            <Typography className="!tw-text-sm !tw-text-gray-600">
              {subtitle}
            </Typography>
          )}
        </Box>
        
        <Box className="!tw-flex !tw-items-center !tw-gap-2">
          {headerActions}
          {showCloseButton && (
            <IconButton onClick={onClose} size="large">
              <Close />
            </IconButton>
          )}
        </Box>
      </DialogTitle>

      <DialogContent 
        className={`!tw-overflow-hidden !tw-flex !tw-flex-col !tw-flex-1 ${contentClassName}`}
        sx={{
          padding: disablePadding ? 0 : undefined,
          overflowY: scrollable ? 'auto' : 'hidden',
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
        dividers={dividers}
      >
        {children}
      </DialogContent>

      {renderFooter()}
    </Dialog>
  );
};