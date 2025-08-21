import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CVData } from '@/types/cv';
import { Download, CheckCircle, Users, Mail, Phone, MapPin } from 'lucide-react';

interface FinalStepProps {
  data: CVData;
  onDataChange: (data: CVData) => void;
  onExportPDF: () => void;
}

export const FinalStep: React.FC<FinalStepProps> = ({ data, onExportPDF }) => {
  const completionStats = {
    personalInfo: data.personalInfo.firstName && data.personalInfo.lastName && data.personalInfo.email,
    formations: data.formations.length > 0 && data.formations.some(f => f.title),
    experiences: data.experiences.length > 0 && data.experiences.some(e => e.title),
    skills: data.skills.softSkills.length > 0 || data.skills.hardSkills.length > 0,
    languages: data.languages.length > 0 && data.languages.some(l => l.name),
  };

  const completedSections = Object.values(completionStats).filter(Boolean).length;
  const totalSections = Object.keys(completionStats).length;
  const completionPercentage = Math.round((completedSections / totalSections) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2">Félicitations !</h3>
        <p className="text-lg text-muted-foreground">
          Votre CV est prêt à être téléchargé
        </p>
      </div>

      {/* Completion Summary */}
      <Card className="border-primary bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <CheckCircle className="w-5 h-5" />
            Résumé de completion ({completionPercentage}%)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className={`flex items-center gap-2 p-3 rounded-lg ${completionStats.personalInfo ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Informations personnelles</span>
            </div>
            <div className={`flex items-center gap-2 p-3 rounded-lg ${completionStats.formations ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Formations</span>
            </div>
            <div className={`flex items-center gap-2 p-3 rounded-lg ${completionStats.experiences ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Expériences</span>
            </div>
            <div className={`flex items-center gap-2 p-3 rounded-lg ${completionStats.skills ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Compétences</span>
            </div>
            <div className={`flex items-center gap-2 p-3 rounded-lg ${completionStats.languages ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Langues</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Preview */}
      <Card className="border-secondary bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-secondary">Aperçu rapide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h4 className="text-xl font-bold text-foreground">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h4>
            {data.personalInfo.jobTitle && (
              <p className="text-lg text-muted-foreground">{data.personalInfo.jobTitle}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{data.personalInfo.address}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-background rounded-lg">
              <div className="text-2xl font-bold text-primary">{data.formations.length}</div>
              <div className="text-sm text-muted-foreground">Formation(s)</div>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <div className="text-2xl font-bold text-secondary">{data.experiences.length}</div>
              <div className="text-sm text-muted-foreground">Expérience(s)</div>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <div className="text-2xl font-bold text-accent">{data.languages.length}</div>
              <div className="text-sm text-muted-foreground">Langue(s)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Section */}
      <Card className="border-primary bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <CardContent className="p-8 text-center space-y-4">
          <h4 className="text-xl font-bold">Votre CV est prêt !</h4>
          <p className="opacity-90">
            Téléchargez votre CV au format PDF et commencez à postuler
          </p>
          <Button
            onClick={onExportPDF}
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 shadow-lg hover-scale"
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger mon CV en PDF
          </Button>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-muted bg-muted/20">
        <CardHeader>
          <CardTitle className="text-muted-foreground">Conseils</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Relisez attentivement votre CV avant de l'envoyer</p>
          <p>• Adaptez votre CV selon le poste visé</p>
          <p>• Gardez une copie de ce CV pour vos futures candidatures</p>
          <p>• N'hésitez pas à revenir modifier votre CV si nécessaire</p>
        </CardContent>
      </Card>
    </div>
  );
};