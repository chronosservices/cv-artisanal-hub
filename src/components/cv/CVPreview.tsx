import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CVTemplate1 } from './CVTemplate1';
import { CVTemplate2 } from './CVTemplate2';
import { CVData, TemplateType, CVCustomization } from '@/types/cv';
import { Eye } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
  selectedTemplate: TemplateType;
  customization?: CVCustomization;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, selectedTemplate, customization }) => {
  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-muted/20 sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Eye className="w-5 h-5" />
          Aperçu en temps réel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[800px]" id="cv-preview-container">
          {selectedTemplate === 1 ? (
            <CVTemplate1 data={data} customization={customization} />
          ) : (
            <CVTemplate2 data={data} customization={customization} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};