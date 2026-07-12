import React, { useState } from 'react';
import { CVWizard } from '@/components/cv/CVWizard';
import { TemplateSelector } from '@/components/cv/TemplateSelector';
import { useCVData } from '@/hooks/useCVData';
import { useCVCustomization } from '@/hooks/useCVCustomization';
import { CVCustomizer } from '@/components/cv/CVCustomizer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FileText, LayoutGrid, ClipboardEdit, Download } from 'lucide-react';

const Index = () => {
  const { data, setData, selectedTemplate, setSelectedTemplate, loadExampleData } = useCVData();
  const { customization, setCustomization } = useCVCustomization();
  const [view, setView] = useState<'templates' | 'wizard' | 'customizer'>('templates');

  const handleTemplateSelect = (template: number) => {
    setSelectedTemplate(template as 1 | 2 | 3 | 4 | 5);
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
          <div className="mb-6 sm:mb-8 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-sm p-4 sm:p-5 no-print">
            <p className="text-xs sm:text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
              En 3 étapes, créez votre CV en ligne
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { n: 1, label: 'Choisissez votre modèle', icon: LayoutGrid },
                { n: 2, label: 'Remplissez les rubriques', icon: ClipboardEdit },
                { n: 3, label: 'Téléchargez !', icon: Download },
              ].map(({ n, label, icon: Icon }) => (
                <li key={n} className="flex items-center gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-sm">
                    {n}
                  </span>
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-4 h-4 text-secondary shrink-0" />
                    <span className="text-sm text-foreground truncate">{label}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

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