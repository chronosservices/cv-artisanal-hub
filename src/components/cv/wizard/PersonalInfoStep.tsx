import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { Camera, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PersonalInfoStepProps {
  data: CVData;
  onDataChange: (data: CVData) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onDataChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const updatePersonalInfo = (field: string, value: string) => {
    onDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "❌ Fichier trop volumineux",
          description: "La taille de l'image ne doit pas dépasser 5MB.",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "❌ Format non supporté",
          description: "Veuillez sélectionner une image (JPG, PNG, etc.).",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        updatePersonalInfo('photo', e.target?.result as string);
        toast({
          title: "✅ Photo ajoutée !",
          description: "Votre photo de profil a été ajoutée avec succès.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updatePersonalInfo('photo', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">Parlez-nous de vous</h3>
        <p className="text-muted-foreground">
          Commencez par renseigner vos informations personnelles de base
        </p>
      </div>

      {/* Photo Section */}
      <Card className="border-dashed border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {data.personalInfo.photo ? (
                <div className="relative">
                  <img
                    src={data.personalInfo.photo}
                    alt="Photo de profil"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 w-8 h-8 p-0 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-muted border-2 border-dashed border-primary/50 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary/50" />
                </div>
              )}
            </div>
            
            <div className="text-center space-y-2">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-primary/50 text-primary hover:bg-primary/5"
              >
                <Upload className="w-4 h-4 mr-2" />
                {data.personalInfo.photo ? 'Changer la photo' : 'Ajouter une photo'}
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG • Max 5MB • Recommandé 200x200px
              </p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-primary font-medium">Prénom *</Label>
          <Input
            id="firstName"
            value={data.personalInfo.firstName}
            onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
            placeholder="Ex. : Marie"
            className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-primary font-medium">Nom *</Label>
          <Input
            id="lastName"
            value={data.personalInfo.lastName}
            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
            placeholder="Ex. : Dupont"
            className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="jobTitle" className="text-primary font-medium">Titre/Poste souhaité</Label>
        <Input
          id="jobTitle"
          value={data.personalInfo.jobTitle}
          onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
          placeholder="Ex. : Chargé de communication digitale"
          className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
        />
        <p className="text-xs text-muted-foreground">
          💡 Tip: Utilisez un titre qui correspond au poste que vous visez
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-primary font-medium">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="hello@reallygreatsite.com"
            className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-primary font-medium">Téléphone</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            placeholder="+225-456-7890"
            className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-primary font-medium">Adresse</Label>
          <Input
            id="address"
            value={data.personalInfo.address}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
            placeholder="123 Anywhere St., City"
            className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age" className="text-primary font-medium">Âge</Label>
          <Input
            id="age"
            value={data.personalInfo.age}
            onChange={(e) => updatePersonalInfo('age', e.target.value)}
            placeholder="24"
            className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="license" className="text-primary font-medium">Permis de conduire</Label>
        <Input
          id="license"
          value={data.personalInfo.license}
          onChange={(e) => updatePersonalInfo('license', e.target.value)}
          placeholder="Permis B - Véhicule"
          className="transition-all duration-300 focus:shadow-md focus:border-primary/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile" className="text-primary font-medium">Profil professionnel</Label>
        <Textarea
          id="profile"
          value={data.personalInfo.profile}
          onChange={(e) => updatePersonalInfo('profile', e.target.value)}
          placeholder="Passionnée par la communication et le marketing digital, je possède une expérience en gestion de projets, création de contenu et stratégies de médias sociaux..."
          className="min-h-24 transition-all duration-300 focus:shadow-md focus:border-primary/50"
        />
        <p className="text-xs text-muted-foreground">
          Décrivez brièvement votre profil professionnel et vos objectifs de carrière
        </p>
      </div>
    </div>
  );
};