import React, { useState, useEffect } from 'react';
import { ReportingManagementDialog } from '../common/ReportingManagementDialog';
import type { ReportingFramework, TableConfig } from '../../types/reporting';
import { ColumnDataType } from '../../types/reporting';
import { ReportingService } from '../../services/reportingService';

interface ManageReportingFrameworksProps {
  onClose: () => void;
}

export const ManageReportingFrameworks: React.FC<ManageReportingFrameworksProps> = ({ onClose }) => {
  const [frameworks, setFrameworks] = useState<ReportingFramework[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: TableConfig = [
    { 
      field: 'number', 
      path: 'id', 
      default: true, 
      type: ColumnDataType.NUMBER,
      label: '#', 
      sortable: false,
      order: 1,
      align: 'center'
    },
    { 
      field: 'name', 
      path: 'name', 
      default: true, 
      type: ColumnDataType.TEXT,
      label: 'Reporting Framework', 
      sortable: true,
      order: 2,
      wide: false
    },
    { 
      field: 'associatedRfes', 
      path: 'associatedActiveRfe', 
      default: true, 
      type: ColumnDataType.NUMBER,
      label: '# RFEs', 
      sortable: true,
      order: 3,
      align: 'center'
    },
    { 
      field: 'actions', 
      path: 'actions', 
      default: true, 
      type: ColumnDataType.ACTIONS,
      label: 'Actions',
      order: 4,
      align: 'center'
    }
  ];

  useEffect(() => {
    loadFrameworks();
  }, []);

  const loadFrameworks = async () => {
    try {
      setLoading(true);
      const data = await ReportingService.getReportingFrameworks();
      setFrameworks(data);
    } catch (error) {
      console.error('Failed to load frameworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    const newFramework: ReportingFramework = {
      id: `temp-${Date.now()}`,
      name: '',
      associatedActiveRfe: 0,
      updatedBy: '',
      updatedOn: '',
      isNew: true,
      isEditing: true
    };
    setFrameworks(prev => [...prev, newFramework]);
  };

  const handleEdit = (framework: ReportingFramework) => {
    setFrameworks(prev =>
      prev.map(item =>
        item.id === framework.id
          ? { ...item, isEditing: true }
          : item
      )
    );
  };

  const handleSave = async (framework: ReportingFramework) => {
    try {
      if (framework.isNew) {
        const saved = await ReportingService.createReportingFramework({
          name: framework.name
        });
        setFrameworks(prev =>
          prev.map(item =>
            item.id === framework.id
              ? { ...saved, isEditing: false, isNew: false }
              : item
          )
        );
      } else {
        const updated = await ReportingService.updateReportingFramework(framework.id, {
          name: framework.name
        });
        setFrameworks(prev =>
          prev.map(item =>
            item.id === framework.id
              ? { ...updated, isEditing: false }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Failed to save framework:', error);
    }
  };

  const handleCancel = (framework: ReportingFramework) => {
    if (framework.isNew) {
      // Remove new unsaved row
      setFrameworks(prev => prev.filter(item => item.id !== framework.id));
    } else {
      // Reset editing state for existing row
      setFrameworks(prev =>
        prev.map(item =>
          item.id === framework.id
            ? { ...item, isEditing: false }
            : item
        )
      );
    }
  };

  if (loading) {
    return null; // Or loading spinner
  }

  return (
    <ReportingManagementDialog
      title="Manage Reporting Frameworks"
      data={frameworks}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onClose={onClose}
    />
  );
};