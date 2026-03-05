// Script Node.js pour générer le PDF des QR Codes
// Ce script génère un PDF avec tous les QR Codes des 45 quais GXO Moissy

const QRCode = require('qrcode');
const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

// Configuration des quais GXO Moissy
const QUAIS_CONFIG = {
  'Zone A': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'Zone B': [32, 33, 34, 35, 36, 37, 38],
  'Zone C': [45, 46, 47, 48, 49],
  'Zone D': [60, 61, 62, 67, 68, 69],
  'Zone E': [75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87],
  'Zone F': [99, 100, 101, 102, 103]
};

const ZONE_COLORS = {
  'Zone A': { r: 59, g: 130, b: 246 },   // Bleu
  'Zone B': { r: 139, g: 92, b: 246 },   // Violet
  'Zone C': { r: 245, g: 158, b: 11 },   // Orange
  'Zone D': { r: 20, g: 184, b: 166 },   // Turquoise
  'Zone E': { r: 236, g: 72, b: 153 },   // Rose
  'Zone F': { r: 99, g: 102, b: 241 }    // Indigo
};

const BASE_URL = 'https://gxomoissyprocedures.com';

async function generateQRCodesPDF() {
  console.log('🎨 Génération du PDF des QR Codes GXO Moissy...');
  
  const pdf = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Dimensions
  const qrWidth = 80;
  const qrHeight = 80;
  const cols = 2;
  const margin = 10;
  const spacing = 10;
  const labelHeight = 20;
  
  // En-tête première page
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.text('QR Codes GXO Moissy - Scan Automatique', pageWidth / 2, 15, { align: 'center' });
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const date = new Date().toLocaleDateString('fr-FR');
  pdf.text(`Généré le ${date}`, pageWidth / 2, 22, { align: 'center' });
  
  pdf.setFontSize(9);
  pdf.text('45 QR Codes - Scanner avec votre smartphone pour démarrer le timer automatiquement', pageWidth / 2, 27, { align: 'center' });
  
  let currentY = 35;
  let col = 0;
  let count = 0;
  const totalQuais = Object.values(QUAIS_CONFIG).flat().length;
  
  for (const [zone, quais] of Object.entries(QUAIS_CONFIG)) {
    for (const quaiNumero of quais) {
      // Nouvelle page si nécessaire
      if (currentY + qrHeight + labelHeight > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
        col = 0;
      }
      
      const x = margin + col * (qrWidth + spacing);
      const url = `${BASE_URL}/scan?quai=${quaiNumero}`;
      
      console.log(`  📱 Génération QR Code Quai ${quaiNumero} (${zone})...`);
      
      try {
        // Générer le QR Code
        const qrDataURL = await QRCode.toDataURL(url, {
          width: 600,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        
        // Cadre
        pdf.setDrawColor(220);
        pdf.setLineWidth(0.5);
        pdf.rect(x, currentY, qrWidth, qrHeight + labelHeight);
        
        // Barre de couleur de zone
        const color = ZONE_COLORS[zone];
        pdf.setFillColor(color.r, color.g, color.b);
        pdf.rect(x, currentY, qrWidth, 8, 'F');
        
        // Label zone
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(zone, x + qrWidth / 2, currentY + 5.5, { align: 'center' });
        
        // QR Code
        pdf.addImage(qrDataURL, 'PNG', x + 5, currentY + 10, qrWidth - 10, qrWidth - 10);
        
        // Label quai
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Quai ${quaiNumero}`, x + qrWidth / 2, currentY + qrHeight + 6, { align: 'center' });
        
        // URL
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        pdf.text(url, x + qrWidth / 2, currentY + qrHeight + 12, { 
          align: 'center',
          maxWidth: qrWidth - 4
        });
        
        // Instructions
        pdf.setFontSize(6);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Scanner pour démarrer le timer', x + qrWidth / 2, currentY + qrHeight + 16, { align: 'center' });
        
        count++;
        col++;
        
        if (col >= cols) {
          col = 0;
          currentY += qrHeight + labelHeight + spacing;
        }
      } catch (error) {
        console.error(`❌ Erreur génération QR Code ${quaiNumero}:`, error);
      }
    }
  }
  
  // Footer sur toutes les pages
  const totalPages = pdf.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(128);
    pdf.text(
      `Page ${i}/${totalPages} - GXO Moissy - ${count} QR Codes Générés`,
      pageWidth / 2,
      pageHeight - 5,
      { align: 'center' }
    );
  }
  
  // Sauvegarder
  const filename = `GXO-Moissy-QR-Codes-${new Date().toISOString().split('T')[0]}.pdf`;
  const outputPath = path.join(__dirname, filename);
  
  pdf.save(outputPath);
  
  console.log(`✅ PDF généré avec succès: ${filename}`);
  console.log(`📍 Emplacement: ${outputPath}`);
  console.log(`📊 Total: ${count} QR Codes générés`);
  
  return { filename, outputPath, count };
}

// Exécution
if (require.main === module) {
  generateQRCodesPDF()
    .then(result => {
      console.log('\n🎉 Génération terminée !');
      console.log(`📄 Fichier: ${result.filename}`);
      console.log(`📦 QR Codes: ${result.count}/45`);
    })
    .catch(error => {
      console.error('❌ Erreur:', error);
      process.exit(1);
    });
}

module.exports = { generateQRCodesPDF };
