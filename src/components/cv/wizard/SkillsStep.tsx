import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CVData, Language, Certification, Reference } from '@/types/cv';
import { Plus, Trash2, Globe, Award, Users, Star } from 'lucide-react';

interface SkillsStepProps {
  data: CVData;
  onDataChange: (data: CVData) => void;
}

const languageLevels = [
  'Débutant',
  'Intermédiaire', 
  'Courant',
  'Niveau scolaire',
  'Bilingue',
  'Natif'
];

export const SkillsStep: React.FC<SkillsStepProps> = ({ data, onDataChange }) => {
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const updateSkills = (type: 'softSkills' | 'hardSkills', value: string) => {
    onDataChange({
      ...data,
      skills: {
        ...data.skills,
        [type]: value.split(',').map(s => s.trim()).filter(s => s)
      }
    });
  };

  const updateInterests = (value: string) => {
    onDataChange({
      ...data,
      interests: value.split(',').map(s => s.trim()).filter(s => s)
    });
  };

  // Languages
  const addLanguage = () => {
    const newLanguage: Language = {
      id: generateId(),
      name: '',
      level: 'Courant'
    };
    onDataChange({
      ...data,
      languages: [...data.languages, newLanguage]
    });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onDataChange({
      ...data,
      languages: data.languages.map(l => 
        l.id === id ? { ...l, [field]: value } : l
      )
    });
  };

  const removeLanguage = (id: string) => {
    onDataChange({
      ...data,
      languages: data.languages.filter(l => l.id !== id)
    });
  };

  // Certifications
  const addCertification = () => {
    const newCertification: Certification = {
      id: generateId(),
      name: ''
    };
    onDataChange({
      ...data,
      certifications: [...data.certifications, newCertification]
    });
  };

  const updateCertification = (id: string, value: string) => {
    onDataChange({
      ...data,
      certifications: data.certifications.map(c => 
        c.id === id ? { ...c, name: value } : c
      )
    });
  };

  const removeCertification = (id: string) => {
    onDataChange({
      ...data,
      certifications: data.certifications.filter(c => c.id !== id)
    });
  };

  // References
  const addReference = () => {
    const newReference: Reference = {
      id: generateId(),
      name: '',
      title: ''
    };
    onDataChange({
      ...data,
      references: [...data.references, newReference]
    });
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    onDataChange({
      ...data,
      references: data.references.map(r => 
        r.id === id ? { ...r, [field]: value } : r
      )
    });
  };

  const removeReference = (id: string) => {
    onDataChange({
      ...data,
      references: data.references.filter(r => r.id !== id)
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2 flex items-center justify-center gap-2">
          <Star className="w-5 h-5" />
          Compétences et informations complémentaires
        </h3>
        <p className="text-muted-foreground">
          Mettez en valeur vos compétences, langues et références
        </p>
      </div>

      {/* Skills Section */}
      <Card className="border-l-4 border-primary bg-primary/5">
        <CardHeader>
          <CardTitle className="text-primary">⚡ Compétences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-primary font-medium">Soft Skills</Label>
            <Textarea
              value={data.skills.softSkills.join(', ')}
              onChange={(e) => updateSkills('softSkills', e.target.value)}
              placeholder="Esprit d'équipe, Rigoureuse, Organisée (séparées par des virgules)"
              className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-primary font-medium">Hard Skills</Label>
            <Textarea
              value={data.skills.hardSkills.join(', ')}
              onChange={(e) => updateSkills('hardSkills', e.target.value)}
              placeholder="Marketing Digital, Réseaux Sociaux, Google Analytics (séparées par des virgules)"
              className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Languages Section */}
      <Card className="border-l-4 border-secondary bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-secondary flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Langues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.languages.map((language, index) => (
            <div key={language.id} className="p-4 bg-background rounded-lg border space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-secondary">Langue #{index + 1}</span>
                {data.languages.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLanguage(language.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Langue</Label>
                  <Input
                    value={language.name}
                    onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                    placeholder="Français"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Niveau</Label>
                  <Select
                    value={language.level}
                    onValueChange={(value) => updateLanguage(language.id, 'level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            onClick={addLanguage} 
            variant="outline" 
            className="w-full border-dashed border-secondary/50 text-secondary hover:bg-secondary/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une langue
          </Button>
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card className="border-l-4 border-accent bg-accent/5">
        <CardHeader>
          <CardTitle className="text-accent flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.certifications.map((certification, index) => (
            <div key={certification.id} className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  value={certification.name}
                  onChange={(e) => updateCertification(certification.id, e.target.value)}
                  placeholder="Google Analytics Certified"
                />
              </div>
              {data.certifications.length > 1 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCertification(certification.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          
          <Button 
            onClick={addCertification} 
            variant="outline" 
            className="w-full border-dashed border-accent/50 text-accent hover:bg-accent/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une certification
          </Button>
        </CardContent>
      </Card>

      {/* Interests Section */}
      <Card className="border-l-4 border-primary bg-primary/5">
        <CardHeader>
          <CardTitle className="text-primary">🎯 Centres d'intérêt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-primary font-medium">Centres d'intérêt</Label>
            <Textarea
              value={data.interests.join(', ')}
              onChange={(e) => updateInterests(e.target.value)}
              placeholder="🎵 Musique, ✈️ Voyage, ⚽ Sport, 🧵 Couture"
              className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
            />
            <p className="text-xs text-muted-foreground">
              Séparez vos centres d'intérêt par des virgules. N'hésitez pas à utiliser des emojis !
            </p>
          </div>
        </CardContent>
      </Card>

      {/* References Section */}
      <Card className="border-l-4 border-secondary bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-secondary flex items-center gap-2">
            <Users className="w-5 h-5" />
            Références professionnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.references.map((reference, index) => (
            <div key={reference.id} className="p-4 bg-background rounded-lg border space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-secondary">Référence #{index + 1}</span>
                {data.references.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeReference(reference.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input
                    value={reference.name}
                    onChange={(e) => updateReference(reference.id, 'name', e.target.value)}
                    placeholder="Shella Bawar"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fonction</Label>
                  <Input
                    value={reference.title}
                    onChange={(e) => updateReference(reference.id, 'title', e.target.value)}
                    placeholder="Tesda Trainer"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            onClick={addReference} 
            variant="outline" 
            className="w-full border-dashed border-secondary/50 text-secondary hover:bg-secondary/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une référence
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};