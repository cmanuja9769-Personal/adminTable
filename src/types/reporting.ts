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

export interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface ManageTableProps<T> {
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