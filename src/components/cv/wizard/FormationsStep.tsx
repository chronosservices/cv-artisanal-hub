import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CVData, Formation } from '@/types/cv';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface FormationsStepProps {
  data: CVData;
  onDataChange: (data: CVData) => void;
}

export const FormationsStep: React.FC<FormationsStepProps> = ({ data, onDataChange }) => {
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addFormation = () => {
    const newFormation: Formation = {
      id: generateId(),
      title: '',
      period: '',
      description: ''
    };
    onDataChange({
      ...data,
      formations: [...data.formations, newFormation]
    });
  };

  const updateFormation = (id: string, field: keyof Formation, value: string) => {
    onDataChange({
      ...data,
      formations: data.formations.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      )
    });
  };

  const removeFormation = (id: string) => {
    onDataChange({
      ...data,
      formations: data.formations.filter(f => f.id !== id)
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2 flex items-center justify-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Vos formations académiques
        </h3>
        <p className="text-muted-foreground">
          Ajoutez vos diplômes, certifications et formations suivies
        </p>
      </div>

      <div className="space-y-4">
        {data.formations.map((formation, index) => (
          <Card key={formation.id} className="border-l-4 border-primary bg-primary/5 animate-scale-in">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">Formation #{index + 1}</span>
                {data.formations.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFormation(formation.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary font-medium">Diplôme/Formation *</Label>
                  <Input
                    value={formation.title}
                    onChange={(e) => updateFormation(formation.id, 'title', e.target.value)}
                    placeholder="Master Communication"
                    className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-primary font-medium">Période</Label>
                  <Input
                    value={formation.period}
                    onChange={(e) => updateFormation(formation.id, 'period', e.target.value)}
                    placeholder="2021 - 2023"
                    className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-primary font-medium">Description</Label>
                <Textarea
                  value={formation.description}
                  onChange={(e) => updateFormation(formation.id, 'description', e.target.value)}
                  placeholder="Spécialisation en communication digitale et médias sociaux..."
                  className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button 
        onClick={addFormation} 
        variant="outline" 
        className="w-full border-dashed border-primary/50 text-primary hover:bg-primary/5 hover-scale"
      >
        <Plus className="w-4 h-4 mr-2" />
        Ajouter une formation
      </Button>

      {data.formations.length === 0 && (
        <div className="text-center p-8 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20">
          <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            Aucune formation ajoutée. Cliquez sur "Ajouter une formation" pour commencer.
          </p>
        </div>
      )}
    </div>
  );
};