import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CVTemplate1 } from './CVTemplate1';
import { CVTemplate2 } from './CVTemplate2';
import { CVTemplate3 } from './CVTemplate3';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { CVData } from '@/types/cv';

interface TemplateSelectorProps {
  onTemplateSelect: (template: number) => void;
  onLoadExample: () => void;
  currentTemplate?: number;
}

const previewData: CVData = {
  personalInfo: {
    firstName: 'Marie', lastName: 'Dupont',
    jobTitle: 'Chargée de communication digitale',
    email: 'marie.dupont@email.com', phone: '+33 6 12 34 56 78',
    address: 'Paris, France', age: '28',
    license: 'Permis B', photo: '',
    profile: 'Passionnée par la communication et le marketing digital, j\'accompagne les marques dans le développement de leur présence en ligne.'
  },
  formations: [
    { id: '1', title: 'Master Communication', period: '2019 - 2021', description: 'CELSA — Sorbonne' }
  ],
  experiences: [
    { id: '1', title: 'Chargée de communication', company: 'Agence Novéa', period: '2022 - présent',
      description: 'Pilotage de la stratégie éditoriale multi-canal' }
  ],
  languages: [
    { id: '1', name: 'Français', level: 'Natif' },
    { id: '2', name: 'Anglais', level: 'Courant' }
  ],
  skills: {
    softSkills: ['Leadership', 'Créativité'],
    hardSkills: ['Adobe Creative Suite', 'Google Analytics']
  },
  certifications: [{ id: '1', name: 'Google Analytics 4' }],
  references: [{ id: '1', name: 'Julien Martin', title: 'Directeur' }],
  interests: ['Photographie', 'Voyage']
};

const templates = [
  {
    id: 1,
    name: 'Classique Vert',
    description: 'Sidebar claire, accent vert profond. Parfait pour les métiers créatifs et de la communication.',
    accent: '#094102',
  },
  {
    id: 2,
    name: 'Corporate Bleu',
    description: 'Sidebar sombre premium, contraste élevé. Idéal pour les profils business et techniques.',
    accent: '#0a2342',
  },
  {
    id: 3,
    name: 'Moderne Minimal',
    description: 'Éditorial une colonne, typographie soignée, barres de compétences. Look startup.',
    accent: '#FF5700',
  },
];

const TemplateCard: React.FC<{
  id: number; name: string; description: string; accent: string;
  isSelected: boolean; onSelect: () => void;
}> = ({ id, name, description, accent, isSelected, onSelect }) => (
  <Card
    onClick={onSelect}
    className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
      isSelected ? 'ring-2 ring-primary shadow-2xl' : 'ring-1 ring-border'
    }`}
  >
    {isSelected && (
      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
        <Check className="w-4 h-4" />
      </div>
    )}
    <div className="relative aspect-[210/297] overflow-hidden bg-gray-50">
      <div
        style={{
          width: '794px',
          transform: 'scale(0.35)',
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0, left: 0,
        }}
      >
        {id === 1 && <CVTemplate1 data={previewData} />}
        {id === 2 && <CVTemplate2 data={previewData} />}
        {id === 3 && <CVTemplate3 data={previewData} />}
      </div>
    </div>
    <CardContent className="p-4 space-y-2 border-t bg-card">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full shrink-0" style={{ background: accent }} />
        <h3 className="text-base font-bold text-foreground">{name}</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      <Button
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        size="sm"
        className="w-full mt-2 bg-gradient-to-r from-primary to-primary-glow"
      >
        Utiliser ce modèle
        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
      </Button>
    </CardContent>
  </Card>
);

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onTemplateSelect, onLoadExample, currentTemplate,
}) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto px-2">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
          Choisissez votre modèle
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          3 modèles professionnels au format A4. Personnalisables, imprimables, prêts à envoyer.
        </p>
        <Button
          onClick={onLoadExample}
          variant="outline"
          size="sm"
          className="border-dashed border-secondary/50 text-secondary hover:bg-secondary/10"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Charger un exemple
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {templates.map((t) => (
          <TemplateCard
            key={t.id}
            id={t.id} name={t.name} description={t.description} accent={t.accent}
            isSelected={currentTemplate === t.id}
            onSelect={() => onTemplateSelect(t.id)}
          />
        ))}
      </div>
    </div>
  );
};
