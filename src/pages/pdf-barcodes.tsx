// Page de génération de PDF des codes-barres GXO Moissy

export function PDFBarcodesPage() {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codes-Barres GXO Moissy - Génération PDF</title>
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            border-radius: 8px;
            cursor: pointer;
            margin: 10px;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .status {
            margin-top: 20px;
            padding: 15px;
            background: #f0f0f0;
            border-radius: 8px;
            display: none;
        }
        .status.show {
            display: block;
        }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        .info { background: #d1ecf1; color: #0c5460; }
        #barcodes-container {
            display: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏭 Codes-Barres GXO Moissy</h1>
        <p>Génération automatique de PDF avec 45 codes-barres</p>
    </div>

    <div style="text-align: center;">
        <button class="btn" onclick="generatePDF()">📥 Télécharger PDF</button>
    </div>

    <div id="status" class="status"></div>

    <div id="barcodes-container"></div>

    <script>
        const QUAIS_CONFIG = {
            'Zone A': Array.from({length: 10}, (_, i) => i + 1),
            'Zone B': Array.from({length: 7}, (_, i) => i + 32),
            'Zone C': Array.from({length: 5}, (_, i) => i + 45),
            'Zone D': [60, 61, 62, 67, 68, 69],
            'Zone E': [75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87],
            'Zone F': Array.from({length: 5}, (_, i) => i + 99)
        };

        const ZONE_COLORS = {
            'Zone A': '#FF6B6B',
            'Zone B': '#4ECDC4',
            'Zone C': '#45B7D1',
            'Zone D': '#FFA07A',
            'Zone E': '#98D8C8',
            'Zone F': '#F7DC6F'
        };

        function showStatus(message, type = 'info') {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = \`status show \${type}\`;
        }

        async function generatePDF() {
            showStatus('🔄 Génération du PDF en cours...', 'info');

            try {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pageWidth = 210;
                const pageHeight = 297;
                const margin = 15;
                const barcodeWidth = 80;
                const barcodeHeight = 30;
                const cols = 2;
                const rowsPerPage = 8;
                
                let currentX = margin;
                let currentY = margin;
                let itemCount = 0;
                let pageCount = 1;

                // Titre de la première page
                pdf.setFontSize(16);
                pdf.setFont(undefined, 'bold');
                pdf.text('Codes-Barres GXO Moissy - 45 Quais', pageWidth / 2, currentY, { align: 'center' });
                currentY += 10;
                pdf.setFontSize(10);
                pdf.setFont(undefined, 'normal');
                pdf.text(\`Généré le \${new Date().toLocaleDateString('fr-FR')}\`, pageWidth / 2, currentY, { align: 'center' });
                currentY += 10;

                // Génération de tous les codes-barres
                for (const [zone, quais] of Object.entries(QUAIS_CONFIG)) {
                    for (const quai of quais) {
                        const barcode = \`D\${String(quai).padStart(3, '0')}\`;
                        
                        // Créer un canvas temporaire pour le code-barres
                        const canvas = document.createElement('canvas');
                        JsBarcode(canvas, barcode, {
                            format: 'CODE128',
                            width: 2,
                            height: 80,
                            displayValue: true,
                            fontSize: 16,
                            margin: 10
                        });

                        // Convertir en image
                        const imgData = canvas.toDataURL('image/png');

                        // Vérifier si on doit changer de ligne ou de page
                        if (itemCount > 0 && itemCount % cols === 0) {
                            currentX = margin;
                            currentY += barcodeHeight + 15;
                        }

                        if (itemCount > 0 && itemCount % (cols * rowsPerPage) === 0) {
                            pdf.addPage();
                            pageCount++;
                            currentY = margin;
                            currentX = margin;
                        }

                        // Ajouter le code-barres au PDF
                        pdf.setFillColor(ZONE_COLORS[zone]);
                        pdf.rect(currentX - 2, currentY - 2, barcodeWidth + 4, barcodeHeight + 14, 'F');
                        
                        pdf.setTextColor(0, 0, 0);
                        pdf.setFontSize(10);
                        pdf.setFont(undefined, 'bold');
                        pdf.text(\`\${zone} - Quai \${quai}\`, currentX + barcodeWidth / 2, currentY + 3, { align: 'center' });
                        
                        pdf.addImage(imgData, 'PNG', currentX, currentY + 5, barcodeWidth, barcodeHeight - 5);

                        currentX += barcodeWidth + 10;
                        itemCount++;
                    }
                }

                // Sauvegarder le PDF
                const filename = \`GXO-Moissy-Codes-Barres-\${new Date().toISOString().split('T')[0]}.pdf\`;
                pdf.save(filename);

                showStatus(\`✅ PDF généré avec succès ! \${itemCount} codes-barres sur \${pageCount} pages. Fichier: \${filename}\`, 'success');

            } catch (error) {
                console.error('Erreur génération PDF:', error);
                showStatus(\`❌ Erreur lors de la génération du PDF: \${error.message}\`, 'error');
            }
        }

        // Auto-génération au chargement (optionnel)
        window.addEventListener('load', () => {
            showStatus('✨ Prêt à générer le PDF avec 45 codes-barres', 'success');
        });
    </script>
</body>
</html>`
}
