import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CVTemplate1 } from './CVTemplate1';
import { CVTemplate2 } from './CVTemplate2';
import { CVTemplate3 } from './CVTemplate3';
import { CVData, TemplateType, CVCustomization } from '@/types/cv';
import { Eye } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
  selectedTemplate: TemplateType;
  customization?: CVCustomization;
}

/**
 * On-screen preview of the CV.
 * Uses CSS `zoom` (with `transform: scale` fallback via wrapper) so the
 * A4 page (210mm ≈ 794px) shrinks to fit any container width without
 * losing pixel accuracy or breaking clicks.
 */
export const CVPreview: React.FC<CVPreviewProps> = ({ data, selectedTemplate, customization }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useLayoutEffect(() => {
    const compute = () => {
      const w = wrapperRef.current?.clientWidth ?? 794;
      // 794px = 210mm at 96dpi
      const next = Math.min(1, Math.max(0.35, w / 794));
      setScale(next);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <Card className="shadow-lg border-0 bg-card overflow-hidden">
      <CardHeader className="py-3 px-4 border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-primary text-sm font-semibold">
          <Eye className="w-4 h-4" />
          Aperçu du CV
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 bg-muted/10">
        <div
          ref={wrapperRef}
          className="w-full"
          style={{ height: `${297 * (794 / 210) * scale / (794 / 210)}px`, minHeight: '400px' }}
        >
          <div
            style={{
              width: '794px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              background: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            {selectedTemplate === 1 && <CVTemplate1 data={data} customization={customization} />}
            {selectedTemplate === 2 && <CVTemplate2 data={data} customization={customization} />}
            {selectedTemplate === 3 && <CVTemplate3 data={data} customization={customization} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
