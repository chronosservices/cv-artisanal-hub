import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CVCustomization } from '@/types/cv';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CVCustomizerProps {
  customization: CVCustomization;
  onCustomizationChange: (customization: CVCustomization) => void;
  onClose: () => void;
}

export const CVCustomizer: React.FC<CVCustomizerProps> = ({
  customization,
  onCustomizationChange,
  onClose
}) => {
  const handleChange = (key: keyof CVCustomization, value: any) => {
    onCustomizationChange({
      ...customization,
      [key]: value
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Personnaliser votre CV</CardTitle>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">Couleurs</TabsTrigger>
            <TabsTrigger value="layout">Mise en page</TabsTrigger>
            <TabsTrigger value="typography">Typographie</TabsTrigger>
            <TabsTrigger value="spacing">Espacements</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameColor">Couleur du Nom</Label>
                <Input
                  id="nameColor"
                  type="color"
                  value={customization.nameColor}
                  onChange={(e) => handleChange('nameColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitleColor">Couleur du Poste recherché</Label>
                <Input
                  id="jobTitleColor"
                  type="color"
                  value={customization.jobTitleColor}
                  onChange={(e) => handleChange('jobTitleColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sectionTitleColor">Couleur des titres</Label>
                <Input
                  id="sectionTitleColor"
                  type="color"
                  value={customization.sectionTitleColor}
                  onChange={(e) => handleChange('sectionTitleColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyColor">Couleur des établissements</Label>
                <Input
                  id="companyColor"
                  type="color"
                  value={customization.companyColor}
                  onChange={(e) => handleChange('companyColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="levelBarColor">Couleur des barres de niveaux</Label>
                <Input
                  id="levelBarColor"
                  type="color"
                  value={customization.levelBarColor}
                  onChange={(e) => handleChange('levelBarColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leftColumnBgColor">Couleur du fond (colonne gauche)</Label>
                <Input
                  id="leftColumnBgColor"
                  type="color"
                  value={customization.leftColumnBgColor}
                  onChange={(e) => handleChange('leftColumnBgColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leftColumnTitleColor">Couleur des titres (colonne gauche)</Label>
                <Input
                  id="leftColumnTitleColor"
                  type="color"
                  value={customization.leftColumnTitleColor}
                  onChange={(e) => handleChange('leftColumnTitleColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leftColumnTextColor">Couleur des textes (colonne gauche)</Label>
                <Input
                  id="leftColumnTextColor"
                  type="color"
                  value={customization.leftColumnTextColor}
                  onChange={(e) => handleChange('leftColumnTextColor', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="photoRounded"
                  checked={customization.photoRounded}
                  onCheckedChange={(checked) => handleChange('photoRounded', checked)}
                />
                <Label htmlFor="photoRounded">Photo arrondie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="showTimeline"
                  checked={customization.showTimeline}
                  onCheckedChange={(checked) => handleChange('showTimeline', checked)}
                />
                <Label htmlFor="showTimeline">Afficher une timeline</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="lineBreakAfterLabels"
                  checked={customization.lineBreakAfterLabels}
                  onCheckedChange={(checked) => handleChange('lineBreakAfterLabels', checked)}
                />
                <Label htmlFor="lineBreakAfterLabels">Retourner à la ligne après les labels</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="nameUppercase"
                  checked={customization.nameUppercase}
                  onCheckedChange={(checked) => handleChange('nameUppercase', checked)}
                />
                <Label htmlFor="nameUppercase">Nom en majuscule</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="alignProfileJustify"
                  checked={customization.alignProfileJustify}
                  onCheckedChange={(checked) => handleChange('alignProfileJustify', checked)}
                />
                <Label htmlFor="alignProfileJustify">Justifier l'accroche</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="hideInfoIcons"
                  checked={customization.hideInfoIcons}
                  onCheckedChange={(checked) => handleChange('hideInfoIcons', checked)}
                />
                <Label htmlFor="hideInfoIcons">Cacher les icônes des informations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="reduceLicenseDisplay"
                  checked={customization.reduceLicenseDisplay}
                  onCheckedChange={(checked) => handleChange('reduceLicenseDisplay', checked)}
                />
                <Label htmlFor="reduceLicenseDisplay">Réduire l'affichage des permis</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="textFont">Police des textes</Label>
                <Select value={customization.textFont} onValueChange={(value) => handleChange('textFont', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OpenSans">OpenSans</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                    <SelectItem value="Times">Times</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textSize">Taille des textes</Label>
                <Select value={customization.textSize} onValueChange={(value) => handleChange('textSize', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12px">12px</SelectItem>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameSize">Taille du nom</Label>
                <Select value={customization.nameSize} onValueChange={(value) => handleChange('nameSize', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="28px">28px</SelectItem>
                    <SelectItem value="32px">32px</SelectItem>
                    <SelectItem value="36px">36px</SelectItem>
                    <SelectItem value="40px">40px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleFont">Police des titres</Label>
                <Select value={customization.titleFont} onValueChange={(value) => handleChange('titleFont', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VisbyCF">VisbyCF</SelectItem>
                    <SelectItem value="OpenSans">OpenSans</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleSize">Taille des titres</Label>
                <Select value={customization.titleSize} onValueChange={(value) => handleChange('titleSize', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                    <SelectItem value="22px">22px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spacing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blockMargins">Marges entre blocs</Label>
                <Select value={customization.blockMargins} onValueChange={(value) => handleChange('blockMargins', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10px">10px</SelectItem>
                    <SelectItem value="15px">15px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                    <SelectItem value="25px">25px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contentMargins">Marges entre contenus</Label>
                <Select value={customization.contentMargins} onValueChange={(value) => handleChange('contentMargins', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5px">5px</SelectItem>
                    <SelectItem value="10px">10px</SelectItem>
                    <SelectItem value="15px">15px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="verticalPadding">Marges intérieures verticales</Label>
                <Select value={customization.verticalPadding} onValueChange={(value) => handleChange('verticalPadding', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15px">15px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                    <SelectItem value="25px">25px</SelectItem>
                    <SelectItem value="30px">30px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="horizontalPadding">Marges intérieures horizontales</Label>
                <Select value={customization.horizontalPadding} onValueChange={(value) => handleChange('horizontalPadding', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15px">15px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                    <SelectItem value="25px">25px</SelectItem>
                    <SelectItem value="30px">30px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Format de la date</Label>
                <Select value={customization.dateFormat} onValueChange={(value) => handleChange('dateFormat', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Par défaut">Par défaut</SelectItem>
                    <SelectItem value="MM/YYYY">MM/YYYY</SelectItem>
                    <SelectItem value="YYYY">YYYY seulement</SelectItem>
                    <SelectItem value="Mois YYYY">Mois YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};