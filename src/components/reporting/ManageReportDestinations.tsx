import React, { useState, useEffect } from 'react';
import { ManageTable } from '../common/ManageTable';
import type { ReportDestination, TableColumn } from '../../types/reporting';
import { ReportingService } from '../../services/reportingService';

interface ManageReportDestinationsProps {
  onClose: () => void;
}

export const ManageReportDestinations: React.FC<ManageReportDestinationsProps> = ({ onClose }) => {
  const [destinations, setDestinations] = useState<ReportDestination[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: TableColumn[] = [
    { id: 'number', label: 'RD #', sortable: true, width: '10%' },
    { id: 'name', label: 'Report Destination', sortable: true, width: '50%' },
    { id: 'associatedRfes', label: '# of Associated RFEs', sortable: true, width: '25%' },
    { id: 'actions', label: 'Actions', width: '15%' }
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
    <ManageTable
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