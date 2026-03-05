#!/usr/bin/env python3
"""
Générateur de PDF QR Codes - GXO Moissy
Génère un PDF avec tous les QR Codes des 45 quais
"""

import qrcode
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from datetime import datetime
import os

# Configuration des quais
QUAIS_CONFIG = {
    'Zone A': list(range(1, 11)),  # 1-10
    'Zone B': list(range(32, 39)),  # 32-38
    'Zone C': list(range(45, 50)),  # 45-49
    'Zone D': [60, 61, 62, 67, 68, 69],
    'Zone E': list(range(75, 80)) + list(range(81, 88)),  # 75-79, 81-87
    'Zone F': list(range(99, 104))  # 99-103
}

ZONE_COLORS = {
    'Zone A': (59/255, 130/255, 246/255),   # Bleu
    'Zone B': (139/255, 92/255, 246/255),   # Violet
    'Zone C': (245/255, 158/255, 11/255),   # Orange
    'Zone D': (20/255, 184/255, 166/255),   # Turquoise
    'Zone E': (236/255, 72/255, 153/255),   # Rose
    'Zone F': (99/255, 102/255, 241/255)    # Indigo
}

BASE_URL = 'https://gxomoissyprocedures.com'

def generate_qr_code(url, size=600):
    """Génère un QR Code et le sauvegarde temporairement"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Sauvegarder temporairement
    temp_path = f'/tmp/qr_temp_{datetime.now().timestamp()}.png'
    img.save(temp_path)
    return temp_path

def generate_pdf():
    """Génère le PDF avec tous les QR Codes"""
    filename = f'GXO-Moissy-QR-Codes-{datetime.now().strftime("%Y-%m-%d")}.pdf'
    output_path = f'/home/user/{filename}'
    
    print(f'🎨 Génération du PDF: {filename}')
    
    # Créer le PDF
    c = canvas.Canvas(output_path, pagesize=A4)
    page_width, page_height = A4
    
    # Dimensions (en mm converties en points)
    qr_width = 80 * mm
    qr_height = 80 * mm
    cols = 2
    margin = 10 * mm
    spacing = 10 * mm
    label_height = 20 * mm
    
    # En-tête première page
    c.setFont('Helvetica-Bold', 18)
    c.drawCentredString(page_width / 2, page_height - 40, 'QR Codes GXO Moissy - Scan Automatique')
    
    c.setFont('Helvetica', 11)
    date_str = datetime.now().strftime('%d/%m/%Y')
    c.drawCentredString(page_width / 2, page_height - 60, f'Généré le {date_str}')
    
    c.setFont('Helvetica', 9)
    c.drawCentredString(page_width / 2, page_height - 75, 
                       '45 QR Codes - Scanner avec votre smartphone pour démarrer le timer automatiquement')
    
    current_y = page_height - 100 * mm
    col = 0
    count = 0
    total_quais = sum(len(quais) for quais in QUAIS_CONFIG.values())
    
    for zone, quais in QUAIS_CONFIG.items():
        for quai_numero in quais:
            # Nouvelle page si nécessaire
            if current_y < margin + qr_height + label_height:
                c.showPage()
                current_y = page_height - margin
                col = 0
            
            x = margin + col * (qr_width + spacing)
            url = f'{BASE_URL}/scan?quai={quai_numero}'
            
            print(f'  📱 Génération QR Code Quai {quai_numero} ({zone})...')
            
            try:
                # Générer le QR Code
                qr_path = generate_qr_code(url)
                
                # Cadre
                c.setStrokeColorRGB(0.86, 0.86, 0.86)
                c.setLineWidth(0.5)
                c.rect(x, current_y, qr_width, qr_height + label_height)
                
                # Barre de couleur de zone
                color = ZONE_COLORS[zone]
                c.setFillColorRGB(*color)
                c.rect(x, current_y + qr_height + label_height - 8*mm, qr_width, 8*mm, fill=1)
                
                # Label zone
                c.setFillColorRGB(1, 1, 1)
                c.setFont('Helvetica-Bold', 10)
                c.drawCentredString(x + qr_width / 2, current_y + qr_height + label_height - 5*mm, zone)
                
                # QR Code
                c.drawImage(qr_path, x + 5*mm, current_y + 10*mm, qr_width - 10*mm, qr_width - 10*mm)
                
                # Supprimer le fichier temporaire
                os.remove(qr_path)
                
                # Label quai
                c.setFillColorRGB(0, 0, 0)
                c.setFont('Helvetica-Bold', 16)
                c.drawCentredString(x + qr_width / 2, current_y + 6*mm, f'Quai {quai_numero}')
                
                # URL
                c.setFont('Helvetica', 7)
                c.drawCentredString(x + qr_width / 2, current_y + 2*mm, url)
                
                # Instructions
                c.setFont('Helvetica', 6)
                c.setFillColorRGB(0.4, 0.4, 0.4)
                c.drawCentredString(x + qr_width / 2, current_y - 2*mm, 'Scanner pour démarrer le timer')
                
                count += 1
                col += 1
                
                if col >= cols:
                    col = 0
                    current_y -= (qr_height + label_height + spacing)
                    
            except Exception as e:
                print(f'❌ Erreur génération QR Code {quai_numero}: {e}')
    
    # Footer (sera ajouté sur la page courante uniquement)
    c.setFont('Helvetica', 8)
    c.setFillColorRGB(0.5, 0.5, 0.5)
    c.drawCentredString(page_width / 2, 15, 
                       f'GXO Moissy - {count} QR Codes Générés - {date_str}')
    
    # Sauvegarder le PDF
    c.save()
    
    print(f'\n✅ PDF généré avec succès!')
    print(f'📍 Emplacement: {output_path}')
    print(f'📊 Total: {count} QR Codes générés')
    
    return output_path

if __name__ == '__main__':
    try:
        pdf_path = generate_pdf()
        print(f'\n🎉 Génération terminée!')
        print(f'📄 Fichier disponible: {pdf_path}')
        print(f'\n💡 Commandes suivantes:')
        print(f'   - Télécharger: Utilisez l\'interface web ou SFTP')
        print(f'   - Imprimer: 300 DPI minimum, A4, couleur')
    except Exception as e:
        print(f'\n❌ Erreur: {e}')
        exit(1)
