export function QRCodeGeneratorPage() {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Générateur QR Codes - GXO Moissy</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-8">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8 mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2">
            <i class="fas fa-qrcode mr-3"></i>
            Générateur QR Codes Automatiques
          </h1>
          <p class="text-lg opacity-90">
            QR Codes avec URL pour scan automatique - GXO Moissy
          </p>
          <div class="mt-4 bg-white/20 rounded-lg p-4">
            <p class="text-sm font-semibold mb-2">
              <i class="fas fa-check-circle mr-2"></i>
              Fonctionnalités :
            </p>
            <ul class="text-sm space-y-1">
              <li>✅ Scan avec n'importe quelle app mobile (QRbot, Camera, etc.)</li>
              <li>✅ Démarrage automatique du timer (aucun clic requis)</li>
              <li>✅ URL sécurisée embarquée dans chaque QR Code</li>
              <li>✅ Export PDF prêt à imprimer (300 DPI)</li>
            </ul>
          </div>
        </div>
        <div class="text-right">
          <div class="bg-white/20 rounded-xl px-6 py-4">
            <div class="text-5xl font-bold">45</div>
            <div class="text-sm opacity-75">Quais</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Configuration -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-cog text-blue-500 mr-2"></i>
          Configuration
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">URL de base</label>
            <input 
              type="text" 
              id="base-url" 
              value="https://gxomoissyprocedures.com"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Taille QR Code (px)</label>
            <input 
              type="number" 
              id="qr-size" 
              value="300"
              min="200"
              max="600"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Couleur</label>
            <select 
              id="qr-color" 
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="#000000">Noir (standard)</option>
              <option value="#1E40AF">Bleu foncé</option>
              <option value="#7C3AED">Violet</option>
              <option value="#059669">Vert</option>
            </select>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-info-circle text-green-500 mr-2"></i>
          Format QR Code
        </h3>
        <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
          <p class="text-sm font-mono text-blue-900 break-all" id="example-url">
            https://gxomoissyprocedures.com/scan?quai=75
          </p>
        </div>
        <div class="text-sm text-gray-700 space-y-2">
          <p><strong>Fonctionnement :</strong></p>
          <ol class="list-decimal list-inside space-y-1 text-xs">
            <li>Scanner le QR Code avec n'importe quelle app</li>
            <li>L'app ouvre automatiquement l'URL</li>
            <li>La page détecte le paramètre <code class="bg-gray-200 px-1 rounded">?quai=75</code></li>
            <li>JavaScript démarre automatiquement le timer</li>
            <li>Redirection vers le tableau des quais</li>
          </ol>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-download text-purple-500 mr-2"></i>
          Actions
        </h3>
        <div class="space-y-3">
          <button 
            onclick="generateAllQRCodes()"
            class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center"
          >
            <i class="fas fa-qrcode mr-2"></i>
            Générer tous les QR Codes
          </button>
          <button 
            onclick="downloadPDF()"
            class="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center"
          >
            <i class="fas fa-file-pdf mr-2"></i>
            Télécharger PDF
          </button>
          <button 
            onclick="testScan()"
            class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center"
          >
            <i class="fas fa-play mr-2"></i>
            Tester un scan
          </button>
        </div>
        <div id="status" class="mt-4 text-sm text-center"></div>
      </div>
    </div>

    <!-- Grille des QR Codes -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="font-bold text-gray-800 mb-6 flex items-center justify-between">
        <span>
          <i class="fas fa-th text-blue-500 mr-2"></i>
          QR Codes Générés (45 quais)
        </span>
        <span class="text-sm font-normal text-gray-500" id="qr-count">0/45</span>
      </h3>
      <div id="qr-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <!-- QR Codes will be inserted here -->
      </div>
    </div>
  </div>

  <script>
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
      'Zone A': '#3B82F6',
      'Zone B': '#8B5CF6',
      'Zone C': '#F59E0B',
      'Zone D': '#14B8A6',
      'Zone E': '#EC4899',
      'Zone F': '#6366F1'
    };

    let generatedQRCodes = [];

    // Générer tous les QR Codes
    async function generateAllQRCodes() {
      const baseUrl = document.getElementById('base-url').value;
      const qrSize = parseInt(document.getElementById('qr-size').value);
      const qrColor = document.getElementById('qr-color').value;
      const grid = document.getElementById('qr-grid');
      const status = document.getElementById('status');
      
      status.innerHTML = '<span class="text-blue-600"><i class="fas fa-spinner fa-spin mr-2"></i>Génération en cours...</span>';
      grid.innerHTML = '';
      generatedQRCodes = [];
      
      let count = 0;
      const totalQuais = Object.values(QUAIS_CONFIG).flat().length;
      
      for (const [zone, quais] of Object.entries(QUAIS_CONFIG)) {
        for (const quaiNumero of quais) {
          const url = \`\${baseUrl}/scan?quai=\${quaiNumero}\`;
          const canvas = document.createElement('canvas');
          
          try {
            await QRCode.toCanvas(canvas, url, {
              width: qrSize,
              margin: 2,
              color: {
                dark: qrColor,
                light: '#FFFFFF'
              }
            });
            
            const container = document.createElement('div');
            container.className = 'bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow';
            container.innerHTML = \`
              <div class="text-center mb-2">
                <span class="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  \${zone}
                </span>
              </div>
              <div class="mb-2">
                <div class="w-full" style="background: white; padding: 8px; border-radius: 8px;"></div>
              </div>
              <div class="text-center">
                <p class="font-bold text-lg text-gray-800">Quai \${quaiNumero}</p>
                <p class="text-xs text-gray-500 font-mono break-all mt-1">\${url}</p>
              </div>
            \`;
            
            const canvasContainer = container.querySelector('div > div');
            canvasContainer.appendChild(canvas);
            grid.appendChild(container);
            
            generatedQRCodes.push({
              quai: quaiNumero,
              zone: zone,
              url: url,
              canvas: canvas
            });
            
            count++;
            document.getElementById('qr-count').textContent = \`\${count}/\${totalQuais}\`;
          } catch (error) {
            console.error('Erreur génération QR Code', quaiNumero, error);
          }
        }
      }
      
      status.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-2"></i>45 QR Codes générés avec succès !</span>';
    }

    // Télécharger le PDF
    async function downloadPDF() {
      if (generatedQRCodes.length === 0) {
        alert('⚠️ Veuillez d\\'abord générer les QR Codes');
        return;
      }
      
      const status = document.getElementById('status');
      status.innerHTML = '<span class="text-blue-600"><i class="fas fa-spinner fa-spin mr-2"></i>Création du PDF...</span>';
      
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const qrWidth = 80;
      const qrHeight = 80;
      const cols = 2;
      const margin = 10;
      const spacing = 10;
      const labelHeight = 20;
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text('QR Codes GXO Moissy - Scan Automatique', pageWidth / 2, 15, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const date = new Date().toLocaleDateString('fr-FR');
      pdf.text(\`Généré le \${date}\`, pageWidth / 2, 22, { align: 'center' });
      
      let currentY = 30;
      let col = 0;
      let pageCount = 1;
      
      for (const qr of generatedQRCodes) {
        if (currentY + qrHeight + labelHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
          col = 0;
          pageCount++;
        }
        
        const x = margin + col * (qrWidth + spacing);
        
        // Cadre
        pdf.setDrawColor(200);
        pdf.setLineWidth(0.5);
        pdf.rect(x, currentY, qrWidth, qrHeight + labelHeight);
        
        // Zone colorée
        const zoneColor = ZONE_COLORS[qr.zone];
        const r = parseInt(zoneColor.slice(1, 3), 16);
        const g = parseInt(zoneColor.slice(3, 5), 16);
        const b = parseInt(zoneColor.slice(5, 7), 16);
        pdf.setFillColor(r, g, b);
        pdf.rect(x, currentY, qrWidth, 8, 'F');
        
        // Label zone
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(qr.zone, x + qrWidth / 2, currentY + 5.5, { align: 'center' });
        
        // QR Code
        const imgData = qr.canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', x + 5, currentY + 10, qrWidth - 10, qrWidth - 10);
        
        // Label quai
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(\`Quai \${qr.quai}\`, x + qrWidth / 2, currentY + qrHeight + 5, { align: 'center' });
        
        // URL
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        pdf.text(qr.url, x + qrWidth / 2, currentY + qrHeight + 10, { align: 'center', maxWidth: qrWidth - 4 });
        
        col++;
        if (col >= cols) {
          col = 0;
          currentY += qrHeight + labelHeight + spacing;
        }
      }
      
      // Footer
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128);
        pdf.text(\`Page \${i}/\${totalPages} - GXO Moissy - QR Codes Automatiques\`, pageWidth / 2, pageHeight - 5, { align: 'center' });
      }
      
      const filename = \`GXO-Moissy-QR-Codes-\${new Date().toISOString().split('T')[0]}.pdf\`;
      pdf.save(filename);
      
      status.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-2"></i>PDF téléchargé : ' + filename + '</span>';
    }

    // Tester un scan
    function testScan() {
      const baseUrl = document.getElementById('base-url').value;
      const testUrl = \`\${baseUrl}/scan?quai=75\`;
      window.open(testUrl, '_blank');
    }

    // Générer automatiquement au chargement
    window.addEventListener('load', () => {
      setTimeout(generateAllQRCodes, 500);
    });
    
    // Mise à jour de l'exemple d'URL
    document.getElementById('base-url').addEventListener('input', (e) => {
      document.getElementById('example-url').textContent = \`\${e.target.value}/scan?quai=75\`;
    });
  </script>
</body>
</html>
  `
}
