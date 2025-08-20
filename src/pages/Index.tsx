import React from 'react';
import { CVForm } from '@/components/cv/CVForm';
import { CVPreview } from '@/components/cv/CVPreview';
import { useCVData } from '@/hooks/useCVData';
import { exportToPDF } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import { FileText, Sparkles } from 'lucide-react';

const Index = () => {
  const { data, setData, selectedTemplate, setSelectedTemplate, loadExampleData } = useCVData();
  const { toast } = useToast();

  const handleExportPDF = async () => {
    try {
      const fileName = `CV_${data.personalInfo.firstName || 'MonCV'}_${data.personalInfo.lastName || 'Professionnel'}.pdf`;
      await exportToPDF('cv-preview-container', fileName);
      toast({
        title: "✅ CV exporté avec succès !",
        description: "Votre CV a été téléchargé en PDF.",
      });
    } catch (error) {
      toast({
        title: "❌ Erreur lors de l'export",
        description: "Une erreur s'est produite lors de l'export du PDF.",
        variant: "destructive",
      });
    }
  };

  const handleLoadExample = () => {
    loadExampleData();
    toast({
      title: "✨ Exemple chargé !",
      description: "Les données d'exemple ont été chargées avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow shadow-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Générateur de CV Professionnel
              </h1>
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Créez votre CV professionnel avec nos modèles personnalisables et notre aperçu en temps réel
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <CVForm
              data={data}
              onDataChange={setData}
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
              onLoadExample={handleLoadExample}
              onExportPDF={handleExportPDF}
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-6 h-fit">
            <CVPreview
              data={data}
              selectedTemplate={selectedTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
