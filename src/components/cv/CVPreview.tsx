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
    <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-muted/20 sticky top-2 sm:top-6">
      <CardHeader className="pb-2 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-primary text-sm sm:text-base">
          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          Aperçu
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <div 
          className="bg-white dark:bg-white rounded-lg overflow-hidden border border-gray-200 max-h-[70vh] sm:max-h-[800px] overflow-y-auto"
          id="cv-preview-container"
          style={{ 
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            width: '200%',
            height: '200%',
            maxHeight: '140vh'
          }}
        >
          <div id="cv-template-content" className="cv-template">
            {selectedTemplate === 1 ? (
              <CVTemplate1 data={data} customization={customization} />
            ) : (
              <CVTemplate2 data={data} customization={customization} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};