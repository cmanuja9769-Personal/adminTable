import React from 'react';
import { Chip, Box } from '@mui/material';

interface ChipData {
  label: string;
  link?: string;
}

interface BaseChipProps {
  label: ChipData | ChipData[];
  maxCount?: number;
  className?: string;
  variant?: 'filled' | 'outlined';
}

const BaseChip: React.FC<BaseChipProps> = ({
  label,
  maxCount = 3,
  className = '',
  variant = 'filled'
}) => {
  const chips = Array.isArray(label) ? label : [label];
  const displayChips = chips.slice(0, maxCount);
  const remainingCount = chips.length - maxCount;

  return (
    <Box className={`!tw-flex !tw-flex-wrap !tw-gap-1 ${className}`}>
      {displayChips.map((chip, index) => (
        <Chip
          key={index}
          label={chip.label}
          variant={variant}
          size="small"
          onClick={chip.link ? () => window.open(chip.link, '_blank') : undefined}
          className={chip.link ? '!tw-cursor-pointer' : ''}
        />
      ))}
      {remainingCount > 0 && (
        <Chip
          label={`+${remainingCount} more`}
          variant="outlined"
          size="small"
          className="!tw-text-gray-500"
        />
      )}
    </Box>
  );
};

export default BaseChip;