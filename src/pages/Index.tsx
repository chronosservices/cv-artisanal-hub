import React, { useState } from 'react';
import { CVWizard } from '@/components/cv/CVWizard';
import { TemplateSelector } from '@/components/cv/TemplateSelector';
import { useCVData } from '@/hooks/useCVData';
import { FileText, Sparkles } from 'lucide-react';

const Index = () => {
  const { data, setData, selectedTemplate, setSelectedTemplate, loadExampleData } = useCVData();
  const [showWizard, setShowWizard] = useState(false);

  const handleTemplateSelect = (template: number) => {
    setSelectedTemplate(template as 1 | 2);
    setShowWizard(true);
  };

  const handleBackToTemplates = () => {
    setShowWizard(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow shadow-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in">
              <FileText className="w-8 h-8 animate-bounce" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Générateur de CV Professionnel
              </h1>
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in">
              Créez votre CV professionnel avec nos modèles personnalisables et notre aperçu en temps réel
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {!showWizard ? (
          <TemplateSelector 
            onTemplateSelect={handleTemplateSelect}
            onLoadExample={loadExampleData}
          />
        ) : (
          <CVWizard
            data={data}
            onDataChange={setData}
            selectedTemplate={selectedTemplate}
            onBackToTemplates={handleBackToTemplates}
          />
        )}
      </div>
    </div>
  );
};

export default Index;