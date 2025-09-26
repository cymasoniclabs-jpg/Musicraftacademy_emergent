import React from 'react';
import AdminAssessments from '../features/assessment/AdminAssessments';

const AdminAssessmentsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <AdminAssessments />
    </div>
  );
};

export default AdminAssessmentsPage;