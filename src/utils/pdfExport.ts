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
    
    // Nouveau fallback : utiliser l'elementId fourni
    if (!element && elementId) {
      element = document.getElementById(elementId);
      console.log('Element trouvé par ID:', elementId, element);
    }
    
    if (!element) {
      console.error('Aucun template CV trouvé');
      throw new Error('Template CV non trouvé. Assurez-vous que le CV est affiché.');
    }

    console.log('Template CV sélectionné pour export:', element);
    console.log('Contenu de l\'élément:', element.innerHTML.substring(0, 200));
    console.log('Dimensions originales:', element.offsetWidth, 'x', element.offsetHeight);

    // Vérifier que l'élément a du contenu
    if (!element.innerHTML.trim()) {
      throw new Error('L\'élément CV est vide');
    }

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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
      z-index: 9999;
      overflow: visible !important;
    `;
    
    // Cloner l'élément CV et l'ajouter au conteneur temporaire
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Appliquer les styles au clone
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
      overflow: visible !important;
      min-height: auto !important;
      height: auto !important;
    `;
    
    // Forcer la visibilité de tous les enfants
    const allChildElements = clonedElement.querySelectorAll('*');
    allChildElements.forEach((child: Element) => {
      const htmlChild = child as HTMLElement;
      if (htmlChild.style) {
        htmlChild.style.visibility = 'visible';
        htmlChild.style.opacity = '1';
        htmlChild.style.display = htmlChild.style.display === 'none' ? 'block' : htmlChild.style.display || 'block';
      }
    });
    
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);
    
    // Attendre que le DOM soit mis à jour et que les fonts se chargent
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Attendre que les fonts soient chargées
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    console.log('Début de la capture avec html2canvas...');
    console.log('Dimensions du conteneur temporaire:', tempContainer.offsetWidth, 'x', tempContainer.offsetHeight);

    // Capturer le conteneur temporaire avec des options améliorées
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false, // Désactiver les logs pour éviter le spam
      width: 794,
      height: Math.max(1123, tempContainer.scrollHeight + 80), // Hauteur dynamique
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: true,
      imageTimeout: 15000,
      removeContainer: false,
      ignoreElements: (element) => {
        // Ignorer les éléments cachés ou avec opacity 0
        const style = window.getComputedStyle(element);
        return style.display === 'none' || 
               style.visibility === 'hidden' || 
               style.opacity === '0' ||
               element.tagName === 'SCRIPT' ||
               element.tagName === 'NOSCRIPT';
      },
      onclone: (clonedDoc, clonedElement) => {
        console.log('Document cloné pour capture');
        
        if (clonedElement) {
          clonedElement.style.width = '794px';
          clonedElement.style.minHeight = '1123px';
          clonedElement.style.background = 'white';
          clonedElement.style.color = '#000000';
          clonedElement.style.fontSize = '14px';
        }
        
        // Forcer la visibilité et les couleurs par défaut
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            // Forcer la visibilité
            if (htmlEl.style.display === 'none') return;
            htmlEl.style.visibility = 'visible';
            htmlEl.style.opacity = htmlEl.style.opacity || '1';
            
            // Forcer les couleurs de base si elles ne sont pas définies
            if (!htmlEl.style.color && htmlEl.tagName !== 'IMG') {
              htmlEl.style.color = '#000000';
            }
            if (!htmlEl.style.backgroundColor && (htmlEl.tagName === 'DIV' || htmlEl.tagName === 'SECTION')) {
              htmlEl.style.backgroundColor = 'transparent';
            }
          }
        });
      }
    });

    console.log('Canvas créé avec succès:', canvas.width, 'x', canvas.height);
    
    // Vérifier que le canvas n'est pas vide
    const ctx = canvas.getContext('2d');
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    const isEmpty = imageData?.data.every((pixel, index) => {
      // Vérifier si tous les pixels sont blancs (RGBA)
      if (index % 4 === 3) return pixel === 255; // Alpha
      return pixel === 255; // RGB
    });
    
    if (isEmpty) {
      console.warn('Le canvas semble être vide (tout blanc)');
      // Ne pas lever d'erreur, continuer quand même
    }
    
    // Nettoyer le conteneur temporaire
    document.body.removeChild(tempContainer);

    // Créer le PDF avec les dimensions exactes A4
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Vérifier que l'image n'est pas vide
    if (imgData.length < 1000) {
      throw new Error('Les données de l\'image sont trop petites, probablement vides');
    }
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
    
    // Calculer les dimensions de l'image pour s'adapter à A4
    const canvasAspectRatio = canvas.width / canvas.height;
    const pdfAspectRatio = pdfWidth / pdfHeight;
    
    let imgWidth, imgHeight, x, y;
    
    if (canvasAspectRatio > pdfAspectRatio) {
      // Canvas plus large que A4
      imgWidth = pdfWidth - 20; // Marge de 10mm de chaque côté
      imgHeight = imgWidth / canvasAspectRatio;
      x = 10;
      y = (pdfHeight - imgHeight) / 2;
    } else {
      // Canvas plus haut que A4
      imgHeight = pdfHeight - 20; // Marge de 10mm en haut et en bas
      imgWidth = imgHeight * canvasAspectRatio;
      x = (pdfWidth - imgWidth) / 2;
      y = 10;
    }
    
    console.log(`Ajout de l'image au PDF: position (${x}, ${y}), taille (${imgWidth} x ${imgHeight})`);

    // Ajouter l'image au PDF
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight, undefined, 'FAST');
    
    // Sauvegarder le PDF
    const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(finalFilename);
    
    console.log('PDF généré avec succès:', finalFilename);
    return true;
    
  } catch (error) {
    console.error('Erreur lors de l\'export PDF:', error);
    throw error;
  }
};
