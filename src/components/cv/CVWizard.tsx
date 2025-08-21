import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CVPreview } from './CVPreview';
import { PersonalInfoStep } from './wizard/PersonalInfoStep';
import { FormationsStep } from './wizard/FormationsStep';
import { ExperiencesStep } from './wizard/ExperiencesStep';
import { SkillsStep } from './wizard/SkillsStep';
import { FinalStep } from './wizard/FinalStep';
import { CVData, CVCustomization } from '@/types/cv';
import { exportToPDF } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Eye, Download, ChevronLeft, Palette } from 'lucide-react';

interface CVWizardProps {
  data: CVData;
  onDataChange: (data: CVData) => void;
  selectedTemplate: 1 | 2;
  customization?: CVCustomization;
  onBackToTemplates: () => void;
  onOpenCustomizer: () => void;
}

const steps = [
  { id: 1, title: 'Informations personnelles' },
  { id: 2, title: 'Formations' },
  { id: 3, title: 'Expériences' },
  { id: 4, title: 'Compétences & Plus' },
  { id: 5, title: 'Finalisation' }
];

export const CVWizard: React.FC<CVWizardProps> = ({
  data,
  onDataChange,
  selectedTemplate,
  customization,
  onBackToTemplates,
  onOpenCustomizer
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const filename = `CV_${data.personalInfo.firstName || 'Mon'}_${data.personalInfo.lastName || 'CV'}`.replace(/[^a-z0-9]/gi, '_') + '.pdf';
      
      // Attendre un peu pour s'assurer que le rendu est complet
      await new Promise(resolve => setTimeout(resolve, 200));
      
      await exportToPDF('cv-template', filename);
      toast({
        title: "CV exporté avec succès !",
        description: "Votre CV a été téléchargé au format PDF.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      toast({
        title: "Erreur d'exportation",
        description: error instanceof Error ? error.message : "Une erreur s'est produite lors de l'export. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={data} onDataChange={onDataChange} />;
      case 2:
        return <FormationsStep data={data} onDataChange={onDataChange} />;
      case 3:
        return <ExperiencesStep data={data} onDataChange={onDataChange} />;
      case 4:
        return <SkillsStep data={data} onDataChange={onDataChange} />;
      case 5:
        return <FinalStep data={data} onDataChange={onDataChange} onExportPDF={handleExportPDF} />;
      default:
        return null;
    }
  };

  if (showPreview) {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowPreview(false)}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Retour au formulaire
              </Button>
              <Button
                onClick={handleExportPDF}
                className="flex items-center gap-2 bg-gradient-to-r from-secondary to-accent"
              >
                <Download className="w-4 h-4" />
                Télécharger PDF
              </Button>
            </div>
          </CardHeader>
        </Card>
        <CVPreview data={data} selectedTemplate={selectedTemplate} customization={customization} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with progress */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20 animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={onBackToTemplates}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Changer de modèle
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onOpenCustomizer}
                className="flex items-center gap-2 border-secondary/50 text-secondary hover:bg-secondary/5"
              >
                <Palette className="w-4 h-4" />
                Personnaliser
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 border-primary/50 text-primary hover:bg-primary/5 md:hidden"
              >
                <Eye className="w-4 h-4" />
                Aperçu
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-primary">
                {steps[currentStep - 1].title}
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                Étape {currentStep} sur {steps.length}
              </span>
            </div>
            
            <Progress value={progress} className="h-3" />
            
            {/* Steps indicator */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step.id <= currentStep
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                        step.id < currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form Content */}
        <div className="xl:col-span-2">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20 animate-scale-in">
            <CardContent className="p-6">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 border-primary/50 text-primary hover:bg-primary/5 md:hidden"
            >
              <Eye className="w-4 h-4" />
              Aperçu
            </Button>

            {currentStep === steps.length ? (
              <Button
                onClick={handleExportPDF}
                className="flex items-center gap-2 bg-gradient-to-r from-secondary to-accent"
              >
                <Download className="w-4 h-4" />
                Télécharger PDF
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-glow"
              >
                Suivant
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Preview Section - Desktop only */}
        <div className="hidden md:block">
          <div className="sticky top-6">
            <CVPreview data={data} selectedTemplate={selectedTemplate} customization={customization} />
          </div>
        </div>
      </div>
    </div>
  );
};