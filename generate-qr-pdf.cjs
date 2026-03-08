const QRCode = require('qrcode');
const { jsPDF } = require('jspdf');
const fs = require('fs');

const QUAIS_CONFIG = {
    'Zone A': Array.from({length: 10}, (_, i) => i + 1),
    'Zone B': Array.from({length: 7}, (_, i) => i + 32),
    'Zone C': Array.from({length: 5}, (_, i) => i + 45),
    'Zone D': [60, 61, 62, 67, 68, 69],
    'Zone E': [75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87],
    'Zone F': Array.from({length: 5}, (_, i) => i + 99)
};

const ZONE_COLORS = {
    'Zone A': [255, 107, 107],
    'Zone B': [78, 205, 196],
    'Zone C': [69, 183, 209],
    'Zone D': [255, 160, 122],
    'Zone E': [152, 216, 200],
    'Zone F': [247, 220, 111]
};

async function generateQRCodesPDF() {
    console.log('🔄 Génération du PDF QR Codes...');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const qrSize = 60;
    const cols = 2;
    const rows = 4;
    const spacingX = (pageWidth - 2 * margin - cols * qrSize) / (cols - 1);
    const spacingY = 20;
    
    let currentX = margin;
    let currentY = margin;
    let itemCount = 0;
    let pageCount = 1;

    // Titre
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text('QR Codes GXO Moissy - Démarrage Déchargement', pageWidth / 2, currentY, { align: 'center' });
    currentY += 8;
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} - 45 Quais`, pageWidth / 2, currentY, { align: 'center' });
    currentY += 15;

    for (const [zone, quais] of Object.entries(QUAIS_CONFIG)) {
        const zoneColor = ZONE_COLORS[zone];
        
        for (const quai of quais) {
            const url = `https://gxomoissyprocedures.com/scan-dechargement?quai=${quai}`;
            
            // Générer QR code
            const qrDataURL = await QRCode.toDataURL(url, {
                width: 400,
                margin: 1,
                errorCorrectionLevel: 'H',
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            if (itemCount > 0 && itemCount % cols === 0) {
                currentX = margin;
                currentY += qrSize + spacingY;
            }

            if (itemCount > 0 && itemCount % (cols * rows) === 0) {
                pdf.addPage();
                pageCount++;
                currentY = margin;
                currentX = margin;
            }

            // Cadre coloré
            pdf.setFillColor(zoneColor[0], zoneColor[1], zoneColor[2]);
            pdf.rect(currentX - 3, currentY - 3, qrSize + 6, qrSize + 20, 'F');

            // Bordure blanche
            pdf.setFillColor(255, 255, 255);
            pdf.rect(currentX, currentY - 1, qrSize, 12, 'F');

            // Texte
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'bold');
            pdf.text(`${zone} - Quai ${quai}`, currentX + qrSize / 2, currentY + 7, { align: 'center' });
            
            // QR code
            pdf.addImage(qrDataURL, 'PNG', currentX, currentY + 13, qrSize, qrSize);

            currentX += qrSize + spacingX;
            itemCount++;
        }
    }

    const filename = `GXO-Moissy-QR-Codes-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    
    console.log(`✅ PDF généré: ${filename}`);
    console.log(`📊 ${itemCount} QR codes sur ${pageCount} pages`);
    
    return filename;
}

generateQRCodesPDF().catch(console.error);
