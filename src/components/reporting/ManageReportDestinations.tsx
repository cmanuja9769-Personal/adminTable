import React, { useState, useEffect } from 'react';
import { ReportingManagementDialog } from '../common/ReportingManagementDialog';
import type { ReportDestination, TableConfig } from '../../types/reporting';
import { ColumnDataType } from '../../types/reporting';
import { ReportingService } from '../../services/reportingService';

interface ManageReportDestinationsProps {
  onClose: () => void;
}

export const ManageReportDestinations: React.FC<ManageReportDestinationsProps> = ({ onClose }) => {
  const [destinations, setDestinations] = useState<ReportDestination[]>([]);
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
      label: 'Report Destination', 
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
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      setLoading(true);
      const data = await ReportingService.getReportDestinations();
      setDestinations(data);
    } catch (error) {
      console.error('Failed to load destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    const newDestination: ReportDestination = {
      id: `temp-${Date.now()}`,
      name: '',
      associatedActiveRfe: 0,
      updatedBy: '',
      updatedOn: '',
      isNew: true,
      isEditing: true
    };
    setDestinations(prev => [...prev, newDestination]);
  };

  const handleEdit = (destination: ReportDestination) => {
    setDestinations(prev =>
      prev.map(item =>
        item.id === destination.id
          ? { ...item, isEditing: true }
          : item
      )
    );
  };

  const handleSave = async (destination: ReportDestination) => {
    try {
      if (destination.isNew) {
        const saved = await ReportingService.createReportDestination({
          name: destination.name
        });
        setDestinations(prev =>
          prev.map(item =>
            item.id === destination.id
              ? { ...saved, isEditing: false, isNew: false }
              : item
          )
        );
      } else {
        const updated = await ReportingService.updateReportDestination(destination.id, {
          name: destination.name
        });
        setDestinations(prev =>
          prev.map(item =>
            item.id === destination.id
              ? { ...updated, isEditing: false }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Failed to save destination:', error);
    }
  };

  const handleCancel = (destination: ReportDestination) => {
    if (destination.isNew) {
      // Remove new unsaved row
      setDestinations(prev => prev.filter(item => item.id !== destination.id));
    } else {
      // Reset editing state for existing row
      setDestinations(prev =>
        prev.map(item =>
          item.id === destination.id
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
      title="Manage Report Destinations"
      data={destinations}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onClose={onClose}
    />
  );
};