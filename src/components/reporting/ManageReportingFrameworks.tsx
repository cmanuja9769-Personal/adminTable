import React, { useState, useEffect } from 'react';
import { ManageTable } from '../common/ManageTable';
import type { ReportingFramework, TableColumn } from '../../types/reporting';
import { ColumnDataType } from '../../types/reporting';
import { ReportingService } from '../../services/reportingService';

interface ManageReportingFrameworksProps {
  onClose: () => void;
}

export const ManageReportingFrameworks: React.FC<ManageReportingFrameworksProps> = ({ onClose }) => {
  const [frameworks, setFrameworks] = useState<ReportingFramework[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: TableColumn[] = [
    { 
      field: 'number', 
      path: 'number', 
      default: false, 
      type: ColumnDataType.NUMBER,
      label: 'RF #', 
      sortable: true
    },
    { 
      field: 'name', 
      path: 'name', 
      default: '', 
      type: ColumnDataType.TEXT,
      label: 'Reporting Framework', 
      sortable: true
    },
    { 
      field: 'associatedRfes', 
      path: 'associatedActiveRfe', 
      default: 0, 
      type: ColumnDataType.NUMBER,
      label: '# of Associated RFEs', 
      sortable: true
    },
    { 
      field: 'actions', 
      path: 'actions', 
      default: false, 
      type: ColumnDataType.ACTIONS,
      label: 'Actions'
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
    <ManageTable
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