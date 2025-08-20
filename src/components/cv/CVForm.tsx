import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, User, GraduationCap, Briefcase, Globe, Award, Users, Star, Heart } from 'lucide-react';
import { CVData, Formation, Experience, Language, Certification, Reference, TemplateType } from '@/types/cv';

interface CVFormProps {
  data: CVData;
  onDataChange: (data: CVData) => void;
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  onLoadExample: () => void;
  onExportPDF: () => void;
}

const languageLevels = [
  'Débutant',
  'Intermédiaire', 
  'Courant',
  'Niveau scolaire',
  'Bilingue',
  'Natif'
];

export const CVForm: React.FC<CVFormProps> = ({ 
  data, 
  onDataChange, 
  selectedTemplate, 
  onTemplateChange, 
  onLoadExample, 
  onExportPDF 
}) => {
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const updatePersonalInfo = (field: string, value: string) => {
    onDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

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

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Star className="w-5 h-5" />
            Choisissez votre modèle
          </CardTitle>
          <CardDescription>Sélectionnez le design qui vous représente le mieux</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                selectedTemplate === 1 
                  ? 'border-primary bg-primary/5 shadow-lg' 
                  : 'border-border hover:border-primary/50 hover:shadow-md'
              }`}
              onClick={() => onTemplateChange(1)}
            >
              <h3 className="font-semibold text-primary mb-2">🌿 Modèle Vert</h3>
              <p className="text-sm text-muted-foreground">Style clair avec accents verts professionnels</p>
            </div>
            <div 
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                selectedTemplate === 2 
                  ? 'border-primary bg-primary/5 shadow-lg' 
                  : 'border-border hover:border-primary/50 hover:shadow-md'
              }`}
              onClick={() => onTemplateChange(2)}
            >
              <h3 className="font-semibold text-primary mb-2">🌊 Modèle Bleu</h3>
              <p className="text-sm text-muted-foreground">Style moderne avec sidebar bleu foncé</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <User className="w-5 h-5" />
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={data.personalInfo.firstName}
                onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                placeholder="Sacha"
                className="transition-all duration-300 focus:shadow-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={data.personalInfo.lastName}
                onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                placeholder="Diarra"
                className="transition-all duration-300 focus:shadow-md"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Titre/Poste souhaité</Label>
            <Input
              id="jobTitle"
              value={data.personalInfo.jobTitle}
              onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
              placeholder="Chargée de communication"
              className="transition-all duration-300 focus:shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="hello@reallygreatsite.com"
                className="transition-all duration-300 focus:shadow-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+225-456-7890"
                className="transition-all duration-300 focus:shadow-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={data.personalInfo.address}
                onChange={(e) => updatePersonalInfo('address', e.target.value)}
                placeholder="123 Anywhere St., City"
                className="transition-all duration-300 focus:shadow-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                value={data.personalInfo.age}
                onChange={(e) => updatePersonalInfo('age', e.target.value)}
                placeholder="24"
                className="transition-all duration-300 focus:shadow-md"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="license">Permis de conduire</Label>
            <Input
              id="license"
              value={data.personalInfo.license}
              onChange={(e) => updatePersonalInfo('license', e.target.value)}
              placeholder="Permis B - Véhicule"
              className="transition-all duration-300 focus:shadow-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Photo de profil (URL)</Label>
            <Input
              id="photo"
              type="url"
              value={data.personalInfo.photo}
              onChange={(e) => updatePersonalInfo('photo', e.target.value)}
              placeholder="https://exemple.com/photo.jpg"
              className="transition-all duration-300 focus:shadow-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile">Profil professionnel</Label>
            <Textarea
              id="profile"
              value={data.personalInfo.profile}
              onChange={(e) => updatePersonalInfo('profile', e.target.value)}
              placeholder="Passionnée par la communication et le marketing digital..."
              className="min-h-20 transition-all duration-300 focus:shadow-md"
            />
          </div>
        </CardContent>
      </Card>

      {/* Formations */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <GraduationCap className="w-5 h-5" />
            Formations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.formations.map((formation, index) => (
            <div key={formation.id} className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary space-y-4">
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
                  <Label>Diplôme/Formation</Label>
                  <Input
                    value={formation.title}
                    onChange={(e) => updateFormation(formation.id, 'title', e.target.value)}
                    placeholder="Master Communication"
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Période</Label>
                  <Input
                    value={formation.period}
                    onChange={(e) => updateFormation(formation.id, 'period', e.target.value)}
                    placeholder="2021 - 2023"
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formation.description}
                  onChange={(e) => updateFormation(formation.id, 'description', e.target.value)}
                  placeholder="Spécialisation en communication digitale..."
                  className="transition-all duration-300 focus:shadow-md"
                />
              </div>
            </div>
          ))}
          
          <Button 
            onClick={addFormation} 
            variant="outline" 
            className="w-full border-dashed border-primary/50 text-primary hover:bg-primary/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une formation
          </Button>
        </CardContent>
      </Card>

      {/* Experiences */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Briefcase className="w-5 h-5" />
            Expériences professionnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experiences.map((experience, index) => (
            <div key={experience.id} className="p-4 bg-muted/50 rounded-lg border-l-4 border-secondary space-y-4">
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
                  <Label>Poste</Label>
                  <Input
                    value={experience.title}
                    onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                    placeholder="Chargée de communication"
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Période</Label>
                  <Input
                    value={experience.period}
                    onChange={(e) => updateExperience(experience.id, 'period', e.target.value)}
                    placeholder="2021 - 2023"
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Entreprise</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Nom de l'entreprise - Ville"
                  className="transition-all duration-300 focus:shadow-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  placeholder="• Gestion des campagnes publicitaires..."
                  className="transition-all duration-300 focus:shadow-md"
                />
              </div>
            </div>
          ))}
          
          <Button 
            onClick={addExperience} 
            variant="outline" 
            className="w-full border-dashed border-secondary/50 text-secondary hover:bg-secondary/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une expérience
          </Button>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Globe className="w-5 h-5" />
            Langues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.languages.map((language, index) => (
            <div key={language.id} className="p-4 bg-muted/50 rounded-lg border-l-4 border-accent space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-accent">Langue #{index + 1}</span>
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
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Niveau</Label>
                  <Select value={language.level} onValueChange={(value) => updateLanguage(language.id, 'level', value)}>
                    <SelectTrigger className="transition-all duration-300 focus:shadow-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
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
            className="w-full border-dashed border-accent/50 text-accent hover:bg-accent/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une langue
          </Button>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Star className="w-5 h-5" />
            Compétences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="softSkills">Soft Skills</Label>
            <Textarea
              id="softSkills"
              value={data.skills.softSkills.join(', ')}
              onChange={(e) => updateSkills('softSkills', e.target.value)}
              placeholder="Esprit d'équipe, Rigoureuse, Organisée (séparées par des virgules)"
              className="transition-all duration-300 focus:shadow-md"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hardSkills">Hard Skills</Label>
            <Textarea
              id="hardSkills"
              value={data.skills.hardSkills.join(', ')}
              onChange={(e) => updateSkills('hardSkills', e.target.value)}
              placeholder="Compétence 1, Compétence 2, Compétence 3 (séparées par des virgules)"
              className="transition-all duration-300 focus:shadow-md"
            />
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Award className="w-5 h-5" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.certifications.map((certification, index) => (
            <div key={certification.id} className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">Certification #{index + 1}</span>
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
              
              <div className="space-y-2">
                <Label>Certification</Label>
                <Input
                  value={certification.name}
                  onChange={(e) => updateCertification(certification.id, e.target.value)}
                  placeholder="NC II - Cookery"
                  className="transition-all duration-300 focus:shadow-md"
                />
              </div>
            </div>
          ))}
          
          <Button 
            onClick={addCertification} 
            variant="outline" 
            className="w-full border-dashed border-primary/50 text-primary hover:bg-primary/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une certification
          </Button>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Heart className="w-5 h-5" />
            Centres d'intérêt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="interests">Centres d'intérêt</Label>
            <Textarea
              id="interests"
              value={data.interests.join(', ')}
              onChange={(e) => updateInterests(e.target.value)}
              placeholder="🎵 Musique, ✈️ Voyage, ⚽ Sport, 🧵 Couture"
              className="transition-all duration-300 focus:shadow-md"
            />
          </div>
        </CardContent>
      </Card>

      {/* References */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Users className="w-5 h-5" />
            Références
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.references.map((reference, index) => (
            <div key={reference.id} className="p-4 bg-muted/50 rounded-lg border-l-4 border-secondary space-y-4">
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
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fonction</Label>
                  <Input
                    value={reference.title}
                    onChange={(e) => updateReference(reference.id, 'title', e.target.value)}
                    placeholder="Tesda Trainer"
                    className="transition-all duration-300 focus:shadow-md"
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={onLoadExample} 
          variant="outline"
          size="lg"
          className="shadow-md hover:shadow-lg transition-all duration-300"
        >
          📄 Charger un exemple
        </Button>
        <Button 
          onClick={onExportPDF} 
          variant="elegant"
          size="lg"
          className="shadow-lg hover:shadow-xl"
        >
          📥 Télécharger PDF
        </Button>
      </div>
    </div>
  );
};