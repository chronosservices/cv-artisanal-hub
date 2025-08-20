import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CVTemplate1 } from './CVTemplate1';
import { CVTemplate2 } from './CVTemplate2';
import { useCVData } from '@/hooks/useCVData';
import { ArrowRight, Sparkles, Eye } from 'lucide-react';

interface TemplateSelectorProps {
  onTemplateSelect: (template: number) => void;
  onLoadExample: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  onTemplateSelect, 
  onLoadExample 
}) => {
  const { data } = useCVData();

  const exampleData = {
    personalInfo: {
      firstName: 'Sacha',
      lastName: 'Diarra',
      jobTitle: 'Chargée de communication',
      email: 'hello@reallygreatsite.com',
      phone: '+225-456-7890',
      address: '123 Anywhere St., City',
      age: '24',
      license: 'Permis B - Véhicule',
      photo: '',
      profile: 'Passionnée par la communication et le marketing digital, je possède une expérience en gestion de projets, création de contenu et stratégies de médias sociaux.'
    },
    formations: [
      {
        id: '1',
        title: 'Master Communication',
        period: '2021 - 2023',
        description: 'Spécialisation en communication digitale et médias sociaux.'
      }
    ],
    experiences: [
      {
        id: '1',
        title: 'Chargée de communication',
        company: 'Nom de l\'entreprise - Any City',
        period: '2021 - 2023',
        description: '• Gestion et optimisation des campagnes publicitaires\n• Création de contenu visuel et rédactionnel'
      }
    ],
    languages: [
      { id: '1', name: 'Français', level: 'Natif' },
      { id: '2', name: 'Anglais', level: 'Courant' }
    ],
    skills: {
      softSkills: ['Esprit d\'équipe', 'Rigoureuse', 'Organisée'],
      hardSkills: ['Marketing Digital', 'Réseaux Sociaux', 'Google Analytics']
    },
    certifications: [
      { id: '1', name: 'Google Analytics Certified' }
    ],
    references: [
      { id: '1', name: 'Shella Bawar', title: 'Tesda Trainer' }
    ],
    interests: ['🎵 Musique', '✈️ Voyage', '⚽ Sport']
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-muted/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <Eye className="w-6 h-6" />
            Choisissez votre modèle de CV
          </CardTitle>
          <CardDescription className="text-lg">
            Découvrez nos modèles professionnels et sélectionnez celui qui correspond le mieux à votre profil
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={onLoadExample}
            variant="outline"
            className="border-dashed border-secondary/50 text-secondary hover:bg-secondary/5"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Charger un exemple de CV
          </Button>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Template 1 */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-muted/20 hover:shadow-2xl transition-all duration-500 hover-scale animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary text-center">
              🌿 Modèle Vert Professionnel
            </CardTitle>
            <CardDescription className="text-center">
              Style clair et moderne avec accents verts, parfait pour les profils créatifs et communication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
              <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '400px' }}>
                <CVTemplate1 data={data.personalInfo.firstName ? data : exampleData} />
              </div>
            </div>
            <Button 
              onClick={() => onTemplateSelect(1)}
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
            >
              Utiliser ce modèle
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Template 2 */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-muted/20 hover:shadow-2xl transition-all duration-500 hover-scale animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary text-center">
              🌊 Modèle Bleu Corporate
            </CardTitle>
            <CardDescription className="text-center">
              Design moderne avec sidebar bleu foncé, idéal pour les profils business et techniques
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
              <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '400px' }}>
                <CVTemplate2 data={data.personalInfo.firstName ? data : exampleData} />
              </div>
            </div>
            <Button 
              onClick={() => onTemplateSelect(2)}
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
            >
              Utiliser ce modèle
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};