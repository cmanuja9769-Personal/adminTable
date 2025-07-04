export interface ReportingFramework {
  id: string;
  name: string;
  associatedActiveRfe: number;
  updatedBy: string;
  updatedOn: string;
  isNew?: boolean;
  isEditing?: boolean;
}

export interface ReportDestination {
  id: string;
  name: string;
  associatedActiveRfe: number;
  updatedBy: string;
  updatedOn: string;
  isNew?: boolean;
  isEditing?: boolean;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

export enum ColumnDataType {
  TEXT = 'string',
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  ACTIONS = 'actions',
  CUSTOM = 'custom',
  LINK = 'link'
}

// Updated to match your reference ColumnConfig interface
export interface ColumnConfig {
  field: string;
  type: ColumnDataType;
  path: string;
  id?: string;
  order?: number;
  wide?: boolean;
  group?: string;
  default?: boolean;
  customCellPath?: string;
  customCellKeyPath?: string;
  href?: string;
  customClass?: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

// Keep TableColumn as alias for backward compatibility
export type TableColumn = ColumnConfig;

// Updated to match your reference TableConfig type
export type TableConfig = ColumnConfig[];

export interface BaseTableItem {
  id: string;
  name: string;
  associatedActiveRfe: number;
  isNew?: boolean;
  isEditing?: boolean;
}

export interface ManageTableProps<T extends BaseTableItem> {
  title: string;
  data: T[];
  columns: TableConfig;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onSave: (item: T) => void;
  onCancel: (item: T) => void;
  onDelete?: (item: T) => void;
  onClose: () => void;
}