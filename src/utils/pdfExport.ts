import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    // Calculate dimensions
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasAspectRatio = canvas.height / canvas.width;
    const pdfAspectRatio = pdfHeight / pdfWidth;

    let imgWidth, imgHeight;
    if (canvasAspectRatio > pdfAspectRatio) {
      imgHeight = pdfHeight;
      imgWidth = imgHeight / canvasAspectRatio;
    } else {
      imgWidth = pdfWidth;
      imgHeight = imgWidth * canvasAspectRatio;
    }

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};