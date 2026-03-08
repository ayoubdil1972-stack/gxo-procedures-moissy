const QRCode = require('qrcode');
const { jsPDF } = require('jspdf');

const QUAIS_CONFIG = {
    'Zone A': Array.from({length: 10}, (_, i) => i + 1),
    'Zone B': Array.from({length: 7}, (_, i) => i + 32),
    'Zone C': Array.from({length: 5}, (_, i) => i + 45),
    'Zone D': [60, 61, 62, 67, 68, 69],
    'Zone E': [75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87],
    'Zone F': Array.from({length: 5}, (_, i) => i + 99)
};

const ZONE_COLORS = {
    'Zone A': { r: 239, g: 68, b: 68 },    // Rouge
    'Zone B': { r: 59, g: 130, b: 246 },   // Bleu
    'Zone C': { r: 16, g: 185, b: 129 },   // Vert
    'Zone D': { r: 251, g: 146, b: 60 },   // Orange
    'Zone E': { r: 168, g: 85, b: 247 },   // Violet
    'Zone F': { r: 236, g: 72, b: 153 }    // Rose
};

async function generateQRCodesPDF() {
    console.log('🔄 Génération du PDF QR Codes - Début de Déchargement...');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;
    const qrSize = 50;  // Taille plus petite comme dans le PDF Fin
    const cols = 3;     // 3 colonnes comme dans le PDF Fin
    const rows = 5;     // 5 lignes par page
    const spacingX = (pageWidth - 2 * margin - cols * qrSize) / (cols + 1);
    const spacingY = 10;
    
    let currentX = margin + spacingX;
    let currentY = margin + 5;
    let itemCount = 0;
    let pageCount = 1;

    // Titre de la première page
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.text('GXO Moissy - QR Codes Début de Déchargement', pageWidth / 2, currentY, { align: 'center' });
    currentY += 6;
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} - 45 Quais`, pageWidth / 2, currentY, { align: 'center' });
    currentY += 12;

    for (const [zone, quais] of Object.entries(QUAIS_CONFIG)) {
        const zoneColor = ZONE_COLORS[zone];
        
        for (const quai of quais) {
            const url = `https://gxomoissyprocedures.com/scan-dechargement?quai=${quai}`;
            
            // Générer QR code
            const qrDataURL = await QRCode.toDataURL(url, {
                width: 300,
                margin: 1,
                errorCorrectionLevel: 'H',
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            // Vérifier si on doit changer de ligne
            if (itemCount > 0 && itemCount % cols === 0) {
                currentX = margin + spacingX;
                currentY += qrSize + spacingY + 15;
            }

            // Vérifier si on doit changer de page
            if (itemCount > 0 && itemCount % (cols * rows) === 0) {
                pdf.addPage();
                pageCount++;
                currentY = margin + 5;
                currentX = margin + spacingX;
                
                // Titre de la nouvelle page
                pdf.setFontSize(16);
                pdf.setFont(undefined, 'bold');
                pdf.text('GXO Moissy - QR Codes Début de Déchargement', pageWidth / 2, currentY, { align: 'center' });
                currentY += 6;
                pdf.setFontSize(9);
                pdf.setFont(undefined, 'normal');
                pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} - 45 Quais`, pageWidth / 2, currentY, { align: 'center' });
                currentY += 12;
            }

            // Bandeau de couleur en haut
            pdf.setFillColor(zoneColor.r, zoneColor.g, zoneColor.b);
            pdf.rect(currentX - 2, currentY - 2, qrSize + 4, 8, 'F');

            // Texte de la zone (blanc sur fond coloré)
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(9);
            pdf.setFont(undefined, 'bold');
            pdf.text(`${zone}`, currentX + qrSize / 2, currentY + 3, { align: 'center' });

            // Bordure blanche autour du QR
            pdf.setFillColor(255, 255, 255);
            pdf.rect(currentX - 2, currentY + 6, qrSize + 4, qrSize + 4, 'F');
            
            // Bordure grise fine
            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.5);
            pdf.rect(currentX - 2, currentY - 2, qrSize + 4, qrSize + 18);

            // QR code
            pdf.addImage(qrDataURL, 'PNG', currentX, currentY + 8, qrSize, qrSize);

            // Texte du numéro de quai (noir)
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'bold');
            pdf.text(`Quai ${quai}`, currentX + qrSize / 2, currentY + qrSize + 14, { align: 'center' });

            // Texte "Début de Déchargement" (gris)
            pdf.setTextColor(100, 100, 100);
            pdf.setFontSize(7);
            pdf.setFont(undefined, 'normal');
            pdf.text(`Début de Déchargement`, currentX + qrSize / 2, currentY + qrSize + 18, { align: 'center' });

            currentX += qrSize + spacingX + 4;
            itemCount++;
        }
    }

    const filename = `GXO-Moissy-QR-Codes-Debut-Dechargement-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    
    console.log(`✅ PDF généré: ${filename}`);
    console.log(`📊 ${itemCount} QR codes sur ${pageCount} pages`);
    
    return filename;
}

generateQRCodesPDF().catch(console.error);
