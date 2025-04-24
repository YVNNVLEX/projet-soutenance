import io
import os
import qrcode
from django.conf import settings
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.utils import ImageReader

def generate_pdf_base(title, praticien_info, patient_info, consultation_info, qr_data):
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    # Génération du QR Code
    qr = qrcode.make(qr_data)
    qr_io = io.BytesIO()
    qr.save(qr_io, format='PNG')
    qr_io.seek(0)
    qr_img = ImageReader(qr_io)

    # Logo (à personnaliser)
    logo_path = os.path.join(settings.BASE_DIR, 'static', 'image', 'discord.png')
    if os.path.exists(logo_path):
        p.drawImage(logo_path, x= (width - 8*cm)/2, y=height - 2*cm , width=8*cm, height=1*cm, preserveAspectRatio=True, anchor='c', mask='auto')

    # En-tête
    p.setFont("Helvetica-Bold", 16)
    p.drawCentredString(width - 10*cm, height - 3*cm, title.upper())

    # Infos praticien
    p.setFont("Helvetica", 10)
    p.drawString(1.5*cm, height - 5*cm, praticien_info["nom"])

    # Infos patient & date
    p.drawString(11*cm, height - 5*cm, f"Patient : {patient_info['nom']} {patient_info['prenom']}")
    p.drawString(11*cm, height - 5.5*cm, f"Date : {consultation_info['date']} à {consultation_info['heure']}")

    # Prestation
    # p.setFont("Helvetica-Bold", 12)
    # p.drawString(1.5*cm, height - 8*cm, "Détails de la prestation :")
    # p.setFont("Helvetica", 11)
    # p.drawString(1.5*cm, height - 9*cm, consultation_info["description"])

    # QR Code
    p.drawImage(qr_img, x=width - 6*cm, y=3*cm, width=4.5*cm, height=4.5*cm)

    # Pied de page
    p.setFont("Helvetica-Oblique", 9)
    p.drawString(1.5*cm, 2*cm, "Merci pour votre consultation.")

    p.showPage()
    p.save()
    buffer.seek(0)

    return buffer
