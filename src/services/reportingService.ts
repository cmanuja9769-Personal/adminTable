import type { ReportingFramework, ReportDestination } from '../types/reporting';

// Mock API service - replace with actual API calls
export class ReportingService {
  private static baseUrl = '/api/v1/core';

  // Reporting Frameworks
  static async getReportingFrameworks(): Promise<ReportingFramework[]> {
    // Mock data based on your API response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'ESRS',
            associatedActiveRfe: 118,
            updatedBy: 'Kishan',
            updatedOn: '04/07/2025'
          },
          {
            id: '2',
            name: 'India BSRS',
            associatedActiveRfe: 19,
            updatedBy: 'Kishan',
            updatedOn: '04/07/2025'
          },
          {
            id: '3',
            name: 'Mexico NIS',
            associatedActiveRfe: 4,
            updatedBy: 'Kishan',
            updatedOn: '04/07/2025'
          },
          {
            id: '4',
            name: 'SASB',
            associatedActiveRfe: 3,
            updatedBy: 'Kishan',
            updatedOn: '04/07/2025'
          },
          {
            id: '5',
            name: 'GRI',
            associatedActiveRfe: 5,
            updatedBy: 'Kishan',
            updatedOn: '04/07/2025'
          },
          {
            id: '6',
            name: 'UK SDR',
            associatedActiveRfe: 2,
            updatedBy: 'Kishan',
            updatedOn: '04/07/2025'
          },
          {
            id: '7',
            name: 'SB 219',
            associatedActiveRfe: 1,
            updatedBy: 'Kishan',
            updatedOn: '04/07/2025'
          }
        ]);
      }, 500);
    });
  }

  static async createReportingFramework(data: Partial<ReportingFramework>): Promise<ReportingFramework> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          name: data.name || '',
          associatedActiveRfe: 0,
          updatedBy: 'Current User',
          updatedOn: new Date().toLocaleDateString()
        });
      }, 500);
    });
  }

  static async updateReportingFramework(id: string, data: Partial<ReportingFramework>): Promise<ReportingFramework> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: data.name || '',
          associatedActiveRfe: data.associatedActiveRfe || 0,
          updatedBy: 'Current User',
          updatedOn: new Date().toLocaleDateString()
        });
      }, 500);
    });
  }

  // Report Destinations
  static async getReportDestinations(): Promise<ReportDestination[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '123',
            name: 'Impact Report',
            associatedActiveRfe: 118,
            updatedBy: 'Kishan',
            updatedOn: '04/07/2025'
          },
          {
            id: '124',
            name: 'Jurisdictional Report',
            associatedActiveRfe: 55,
            updatedBy: 'Kishan',
            updatedOn: '04/07/2025'
          }
        ]);
      }, 500);
    });
  }

  static async createReportDestination(data: Partial<ReportDestination>): Promise<ReportDestination> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          name: data.name || '',
          associatedActiveRfe: 0,
          updatedBy: 'Current User',
          updatedOn: new Date().toLocaleDateString()
        });
      }, 500);
    });
  }

  static async updateReportDestination(id: string, data: Partial<ReportDestination>): Promise<ReportDestination> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: data.name || '',
          associatedActiveRfe: data.associatedActiveRfe || 0,
          updatedBy: 'Current User',
          updatedOn: new Date().toLocaleDateString()
        });
      }, 500);
    });
  }
}