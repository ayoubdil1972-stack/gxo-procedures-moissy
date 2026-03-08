const QRCode = require('qrcode');
const { jsPDF } = require('jspdf');

// Configuration EXACTE des zones (même ordre que PDF Fin)
const zonesQuais = {
  'Zone A': { quais: [1,2,3,4,5,6,7,8,9,10], color: [255, 107, 107] },
  'Zone B': { quais: [32,33,34,35,36,37,38], color: [78, 205, 196] },
  'Zone C': { quais: [45,46,47,48,49], color: [69, 183, 209] },
  'Zone D': { quais: [60,61,62,67,68,69], color: [255, 160, 122] },
  'Zone E': { quais: [75,76,77,78,79,81,82,83,84,85,86,87], color: [152, 216, 200] },
  'Zone F': { quais: [99,100,101,102,103], color: [247, 220, 111] }
};

async function generatePDF() {
  console.log('🚀 Génération PDF Début - Format EXACT du PDF Fin...');
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: false
  });

  const pageWidth = 210;
  const pageHeight = 297;
  
  // Configuration EXACTE (basée sur analyse PDF Fin)
  // 1 QR CODE PAR PAGE, centré
  const qrSize = 120; // 120mm = 12cm (grand QR)
  const qrX = (pageWidth - qrSize) / 2; // Centré horizontalement
  const qrY = 80; // Position Y

  let isFirstPage = true;
  let qrCount = 0;

  // Parcourir TOUTES les zones dans l'ORDRE
  for (const [zoneName, zoneData] of Object.entries(zonesQuais)) {
    for (const quai of zoneData.quais) {
      if (!isFirstPage) {
        doc.addPage();
      }
      isFirstPage = false;
      qrCount++;

      // URL du QR (DEBUT au lieu de FIN)
      const url = `https://gxomoissyprocedures.com/scan-dechargement?quai=${quai}`;

      // Générer le QR code
      const qrDataUrl = await QRCode.toDataURL(url, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 500,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      // === MISE EN PAGE EXACTE ===
      
      // 1. Titre en haut
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('GXO Moissy - QR Code', pageWidth / 2, 30, { align: 'center' });

      // 2. Bandeau coloré de la zone
      const [r, g, b] = zoneData.color;
      doc.setFillColor(r, g, b);
      const bandeauY = qrY - 30;
      const bandeauHeight = 20;
      doc.rect(qrX - 5, bandeauY, qrSize + 10, bandeauHeight, 'F');

      // 3. Texte zone sur le bandeau (blanc)
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(zoneName, pageWidth / 2, bandeauY + 13, { align: 'center' });

      // 4. Bordure grise autour du QR
      doc.setDrawColor(150, 150, 150);
      doc.setLineWidth(1);
      doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 'S');

      // 5. QR code
      doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

      // 6. Texte sous le QR (noir)
      doc.setTextColor(0, 0, 0);
      
      // Numéro de quai (gros, gras)
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(`Quai ${quai}`, pageWidth / 2, qrY + qrSize + 15, { align: 'center' });
      
      // Type de déchargement (moyen, normal)
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text('Début de Déchargement', pageWidth / 2, qrY + qrSize + 25, { align: 'center' });

      // 7. Numéro de page en bas (petit, gris)
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${qrCount}/45`, pageWidth / 2, pageHeight - 10, { align: 'center' });

      console.log(`✅ Page ${qrCount}/45 - Zone ${zoneName} - Quai ${quai}`);
    }
  }

  // Sauvegarder
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const filename = `GXO-Moissy-QR-Codes-Debut-Dechargement-${dateStr}.pdf`;
  
  doc.save(filename);
  
  console.log('\n✅ PDF généré avec succès !');
  console.log(`📄 Fichier : ${filename}`);
  console.log(`📋 Pages : ${qrCount} pages`);
  console.log(`🎯 Format : 1 QR par page (IDENTIQUE au PDF Fin)`);
}

generatePDF().catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
