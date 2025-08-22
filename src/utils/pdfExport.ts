import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string) => {
  try {
    console.log('Début export PDF pour:', filename);
    
    // Chercher l'élément CV content directement
    let sourceElement: HTMLElement | null = null;
    
    // 1. Chercher par ID cv-template-content
    sourceElement = document.getElementById('cv-template-content');
    console.log('Template content trouvé:', sourceElement);
    
    // 2. Fallback: chercher .cv-template
    if (!sourceElement) {
      sourceElement = document.querySelector('.cv-template') as HTMLElement;
      console.log('Template par classe trouvé:', sourceElement);
    }
    
    // 3. Fallback: chercher dans cv-preview-container
    if (!sourceElement) {
      const container = document.getElementById('cv-preview-container');
      if (container) {
        sourceElement = container.querySelector('.cv-template, [data-cv-template]') as HTMLElement;
        console.log('Template dans container trouvé:', sourceElement);
      }
    }
    
    if (!sourceElement) {
      console.error('Aucun élément CV trouvé pour export');
      throw new Error('CV non trouvé. Veuillez vous assurer que le CV est affiché.');
    }

    console.log('Element source pour export:', sourceElement);
    console.log('Dimensions source:', sourceElement.offsetWidth, 'x', sourceElement.offsetHeight);
    console.log('Contenu:', sourceElement.innerHTML.substring(0, 100));

    // Vérifier que l'élément a du contenu
    if (!sourceElement.innerHTML.trim()) {
      throw new Error('Le CV est vide. Veuillez remplir au moins les informations de base.');
    }

    // Créer un conteneur temporaire visible dans la page pour le debug
    const tempContainer = document.createElement('div');
    tempContainer.id = 'pdf-export-container';
    tempContainer.style.cssText = `
      position: fixed;
      top: -10000px;
      left: 0;
      width: 210mm;
      min-height: 297mm;
      background: white;
      padding: 20mm;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
      z-index: 99999;
      overflow: visible;
      transform: scale(1);
      transform-origin: top left;
    `;
    
    // Cloner l'élément source
    const clonedElement = sourceElement.cloneNode(true) as HTMLElement;
    
    // Nettoyer et ajuster le clone pour l'export
    clonedElement.style.cssText = `
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 0;
      background: white;
      transform: none;
      position: relative;
      display: block;
      visibility: visible;
      opacity: 1;
      overflow: visible;
      min-height: auto;
      height: auto;
      font-size: 12px;
      line-height: 1.4;
      color: black;
    `;
    
    // Forcer tous les styles pour la lisibilité
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((child: Element) => {
      const htmlChild = child as HTMLElement;
      if (htmlChild.style) {
        // Forcer la visibilité
        htmlChild.style.visibility = 'visible';
        htmlChild.style.opacity = '1';
        
        // Forcer les couleurs de base
        if (htmlChild.tagName === 'H1' || htmlChild.tagName === 'H2' || htmlChild.tagName === 'H3') {
          htmlChild.style.color = htmlChild.style.color || '#000000';
          htmlChild.style.fontWeight = 'bold';
        } else if (htmlChild.tagName === 'P' || htmlChild.tagName === 'SPAN' || htmlChild.tagName === 'DIV') {
          htmlChild.style.color = htmlChild.style.color || '#000000';
        }
        
        // Supprimer les transformations et styles problématiques
        htmlChild.style.transform = 'none';
        htmlChild.style.filter = 'none';
        
        // Assurer l'affichage des blocs
        if (htmlChild.style.display === 'none') {
          htmlChild.style.display = 'block';
        }
      }
    });
    
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);
    
    // Attendre le rendu
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Attendre les fonts
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    console.log('Début de la capture avec html2canvas...');
    console.log('Dimensions du conteneur temporaire:', tempContainer.offsetWidth, 'x', tempContainer.offsetHeight);

    console.log('Capture avec html2canvas...');
    console.log('Dimensions container:', tempContainer.offsetWidth, 'x', tempContainer.offsetHeight);

    // Capturer avec des options optimisées
    const canvas = await html2canvas(tempContainer, {
      scale: 3, // Augmenter la qualité
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true, // Activer pour debug
      width: Math.floor(210 * 3.78), // 210mm en pixels à 96dpi * 3.78
      height: Math.floor(297 * 3.78), // 297mm en pixels à 96dpi * 3.78
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: false, // Désactiver pour compatibilité
      imageTimeout: 30000,
      removeContainer: false,
      ignoreElements: (element) => {
        const style = window.getComputedStyle(element);
        return style.display === 'none' || 
               style.visibility === 'hidden' || 
               parseFloat(style.opacity) === 0;
      },
      onclone: (clonedDoc, element) => {
        console.log('Document cloné pour capture html2canvas');
        
        // Appliquer les styles de base au document cloné
        // Vérifier si head existe avant d'essayer d'ajouter des styles
        if (clonedDoc.head) {
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            body, div, p, span, h1, h2, h3, h4, h5, h6 {
              color: #000000 !important;
              background: transparent !important;
            }
            .bg-white { background: white !important; }
            .text-black { color: black !important; }
          `;
          clonedDoc.head.appendChild(style);
        }
        
        // Forcer les couleurs sur tous les éléments
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            // Nettoyer les transformations
            htmlEl.style.transform = 'none';
            htmlEl.style.transition = 'none';
            htmlEl.style.animation = 'none';
            
            // Forcer les couleurs
            if (htmlEl.tagName === 'P' || htmlEl.tagName === 'SPAN' || htmlEl.tagName === 'DIV') {
              if (!htmlEl.style.color || htmlEl.style.color === 'inherit') {
                htmlEl.style.color = '#000000';
              }
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
