/**
 * PDF Export via window.print() — the I Love CV method.
 *
 * Why this works when html2canvas/jsPDF failed:
 *  - Native browser print renders REAL DOM with REAL CSS (fonts, colors, gradients).
 *  - @page A4 + @media print rules in index.css show ONLY #cv-print-root at 210×297mm.
 *  - User picks "Save as PDF" in the print dialog → guaranteed WYSIWYG output.
 *  - Works offline, no libraries to break, no blank PDFs, no cropped content.
 *
 * The caller must have already rendered <CVPrintRoot /> in the DOM before printing.
 */
export const exportToPDF = async (_elementId: string, filename: string): Promise<void> => {
  const originalTitle = document.title;
  try {
    document.title = filename.replace(/\.pdf$/i, '');
    // Ensure the print root is fully painted
    await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 150)));
    window.print();
  } finally {
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }
};
