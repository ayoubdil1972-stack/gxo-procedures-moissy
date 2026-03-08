const QRCode = require('qrcode');
const { jsPDF } = require('jspdf');

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
    compress: true
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const qrSize = 120;
  const qrX = (pageWidth - qrSize) / 2;
  const qrY = 80;

  let isFirstPage = true;
  let qrCount = 0;

  for (const [zoneName, zoneData] of Object.entries(zonesQuais)) {
    for (const quai of zoneData.quais) {
      if (!isFirstPage) {
        doc.addPage();
      }
      isFirstPage = false;
      qrCount++;

      const url = `https://gxomoissyprocedures.com/scan-dechargement?quai=${quai}`;

      const qrDataUrl = await QRCode.toDataURL(url, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 600,
        type: 'image/png',
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('GXO Moissy - QR Code', pageWidth / 2, 30, { align: 'center' });

      const [r, g, b] = zoneData.color;
      doc.setFillColor(r, g, b);
      const bandeauY = qrY - 30;
      doc.rect(qrX - 5, bandeauY, qrSize + 10, 20, 'F');

      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(zoneName, pageWidth / 2, bandeauY + 13, { align: 'center' });

      doc.setDrawColor(150, 150, 150);
      doc.setLineWidth(1);
      doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 'S');

      doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize, '', 'FAST');

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(`Quai ${quai}`, pageWidth / 2, qrY + qrSize + 15, { align: 'center' });
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text('Début de Déchargement', pageWidth / 2, qrY + qrSize + 25, { align: 'center' });

      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${qrCount}/45`, pageWidth / 2, pageHeight - 10, { align: 'center' });

      if (qrCount % 5 === 0) {
        console.log(`✅ ${qrCount}/45 pages générées...`);
      }
    }
  }

  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const filename = `GXO-Moissy-QR-Codes-Debut-Dechargement-${dateStr}.pdf`;
  
  doc.save(filename);
  
  console.log(`\n✅ PDF généré : ${filename}`);
  console.log(`📄 45 pages - 1 QR par page`);
}

generatePDF().catch(console.error);
