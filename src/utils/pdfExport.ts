import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string) => {
  try {
    // Essayer plusieurs sélecteurs pour trouver l'élément CV
    let element = document.getElementById(elementId);
    
    if (!element) {
      // Essayer avec le sélecteur de classe CV
      element = document.querySelector('.cv-template') as HTMLElement;
    }
    
    if (!element) {
      // Essayer avec le container du CV
      element = document.querySelector('[data-cv-template]') as HTMLElement;
    }
    
    if (!element) {
      // Essayer avec le conteneur de prévisualisation
      element = document.getElementById('cv-preview-container');
      if (element) {
        element = element.querySelector('div') as HTMLElement;
      }
    }
    
    if (!element) {
      console.error('Aucun élément CV trouvé pour l\'export PDF');
      throw new Error('Élément CV non trouvé. Vérifiez que le CV est bien affiché.');
    }

    console.log('Élément trouvé pour export PDF:', element);

    // Store original classes and styles
    const originalClasses = element.className;
    const originalStyle = element.style.cssText;
    
    // Apply print-specific styles
    element.className = `${originalClasses} cv-print-container cv-a4-format`;
    element.style.cssText = `
      ${originalStyle}
      width: 794px !important;
      min-height: 1123px !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 40px !important;
      box-sizing: border-box !important;
      background: white !important;
      color: black !important;
      font-size: 14px !important;
      line-height: 1.4 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      transform: scale(1) !important;
      position: relative !important;
    `;

    // Assurer que tous les éléments enfants sont visibles
    const childElements = element.querySelectorAll('*');
    childElements.forEach((child: Element) => {
      const htmlChild = child as HTMLElement;
      if (htmlChild.style) {
        htmlChild.style.visibility = 'visible';
        htmlChild.style.opacity = '1';
      }
    });

    // Wait for styles to apply and images to load
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('Début de la capture avec html2canvas...');

    // Create canvas with optimized settings
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true,
      width: 794,
      height: 1123,
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: false,
      imageTimeout: 10000,
      removeContainer: false,
      ignoreElements: (element) => {
        const htmlElement = element as HTMLElement;
        return element.classList.contains('no-print') || 
               htmlElement.style.display === 'none' ||
               htmlElement.style.visibility === 'hidden';
      },
      onclone: (clonedDoc) => {
        console.log('Clone du document créé');
        // Assurer que tous les styles sont appliqués dans le document cloné
        const clonedElement = clonedDoc.querySelector('.cv-template') as HTMLElement;
        if (clonedElement) {
          clonedElement.style.cssText = element.style.cssText;
          clonedElement.style.transform = 'none';
          clonedElement.style.width = '794px';
          clonedElement.style.minHeight = '1123px';
        }

        // Appliquer les styles aux éléments enfants
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            htmlEl.style.visibility = 'visible';
            htmlEl.style.opacity = '1';
          }
        });
      }
    });

    console.log('Canvas créé:', canvas.width, 'x', canvas.height);

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