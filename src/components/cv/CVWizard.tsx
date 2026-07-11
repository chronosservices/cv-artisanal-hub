import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CVPreview } from './CVPreview';
import { CVPrintRoot } from './CVPrintRoot';
import { PersonalInfoStep } from './wizard/PersonalInfoStep';
import { FormationsStep } from './wizard/FormationsStep';
import { ExperiencesStep } from './wizard/ExperiencesStep';
import { SkillsStep } from './wizard/SkillsStep';
import { FinalStep } from './wizard/FinalStep';
import { CVData, CVCustomization, TemplateType } from '@/types/cv';
import { exportToPDF } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Eye, Download, Palette, LayoutGrid, Loader2, X } from 'lucide-react';

interface CVWizardProps {
  data: CVData;
  onDataChange: (data: CVData) => void;
  selectedTemplate: TemplateType;
  customization?: CVCustomization;
  onBackToTemplates: () => void;
  onOpenCustomizer: () => void;
}

const steps = [
  { id: 1, title: 'Informations personnelles', short: 'Infos' },
  { id: 2, title: 'Formations', short: 'Formations' },
  { id: 3, title: 'Expériences', short: 'Expériences' },
  { id: 4, title: 'Compétences', short: 'Compétences' },
  { id: 5, title: 'Finalisation', short: 'Final' }
];

export const CVWizard: React.FC<CVWizardProps> = ({
  data, onDataChange, selectedTemplate, customization, onBackToTemplates, onOpenCustomizer
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const progress = (currentStep / steps.length) * 100;

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const filename = `CV_${(data.personalInfo.firstName || 'Mon').trim()}_${(data.personalInfo.lastName || 'CV').trim()}`
        .replace(/[^a-z0-9_-]/gi, '_');
      await exportToPDF('cv-print-root', filename);
      toast({
        title: 'Boîte d\'impression ouverte',
        description: 'Choisissez « Enregistrer au format PDF » pour télécharger votre CV.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'ouvrir la boîte d\'impression.',
        variant: 'destructive',
      });
    } finally {
      setTimeout(() => setIsExporting(false), 500);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoStep data={data} onDataChange={onDataChange} />;
      case 2: return <FormationsStep data={data} onDataChange={onDataChange} />;
      case 3: return <ExperiencesStep data={data} onDataChange={onDataChange} />;
      case 4: return <SkillsStep data={data} onDataChange={onDataChange} />;
      case 5: return <FinalStep data={data} onDataChange={onDataChange} onExportPDF={handleExportPDF} />;
      default: return null;
    }
  };

  return (
    <>
      {/* Hidden print portal — always mounted so window.print() works instantly */}
      <CVPrintRoot data={data} selectedTemplate={selectedTemplate} customization={customization} />

      <div className="space-y-4 sm:space-y-6 no-print">
        {/* TOP BAR — responsive action buttons */}
        <div className="sticky top-0 z-30 -mx-4 sm:mx-0 bg-background/80 backdrop-blur-md border-b sm:border-0 sm:rounded-xl sm:bg-card sm:shadow-sm">
          <div className="px-4 sm:px-4 py-3 flex flex-wrap items-center gap-2">
            <Button
              variant="outline" size="sm"
              onClick={onBackToTemplates}
              className="h-9 px-3 text-xs sm:text-sm"
            >
              <LayoutGrid className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Modèles</span>
            </Button>
            <Button
              variant="outline" size="sm"
              onClick={onOpenCustomizer}
              className="h-9 px-3 text-xs sm:text-sm border-secondary/40 text-secondary hover:bg-secondary/10"
            >
              <Palette className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Personnaliser</span>
            </Button>
            <div className="flex-1" />
            <Button
              variant="outline" size="sm"
              onClick={() => setShowMobilePreview(true)}
              className="h-9 px-3 text-xs sm:text-sm xl:hidden border-primary/40 text-primary hover:bg-primary/10"
            >
              <Eye className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Aperçu</span>
            </Button>
            <Button
              size="sm"
              onClick={handleExportPDF}
              disabled={isExporting}
              className="h-9 px-3 text-xs sm:text-sm bg-gradient-to-r from-primary to-primary-glow shadow-md hover:shadow-lg"
            >
              {isExporting ? <Loader2 className="w-4 h-4 sm:mr-1.5 animate-spin" /> : <Download className="w-4 h-4 sm:mr-1.5" />}
              <span className="hidden sm:inline">PDF</span>
            </Button>
          </div>
        </div>

        {/* PROGRESS HEADER */}
        <Card className="shadow-sm border-0 bg-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base sm:text-xl font-bold text-primary truncate">
                  {steps[currentStep - 1].title}
                </CardTitle>
                <span className="shrink-0 text-xs sm:text-sm text-muted-foreground font-medium">
                  {currentStep} / {steps.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              {/* Step dots — visible on tablet+ */}
              <div className="hidden sm:flex items-center gap-1.5">
                {steps.map((step, i) => (
                  <React.Fragment key={step.id}>
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`shrink-0 w-7 h-7 rounded-full text-xs font-semibold transition-all ${
                        step.id <= currentStep
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {step.id}
                    </button>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 rounded ${step.id < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* CONTENT + DESKTOP PREVIEW */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
          <div className="xl:col-span-3 space-y-4">
            <Card className="shadow-sm border-0">
              <CardContent className="p-4 sm:p-6">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* NAVIGATION */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="h-11 text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Précédent
              </Button>
              {currentStep === steps.length ? (
                <Button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="h-11 text-sm bg-gradient-to-r from-primary to-primary-glow"
                >
                  {isExporting ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Download className="w-4 h-4 mr-1.5" />}
                  Télécharger
                </Button>
              ) : (
                <Button
                  onClick={() => currentStep < steps.length && setCurrentStep(currentStep + 1)}
                  className="h-11 text-sm bg-gradient-to-r from-primary to-primary-glow"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              )}
            </div>
          </div>

          <div className="hidden xl:block xl:col-span-2">
            <div className="sticky top-24">
              <CVPreview data={data} selectedTemplate={selectedTemplate} customization={customization} />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE PREVIEW OVERLAY */}
      {showMobilePreview && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm no-print flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
            <h2 className="text-base font-semibold">Aperçu du CV</h2>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
                className="h-9 px-3 bg-gradient-to-r from-primary to-primary-glow"
              >
                {isExporting ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Download className="w-4 h-4 mr-1.5" />}
                PDF
              </Button>
              <Button
                variant="outline" size="sm"
                onClick={() => setShowMobilePreview(false)}
                className="h-9 w-9 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-3">
            <CVPreview data={data} selectedTemplate={selectedTemplate} customization={customization} />
          </div>
        </div>
      )}
    </>
  );
};
