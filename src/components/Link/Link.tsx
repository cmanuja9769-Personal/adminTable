import React, { ReactNode } from 'react';
import { Link as MuiLink } from '@mui/material';

interface LinkProps {
  children: ReactNode;
  to: string;
  isExternal?: boolean;
  target?: string;
  rel?: string;
  className?: string;
}

const Link: React.FC<LinkProps> = ({
  children,
  to,
  isExternal = false,
  target = '_self',
  rel,
  className = ''
}) => {
  return (
    <MuiLink
      href={to}
      target={target}
      rel={rel}
      className={`!tw-text-blue-600 !tw-no-underline hover:!tw-underline ${className}`}
    >
      {children}
    </MuiLink>
  );
};

export default Link;