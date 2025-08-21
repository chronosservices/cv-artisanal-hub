import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string) => {
  try {
    // Trouver directement le template CV qui contient les données
    let element: HTMLElement | null = null;
    
    // Chercher le template CV dans l'aperçu
    const cvTemplate = document.querySelector('.cv-template') as HTMLElement;
    if (cvTemplate) {
      element = cvTemplate;
      console.log('Template CV trouvé directement:', element);
    }
    
    // Fallback : chercher dans le conteneur d'aperçu
    if (!element) {
      const previewContainer = document.getElementById('cv-preview-container');
      if (previewContainer) {
        element = previewContainer.querySelector('.cv-template') as HTMLElement;
        console.log('Template trouvé dans conteneur:', element);
      }
    }
    
    // Dernier fallback : chercher par attribut data
    if (!element) {
      element = document.querySelector('[data-cv-template]') as HTMLElement;
    }
    
    if (!element) {
      console.error('Aucun template CV trouvé');
      throw new Error('Template CV non trouvé. Assurez-vous que le CV est affiché.');
    }

    console.log('Template CV sélectionné pour export:', element);
    console.log('Contenu de l\'élément:', element.innerHTML.substring(0, 200));

    // Créer un conteneur temporaire pour l'export avec dimensions fixes A4
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 794px !important;
      min-height: 1123px !important;
      background: white !important;
      padding: 40px !important;
      box-sizing: border-box !important;
      font-family: inherit !important;
      z-index: 9999;
    `;
    
    // Cloner l'élément CV et l'ajouter au conteneur temporaire
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.cssText = `
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      transform: none !important;
      position: relative !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    `;
    
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);
    
    // Attendre que le DOM soit mis à jour
    await new Promise(resolve => setTimeout(resolve, 100));

    console.log('Début de la capture avec html2canvas...');

    // Capturer le conteneur temporaire
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true,
      width: 794,
      height: 1123,
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: true,
      imageTimeout: 15000,
      removeContainer: false,
      ignoreElements: () => false, // Capturer tous les éléments
      onclone: (clonedDoc, clonedElement) => {
        console.log('Document cloné pour capture');
        
        // S'assurer que tous les styles sont préservés
        if (clonedElement) {
          clonedElement.style.width = '794px';
          clonedElement.style.minHeight = '1123px';
          clonedElement.style.background = 'white';
        }
        
        // Forcer la visibilité de tous les éléments
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            htmlEl.style.visibility = 'visible';
            htmlEl.style.opacity = '1';
            htmlEl.style.display = htmlEl.style.display || 'block';
          }
        });
      }
    });

    console.log('Canvas créé avec succès:', canvas.width, 'x', canvas.height);
    
    // Nettoyer le conteneur temporaire
    document.body.removeChild(tempContainer);

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