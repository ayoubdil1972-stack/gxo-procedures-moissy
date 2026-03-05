#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur QR Codes - Fin de Déchargement GXO Moissy
Génère 45 QR codes pour la fin de déchargement des quais
Format: https://gxomoissyprocedures.com/scan-fin-dechargement?quai=XX
"""

import qrcode
from PIL import Image, ImageDraw, ImageFont
from datetime import datetime
import os

# Configuration
BASE_URL = "https://gxomoissyprocedures.com/scan-fin-dechargement?quai="
OUTPUT_DIR = "public/static"
OUTPUT_FILENAME = f"GXO-Moissy-QR-Codes-Fin-Dechargement-{datetime.now().strftime('%Y-%m-%d')}.pdf"

# Liste des quais GXO Moissy (45 quais)
QUAIS_ZONES = {
    'A': list(range(1, 11)),      # 1-10
    'B': list(range(32, 39)),     # 32-38
    'C': list(range(45, 50)),     # 45-49
    'D': list(range(60, 63)) + list(range(67, 70)),  # 60-62, 67-69
    'E': list(range(75, 80)) + list(range(81, 88)),  # 75-79, 81-87
    'F': list(range(99, 104)),    # 99-103
}

def create_qr_code_with_label(quai_numero, zone):
    """Crée un QR code avec étiquette pour un quai"""
    # URL du QR code
    url = f"{BASE_URL}{quai_numero}"
    
    # Générer le QR code
    qr = qrcode.QRCode(
        version=3,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    # Créer l'image du QR code
    qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGB')
    
    # Taille du QR code
    qr_width, qr_height = qr_img.size
    
    # Créer une nouvelle image avec espace pour les labels
    label_height = 180  # Espace pour le texte en haut et en bas
    img_width = qr_width + 40  # Marge de 20px de chaque côté
    img_height = qr_height + label_height
    
    # Créer l'image finale avec fond blanc
    final_img = Image.new('RGB', (img_width, img_height), 'white')
    draw = ImageDraw.Draw(final_img)
    
    # Coller le QR code au centre
    qr_x = (img_width - qr_width) // 2
    qr_y = 120  # Laisser de l'espace en haut
    final_img.paste(qr_img, (qr_x, qr_y, qr_x + qr_width, qr_y + qr_height))
    
    # Fonts
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 32)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
        info_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
        small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 14)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        info_font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Titre en haut
    title_text = f"QUAI {quai_numero}"
    title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (img_width - title_width) // 2
    draw.text((title_x, 20), title_text, fill='black', font=title_font)
    
    # Zone
    zone_text = f"Zone {zone}"
    zone_bbox = draw.textbbox((0, 0), zone_text, font=subtitle_font)
    zone_width = zone_bbox[2] - zone_bbox[0]
    zone_x = (img_width - zone_width) // 2
    draw.text((zone_x, 60), zone_text, fill='#666666', font=subtitle_font)
    
    # Type de scan en bas (GROS)
    type_text = "FIN DE DÉCHARGEMENT"
    type_bbox = draw.textbbox((0, 0), type_text, font=title_font)
    type_width = type_bbox[2] - type_bbox[0]
    type_x = (img_width - type_width) // 2
    draw.text((type_x, qr_y + qr_height + 15), type_text, fill='#DC2626', font=title_font)
    
    # Code-barres
    barcode_text = f"D{quai_numero:03d}-FIN"
    barcode_bbox = draw.textbbox((0, 0), barcode_text, font=info_font)
    barcode_width = barcode_bbox[2] - barcode_bbox[0]
    barcode_x = (img_width - barcode_width) // 2
    draw.text((barcode_x, img_height - 35), barcode_text, fill='#374151', font=info_font)
    
    # Date
    date_text = f"Généré le {datetime.now().strftime('%d/%m/%Y')}"
    date_bbox = draw.textbbox((0, 0), date_text, font=small_font)
    date_width = date_bbox[2] - date_bbox[0]
    date_x = (img_width - date_width) // 2
    draw.text((date_x, img_height - 15), date_text, fill='#9CA3AF', font=small_font)
    
    return final_img

def create_pdf():
    """Crée le PDF avec tous les QR codes"""
    print("🚀 Génération des QR codes de fin de déchargement...")
    
    # Liste pour stocker toutes les images
    all_images = []
    
    # Générer les QR codes pour chaque zone
    for zone, quais in QUAIS_ZONES.items():
        print(f"  Zone {zone}: Quais {quais[0]}-{quais[-1]}")
        for quai in quais:
            img = create_qr_code_with_label(quai, zone)
            all_images.append(img)
            print(f"    ✓ Quai {quai} (D{quai:03d}-FIN)")
    
    print(f"\n📄 Création du PDF avec {len(all_images)} QR codes...")
    
    # Créer le répertoire de sortie s'il n'existe pas
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Sauvegarder en PDF
    output_path = os.path.join(OUTPUT_DIR, OUTPUT_FILENAME)
    
    if all_images:
        # Le premier QR code sera la première page
        first_image = all_images[0]
        # Convertir toutes les autres images
        other_images = all_images[1:]
        
        # Sauvegarder en PDF (A4 portrait, 300 DPI)
        first_image.save(
            output_path,
            "PDF",
            resolution=300.0,
            save_all=True,
            append_images=other_images,
            optimize=True
        )
        
        print(f"✅ PDF créé avec succès: {output_path}")
        print(f"📦 Taille du fichier: {os.path.getsize(output_path) / 1024:.1f} KB")
        print(f"📄 Nombre de pages: {len(all_images)}")
        print(f"\n🎯 URL de base: {BASE_URL}XX")
        print(f"📱 Scanner ces QR codes après le déchargement des marchandises")
    else:
        print("❌ Aucun QR code généré")

if __name__ == "__main__":
    create_pdf()
    print("\n✨ Terminé!")
