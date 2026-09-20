import React, { createContext, useContext, useState, useEffect } from 'react';

const ApplicationsContext = createContext();

export const useApplications = () => useContext(ApplicationsContext);

export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('applications_tracker');
    if (saved) return JSON.parse(saved);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('applications_tracker', JSON.stringify(applications));
  }, [applications]);

  const startApplication = (scholarship) => {
    setApplications(prev => {
      if (prev.find(a => a.scholarshipId === scholarship._id)) return prev;
      
      const newApp = {
        id: `APP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        scholarshipId: scholarship._id,
        scholarshipName: scholarship.name,
        scholarshipProvider: scholarship.provider || 'Official Authority',
        officialLink: scholarship.officialLink || 'https://scholarships.gov.in',
        deadline: scholarship.deadline,
        dateStarted: new Date().toISOString(),
        formFilledOnOfficialSite: false,
        status: 'Preparing', // Preparing, Applied
        documents: [
          { name: 'Aadhaar / Identity Document', status: 'Required' },
          { name: 'Income Certificate', status: 'Required' },
          { name: 'Caste / Category Certificate', status: 'Required' },
          { name: 'Academic Marksheet', status: 'Required' },
          { name: 'Bank Passbook (Aadhaar Seeded)', status: 'Required' }
        ]
      };
      return [...prev, newApp];
    });
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
  };

  const toggleFormFilled = (appId) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const nextState = !app.formFilledOnOfficialSite;
        return {
          ...app,
          formFilledOnOfficialSite: nextState,
          status: nextState ? 'Applied' : 'Preparing'
        };
      }
      return app;
    }));
  };

  const updateDocumentStatus = (appId, docName, newStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          documents: app.documents.map(doc => 
            doc.name === docName ? { ...doc, status: newStatus } : doc
          )
        };
      }
      return app;
    }));
  };

  const getApplication = (scholarshipId) => {
    return applications.find(a => a.scholarshipId === scholarshipId);
  };

  return (
    <ApplicationsContext.Provider value={{ 
      applications, 
      startApplication, 
      updateApplicationStatus, 
      updateDocumentStatus,
      toggleFormFilled,
      getApplication
    }}>
      {children}
    </ApplicationsContext.Provider>
  );
};
