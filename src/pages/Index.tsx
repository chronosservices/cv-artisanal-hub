import React, { useState } from 'react';
import { CVWizard } from '@/components/cv/CVWizard';
import { TemplateSelector } from '@/components/cv/TemplateSelector';
import { useCVData } from '@/hooks/useCVData';
import { useCVCustomization } from '@/hooks/useCVCustomization';
import { CVCustomizer } from '@/components/cv/CVCustomizer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FileText } from 'lucide-react';

const Index = () => {
  const { data, setData, selectedTemplate, setSelectedTemplate, loadExampleData } = useCVData();
  const { customization, setCustomization } = useCVCustomization();
  const [view, setView] = useState<'templates' | 'wizard' | 'customizer'>('templates');

  const handleTemplateSelect = (template: number) => {
    setSelectedTemplate(template as 1 | 2 | 3);
    setView('wizard');
  };

  const handleBackToTemplates = () => {
    setView('templates');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-primary/5 relative">
      <ThemeToggle />

      {/* Header — compact and refined */}
      <header className="border-b bg-card/50 backdrop-blur-sm no-print">
        <div className="container mx-auto px-4 py-4 sm:py-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-lg font-bold text-foreground tracking-tight leading-none">
              Générateur de CV
            </h1>
            <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
              Créez, personnalisez, exportez en PDF
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {view === 'templates' && (
          <TemplateSelector
            onTemplateSelect={handleTemplateSelect}
            onLoadExample={loadExampleData}
            currentTemplate={selectedTemplate}
          />
        )}

        {view === 'wizard' && (
          <CVWizard
            data={data}
            onDataChange={setData}
            selectedTemplate={selectedTemplate}
            customization={customization}
            onBackToTemplates={handleBackToTemplates}
            onOpenCustomizer={() => setView('customizer')}
          />
        )}

        {view === 'customizer' && (
          <CVCustomizer
            customization={customization}
            onCustomizationChange={setCustomization}
            onClose={() => setView('wizard')}
          />
        )}
      </main>
    </div>
  );
};

export default Index;