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

export enum ColumnDataType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  ACTIONS = 'actions'
}

export interface TableColumn {
  field: string;
  path: string;
  group?: string;
  default: boolean | string | number;
  type: ColumnDataType;
  label: string;
  sortable?: boolean;
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
  columns: TableColumn[];
  onAdd: () => void;
  onEdit: (item: T) => void;
  onSave: (item: T) => void;
  onCancel: (item: T) => void;
  onDelete?: (item: T) => void;
  onClose: () => void;
}