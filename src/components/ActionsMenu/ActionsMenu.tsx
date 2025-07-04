import React, { ReactNode } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface ActionConfig<T> {
  label: string;
  onClick: (item: T) => void;
  disabled?: boolean;
  icon?: ReactNode;
}

interface ActionsMenuProps<T> {
  actions: ActionConfig<T>[];
  payload: T;
  children?: ReactNode;
}

const ActionsMenu = <T,>({ actions, payload, children }: ActionsMenuProps<T>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: ActionConfig<T>) => {
    action.onClick(payload);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        {children || <MoreVert />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => handleAction(action)}
            disabled={action.disabled}
          >
            {action.icon && <span style={{ marginRight: 8 }}>{action.icon}</span>}
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionsMenu;