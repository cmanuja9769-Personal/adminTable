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

// Match your exact ColumnDataType enum with ACTIONS added back
export enum ColumnDataType {
  TEXT = 'string',
  DATE = 'date',
  CUSTOM = 'custom',
  LINK = 'link',
  ACTIONS = 'actions',
  NUMBER = 'number'
}

// Match your exact ColumnConfig interface
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
  label?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

// Match your exact TableConfig type
export type TableConfig = ColumnConfig[];

// Action config for table actions
export interface ActionConfig<T> {
  label: string;
  onClick: (item: T) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

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