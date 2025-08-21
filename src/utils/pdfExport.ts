import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Store original classes and styles
    const originalClasses = element.className;
    const originalStyle = element.style.cssText;
    
    // Apply print-specific styles
    element.className = `${originalClasses} cv-print-container cv-a4-format`;
    element.style.cssText = `
      ${originalStyle}
      width: 210mm !important;
      min-height: 297mm !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 20mm !important;
      box-sizing: border-box !important;
      background: white !important;
      color: black !important;
      font-size: 14px !important;
      line-height: 1.4 !important;
    `;

    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 100));

    // Create canvas with optimized settings
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: true,
      imageTimeout: 5000,
      removeContainer: false,
      onclone: (clonedDoc) => {
        // Ensure all styles are applied in the cloned document
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.cssText = element.style.cssText;
        }
      }
    });

    // Restore original styles
    element.className = originalClasses;
    element.style.cssText = originalStyle;

    // Create PDF with exact A4 dimensions
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
    
    // Calculate image dimensions to fit A4
    const canvasAspectRatio = canvas.width / canvas.height;
    const pdfAspectRatio = pdfWidth / pdfHeight;
    
    let imgWidth, imgHeight;
    
    if (canvasAspectRatio > pdfAspectRatio) {
      // Canvas is wider than A4
      imgWidth = pdfWidth;
      imgHeight = pdfWidth / canvasAspectRatio;
    } else {
      // Canvas is taller than A4
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * canvasAspectRatio;
    }
    
    // Center the image on the page
    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight, undefined, 'FAST');
    
    // Save the PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};