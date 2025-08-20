import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CVData, Experience } from '@/types/cv';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface ExperiencesStepProps {
  data: CVData;
  onDataChange: (data: CVData) => void;
}

export const ExperiencesStep: React.FC<ExperiencesStepProps> = ({ data, onDataChange }) => {
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addExperience = () => {
    const newExperience: Experience = {
      id: generateId(),
      title: '',
      company: '',
      period: '',
      description: ''
    };
    onDataChange({
      ...data,
      experiences: [...data.experiences, newExperience]
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onDataChange({
      ...data,
      experiences: data.experiences.map(e => 
        e.id === id ? { ...e, [field]: value } : e
      )
    });
  };

  const removeExperience = (id: string) => {
    onDataChange({
      ...data,
      experiences: data.experiences.filter(e => e.id !== id)
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2 flex items-center justify-center gap-2">
          <Briefcase className="w-5 h-5" />
          Vos expériences professionnelles
        </h3>
        <p className="text-muted-foreground">
          Décrivez vos postes occupés et réalisations professionnelles
        </p>
      </div>

      <div className="space-y-4">
        {data.experiences.map((experience, index) => (
          <Card key={experience.id} className="border-l-4 border-secondary bg-secondary/5 animate-scale-in">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-secondary">Expérience #{index + 1}</span>
                {data.experiences.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExperience(experience.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-secondary font-medium">Poste *</Label>
                  <Input
                    value={experience.title}
                    onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                    placeholder="Chargée de communication"
                    className="transition-all duration-300 focus:shadow-md focus:border-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-secondary font-medium">Période</Label>
                  <Input
                    value={experience.period}
                    onChange={(e) => updateExperience(experience.id, 'period', e.target.value)}
                    placeholder="2021 - 2023"
                    className="transition-all duration-300 focus:shadow-md focus:border-secondary/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-secondary font-medium">Entreprise</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Nom de l'entreprise - Ville"
                  className="transition-all duration-300 focus:shadow-md focus:border-secondary/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-secondary font-medium">Description</Label>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  placeholder="• Gestion des campagnes publicitaires sur les réseaux sociaux&#10;• Création de contenu visuel et rédactionnel engageant&#10;• Analyse des données de performance et ajustement des stratégies"
                  className="min-h-20 transition-all duration-300 focus:shadow-md focus:border-secondary/50"
                />
                <p className="text-xs text-muted-foreground">
                  Utilisez des puces (•) pour lister vos réalisations et responsabilités
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button 
        onClick={addExperience} 
        variant="outline" 
        className="w-full border-dashed border-secondary/50 text-secondary hover:bg-secondary/5 hover-scale"
      >
        <Plus className="w-4 h-4 mr-2" />
        Ajouter une expérience
      </Button>

      {data.experiences.length === 0 && (
        <div className="text-center p-8 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            Aucune expérience ajoutée. Cliquez sur "Ajouter une expérience" pour commencer.
          </p>
        </div>
      )}
    </div>
  );
};