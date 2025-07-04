import React from 'react';
import { Box, Button, Select, MenuItem, FormControl } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (count: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  itemsPerPage,
  handlePageChange,
  handleItemsPerPageChange
}) => {
  return (
    <Box className="!tw-flex !tw-items-center !tw-gap-4">
      <FormControl size="small">
        <Select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      
      <Box className="!tw-flex !tw-items-center !tw-gap-2">
        <Button
          variant="outlined"
          size="small"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          startIcon={<ChevronLeft />}
        >
          Previous
        </Button>
        
        <span className="!tw-text-sm !tw-text-gray-600">
          Page {currentPage + 1} of {lastPage}
        </span>
        
        <Button
          variant="outlined"
          size="small"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= lastPage - 1}
          endIcon={<ChevronRight />}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;