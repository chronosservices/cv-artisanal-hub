import React from 'react';
import { createPortal } from 'react-dom';
import { CVTemplate1 } from './CVTemplate1';
import { CVTemplate2 } from './CVTemplate2';
import { CVTemplate3 } from './CVTemplate3';
import { CVData, CVCustomization } from '@/types/cv';

interface CVPrintRootProps {
  data: CVData;
  selectedTemplate: 1 | 2 | 3;
  customization?: CVCustomization;
}

/**
 * Hidden portal that renders the CV at true A4 dimensions for printing.
 * Kept off-screen at all times (see #cv-print-root in index.css).
 * @media print reveals ONLY this element during window.print().
 */
export const CVPrintRoot: React.FC<CVPrintRootProps> = ({ data, selectedTemplate, customization }) => {
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    let node = document.getElementById('cv-print-root');
    if (!node) {
      node = document.createElement('div');
      node.id = 'cv-print-root';
      document.body.appendChild(node);
    }
    setMountNode(node);
  }, []);

  if (!mountNode) return null;

  return createPortal(
    <div style={{ width: '210mm', minHeight: '297mm', background: 'white' }}>
      {selectedTemplate === 1 && <CVTemplate1 data={data} customization={customization} />}
      {selectedTemplate === 2 && <CVTemplate2 data={data} customization={customization} />}
      {selectedTemplate === 3 && <CVTemplate3 data={data} customization={customization} />}
    </div>,
    mountNode
  );
};
