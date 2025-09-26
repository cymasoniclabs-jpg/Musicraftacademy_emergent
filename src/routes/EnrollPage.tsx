import React from 'react';
import { useTranslation } from 'react-i18next';
import EnrollForm from '../features/forms/EnrollForm';

const EnrollPage: React.FC = () => {
  const { t } = useTranslation('forms');

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl md:text-5xl mb-6 bg-gradient-to-r from-royal-400 to-silver-300 bg-clip-text text-transparent font-bold">
            {t('enrollForm.title')}
          </h1>
          <p className="font-source text-xl text-gray-300 max-w-2xl mx-auto">
            {t('enrollForm.subtitle')}
          </p>
        </div>

        {/* Form */}
        <EnrollForm />
      </div>
    </div>
  );
};

export default EnrollPage;