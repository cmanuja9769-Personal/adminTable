import { useState, useMemo } from 'react';

interface UseTableConfig {
  prefix?: string;
  dimmedRowConfig?: {
    keyPath: string;
    value: any;
  };
  sortMap?: Record<string, string>;
  tableKey?: string;
}

export const useTable = (config?: UseTableConfig) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | 'none'>('none');
  const [sortField, setSortField] = useState<string>('');

  const defaultConfig = useMemo(() => ({
    prefix: config?.prefix || 'table',
    dimmedRowConfig: config?.dimmedRowConfig || null,
    sortMap: config?.sortMap || {},
    tableKey: config?.tableKey || 'id'
  }), [config]);

  return {
    ...defaultConfig,
    sortDirection,
    setSortDirection,
    sortField,
    setSortField
  };
};

export default useTable;