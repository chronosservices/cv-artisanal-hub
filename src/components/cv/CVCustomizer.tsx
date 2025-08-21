import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CVCustomization } from '@/types/cv';
import { X, Palette, RotateCcw } from 'lucide-react';

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

  const resetToDefault = () => {
    const defaultCustomization: CVCustomization = {
      nameColor: '#094102',
      jobTitleColor: '#666666',
      sectionTitleColor: '#094102',
      companyColor: '#333333',
      levelBarColor: '#094102',
      leftColumnBgColor: '#eaf5ed',
      leftColumnTitleColor: '#094102',
      leftColumnLabelColor: '#333333',
      leftColumnTextColor: '#333333',
      photoRounded: true,
      showTimeline: false,
      lineBreakAfterLabels: true,
      nameUppercase: false,
      alignProfileJustify: true,
      hideInfoIcons: false,
      reduceLicenseDisplay: false,
      textFont: 'OpenSans',
      textSize: '14px',
      nameSize: '32px',
      titleFont: 'VisbyCF',
      titleSize: '18px',
      blockMargins: '20px',
      contentMargins: '10px',
      verticalPadding: '20px',
      horizontalPadding: '20px',
      dateFormat: 'Par défaut'
    };
    onCustomizationChange(defaultCustomization);
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-card via-card to-muted/20">
      <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Palette className="w-6 h-6" />
            Personnalisation avancée
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={resetToDefault}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="colors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="colors" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Couleurs</TabsTrigger>
            <TabsTrigger value="layout" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Mise en page</TabsTrigger>
            <TabsTrigger value="typography" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Typographie</TabsTrigger>
            <TabsTrigger value="spacing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Espacements</TabsTrigger>
          </TabsList>

          <TabsContent value="colors">
            <div className="space-y-6">
              {/* Couleurs principales */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-primary-glow"></div>
                  Couleurs principales
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nameColor">Couleur du nom</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="nameColor"
                        type="color"
                        value={customization.nameColor}
                        onChange={(e) => handleChange('nameColor', e.target.value)}
                        className="h-10 w-16"
                      />
                      <Input
                        type="text"
                        value={customization.nameColor}
                        onChange={(e) => handleChange('nameColor', e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#094102"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitleColor">Couleur du poste recherché</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="jobTitleColor"
                        type="color"
                        value={customization.jobTitleColor}
                        onChange={(e) => handleChange('jobTitleColor', e.target.value)}
                        className="h-10 w-16"
                      />
                      <Input
                        type="text"
                        value={customization.jobTitleColor}
                        onChange={(e) => handleChange('jobTitleColor', e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#666666"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Couleurs sections */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-secondary flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-secondary to-accent"></div>
                  Couleurs des sections
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sectionTitleColor">Couleur des titres</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="sectionTitleColor"
                        type="color"
                        value={customization.sectionTitleColor}
                        onChange={(e) => handleChange('sectionTitleColor', e.target.value)}
                        className="h-10 w-16"
                      />
                      <Input
                        type="text"
                        value={customization.sectionTitleColor}
                        onChange={(e) => handleChange('sectionTitleColor', e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#094102"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyColor">Couleur des établissements</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="companyColor"
                        type="color"
                        value={customization.companyColor}
                        onChange={(e) => handleChange('companyColor', e.target.value)}
                        className="h-10 w-16"
                      />
                      <Input
                        type="text"
                        value={customization.companyColor}
                        onChange={(e) => handleChange('companyColor', e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#333333"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="levelBarColor">Couleur des barres de niveau</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="levelBarColor"
                        type="color"
                        value={customization.levelBarColor}
                        onChange={(e) => handleChange('levelBarColor', e.target.value)}
                        className="h-10 w-16"
                      />
                      <Input
                        type="text"
                        value={customization.levelBarColor}
                        onChange={(e) => handleChange('levelBarColor', e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#094102"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Couleurs colonne gauche */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-accent flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent"></div>
                  Colonne de gauche
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leftColumnBgColor">Couleur du fond</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="leftColumnBgColor"
                        type="color"
                        value={customization.leftColumnBgColor}
                        onChange={(e) => handleChange('leftColumnBgColor', e.target.value)}
                        className="h-10 w-16"
                      />
                      <Input
                        type="text"
                        value={customization.leftColumnBgColor}
                        onChange={(e) => handleChange('leftColumnBgColor', e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#eaf5ed"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leftColumnTitleColor">Couleur des titres</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="leftColumnTitleColor"
                        type="color"
                        value={customization.leftColumnTitleColor}
                        onChange={(e) => handleChange('leftColumnTitleColor', e.target.value)}
                        className="h-10 w-16"
                      />
                      <Input
                        type="text"
                        value={customization.leftColumnTitleColor}
                        onChange={(e) => handleChange('leftColumnTitleColor', e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#094102"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leftColumnLabelColor">Couleur des labels</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="leftColumnLabelColor"
                        type="color"
                        value={customization.leftColumnLabelColor}
                        onChange={(e) => handleChange('leftColumnLabelColor', e.target.value)}
                        className="h-10 w-16"
                      />
                      <Input
                        type="text"
                        value={customization.leftColumnLabelColor}
                        onChange={(e) => handleChange('leftColumnLabelColor', e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#333333"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leftColumnTextColor">Couleur des textes</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="leftColumnTextColor"
                        type="color"
                        value={customization.leftColumnTextColor}
                        onChange={(e) => handleChange('leftColumnTextColor', e.target.value)}
                        className="h-10 w-16"
                      />
                      <Input
                        type="text"
                        value={customization.leftColumnTextColor}
                        onChange={(e) => handleChange('leftColumnTextColor', e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#333333"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-primary">Options d'affichage</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="photoRounded">Photo arrondie</Label>
                    <Switch
                      id="photoRounded"
                      checked={customization.photoRounded}
                      onCheckedChange={(value) => handleChange('photoRounded', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="showTimeline">Afficher timeline</Label>
                    <Switch
                      id="showTimeline"
                      checked={customization.showTimeline}
                      onCheckedChange={(value) => handleChange('showTimeline', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="lineBreakAfterLabels">Retour à la ligne après les labels</Label>
                    <Switch
                      id="lineBreakAfterLabels"
                      checked={customization.lineBreakAfterLabels}
                      onCheckedChange={(value) => handleChange('lineBreakAfterLabels', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="nameUppercase">Nom en majuscules</Label>
                    <Switch
                      id="nameUppercase"
                      checked={customization.nameUppercase}
                      onCheckedChange={(value) => handleChange('nameUppercase', value)}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-secondary">Options avancées</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="alignProfileJustify">Profil justifié</Label>
                    <Switch
                      id="alignProfileJustify"
                      checked={customization.alignProfileJustify}
                      onCheckedChange={(value) => handleChange('alignProfileJustify', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="hideInfoIcons">Cacher les icônes d'info</Label>
                    <Switch
                      id="hideInfoIcons"
                      checked={customization.hideInfoIcons}
                      onCheckedChange={(value) => handleChange('hideInfoIcons', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="reduceLicenseDisplay">Réduire l'affichage du permis</Label>
                    <Switch
                      id="reduceLicenseDisplay"
                      checked={customization.reduceLicenseDisplay}
                      onCheckedChange={(value) => handleChange('reduceLicenseDisplay', value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-primary">Tailles</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="textSize">Taille des textes</Label>
                    <Select value={customization.textSize} onValueChange={(value) => handleChange('textSize', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10px">10px - Très petit</SelectItem>
                        <SelectItem value="11px">11px - Petit</SelectItem>
                        <SelectItem value="12px">12px - Compact</SelectItem>
                        <SelectItem value="14px">14px - Standard</SelectItem>
                        <SelectItem value="16px">16px - Moyen</SelectItem>
                        <SelectItem value="18px">18px - Grand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nameSize">Taille du nom</Label>
                    <Select value={customization.nameSize} onValueChange={(value) => handleChange('nameSize', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="14px">14px - Compact</SelectItem>
                        <SelectItem value="16px">16px - Petit</SelectItem>
                        <SelectItem value="18px">18px - Moyen</SelectItem>
                        <SelectItem value="20px">20px - Standard</SelectItem>
                        <SelectItem value="24px">24px - Grand</SelectItem>
                        <SelectItem value="28px">28px - Très grand</SelectItem>
                        <SelectItem value="32px">32px - Extra grand</SelectItem>
                        <SelectItem value="36px">36px - Énorme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="titleSize">Taille des titres</Label>
                    <Select value={customization.titleSize} onValueChange={(value) => handleChange('titleSize', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12px">12px - Compact</SelectItem>
                        <SelectItem value="13px">13px - Petit</SelectItem>
                        <SelectItem value="14px">14px - Standard</SelectItem>
                        <SelectItem value="16px">16px - Moyen</SelectItem>
                        <SelectItem value="18px">18px - Grand</SelectItem>
                        <SelectItem value="20px">20px - Très grand</SelectItem>
                        <SelectItem value="22px">22px - Extra grand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-secondary">Polices</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="textFont">Police des textes</Label>
                    <Select value={customization.textFont} onValueChange={(value) => handleChange('textFont', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OpenSans">Open Sans</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Times">Times</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="titleFont">Police des titres</Label>
                    <Select value={customization.titleFont} onValueChange={(value) => handleChange('titleFont', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VisbyCF">Visby CF</SelectItem>
                        <SelectItem value="OpenSans">Open Sans</SelectItem>
                        <SelectItem value="Arial">Arial Bold</SelectItem>
                        <SelectItem value="Helvetica">Helvetica Bold</SelectItem>
                        <SelectItem value="Georgia">Georgia Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Format de date</Label>
                    <Select value={customization.dateFormat} onValueChange={(value) => handleChange('dateFormat', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Par défaut">Par défaut</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/YYYY">MM/YYYY</SelectItem>
                        <SelectItem value="YYYY">YYYY seulement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spacing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-primary">Marges</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="blockMargins">Marges entre blocs</Label>
                    <Select value={customization.blockMargins} onValueChange={(value) => handleChange('blockMargins', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10px">10px - Serré</SelectItem>
                        <SelectItem value="15px">15px - Compact</SelectItem>
                        <SelectItem value="20px">20px - Standard</SelectItem>
                        <SelectItem value="25px">25px - Aéré</SelectItem>
                        <SelectItem value="30px">30px - Très aéré</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contentMargins">Marges entre contenus</Label>
                    <Select value={customization.contentMargins} onValueChange={(value) => handleChange('contentMargins', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5px">5px - Très serré</SelectItem>
                        <SelectItem value="8px">8px - Serré</SelectItem>
                        <SelectItem value="10px">10px - Standard</SelectItem>
                        <SelectItem value="12px">12px - Aéré</SelectItem>
                        <SelectItem value="15px">15px - Très aéré</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-secondary">Espacements intérieurs</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="verticalPadding">Padding vertical</Label>
                    <Select value={customization.verticalPadding} onValueChange={(value) => handleChange('verticalPadding', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15px">15px - Minimal</SelectItem>
                        <SelectItem value="20px">20px - Standard</SelectItem>
                        <SelectItem value="25px">25px - Confortable</SelectItem>
                        <SelectItem value="30px">30px - Spacieux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="horizontalPadding">Padding horizontal</Label>
                    <Select value={customization.horizontalPadding} onValueChange={(value) => handleChange('horizontalPadding', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15px">15px - Minimal</SelectItem>
                        <SelectItem value="20px">20px - Standard</SelectItem>
                        <SelectItem value="25px">25px - Confortable</SelectItem>
                        <SelectItem value="30px">30px - Spacieux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};