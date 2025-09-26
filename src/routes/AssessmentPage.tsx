import React from 'react';
import AssessmentWizard from '../features/assessment/AssessmentWizard';

const AssessmentPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <AssessmentWizard />
    </div>
  );
};

export default AssessmentPage;