import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Create canvas from HTML element with better settings for CV content
    const canvas = await html2canvas(element, {
      scale: 2, // Optimized scale for A4 format
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: true,
      imageTimeout: 0
    });

    // Calculate dimensions
    const imgData = canvas.toDataURL('image/png', 1.0); // Max quality
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate canvas dimensions in mm
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Calculate A4 dimensions with proper scaling
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const margin = 5; // 5mm margin for better content visibility
    
    const availableWidth = A4_WIDTH_MM - (2 * margin);
    const availableHeight = A4_HEIGHT_MM - (2 * margin);
    
    // Calculate scale to fit content to A4
    const scaleX = availableWidth / (canvasWidth / 3.78); // Convert px to mm (1mm = 3.78px at 96dpi)
    const scaleY = availableHeight / (canvasHeight / 3.78);
    const scale = Math.min(scaleX, scaleY, 1); // Don't upscale
    
    const imgWidth = (canvasWidth / 3.78) * scale;
    const imgHeight = (canvasHeight / 3.78) * scale;
    
    const x = margin + (availableWidth - imgWidth) / 2;
    const y = margin + (availableHeight - imgHeight) / 2;

    // Ensure content fits on single page
    if (imgHeight > availableHeight) {
      // Split into multiple pages if needed
      const pageHeight = availableHeight;
      const totalPages = Math.ceil(imgHeight / pageHeight);
      
      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        
        const sourceY = (page * pageHeight * canvasHeight) / imgHeight;
        const sourceHeight = Math.min(pageHeight * canvasHeight / imgHeight, canvasHeight - sourceY);
        
        // Create a new canvas for this page section
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sourceHeight;
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          pageCtx.drawImage(canvas, 0, sourceY, canvasWidth, sourceHeight, 0, 0, canvasWidth, sourceHeight);
          const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
          pdf.addImage(pageImgData, 'PNG', x, margin, imgWidth, pageHeight);
        }
      }
    } else {
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    }
    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};