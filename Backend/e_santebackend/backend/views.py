from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from datetime import date

from .models import Disponibilite, Hopital, Paiement, Patient, Praticien, Ticket, Notification
from .serializer import DispoSerializer, HopitalSerializer, ConsulSerializer, PatientSerializer, PraticienSerializer

from .utils.pdf_generator import generate_pdf_base
from datetime import date
from django.core.files.base import ContentFile
from .utils.user_utils import get_praticien_id_from_user

def get_praticien_id_from_user(user_id):
    try:
        return Praticien.objects.get(user_id=user_id).praticien_id
    except Praticien.DoesNotExist:
        return None

def get_patient_id_from_user(user_id):
    try:
        return Patient.objects.get(user_id=user_id).patient_id
    except Patient.DoesNotExist:
        return None

@api_view(['POST'])
def DispoView(request):
    serializer = DispoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": serializer.data,
            "status": status.HTTP_201_CREATED
        })
    else:
        return Response({
            "errors": serializer.errors,
            "status": status.HTTP_400_BAD_REQUEST
        })

@api_view(['GET'])
def GetDispoView(request):
    user_id = request.query_params.get('praticien_id')
    if user_id:
        praticien_id = get_praticien_id_from_user(user_id)
        if praticien_id:
            disponibilites = Disponibilite.objects.filter(praticien_id=praticien_id)
        else:
            disponibilites = Disponibilite.objects.none()
    else:
        disponibilites = Disponibilite.objects.all()
    serializer = DispoSerializer(disponibilites, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def HostoView(request):
    serializer = HopitalSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({ 
            "message": serializer.data,
            "status": status.HTTP_201_CREATED
        }, status=status.HTTP_201_CREATED)  
    else:
        return Response({
            "errors": serializer.errors,
            "status": status.HTTP_400_BAD_REQUEST
        }, status=status.HTTP_400_BAD_REQUEST)  



@api_view(['GET'])
def GetHospView(request):
    hopital = Hopital.objects.all()
    serializer = HopitalSerializer(hopital, many=True)
    return Response(serializer.data)    


@api_view(['POST'])
def ConsultView(request):
    serializer = ConsulSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        Notification.objects.create(
            message="Votre consultation a été enregistrée avec succès.",
            date_notification=date.today(),
            patient = serializer.instance.patient
        )
        qr_data = f"Ticket - {PatientSerializer(instance=serializer.instance.patient).data['nom']} - {serializer.instance.date}"
        pdf_buffer = generate_pdf_base(
            title="Ticket de reservation",
            praticien_info=PraticienSerializer(instance=serializer.instance.disponibilite.praticien).data,
            patient_info=PatientSerializer(instance=serializer.instance.patient).data,
            consultation_info=ConsulSerializer(instance=serializer.instance).data,
            qr_data=qr_data
        )
        pdf_buffer.seek(0)
        pdf_bytes = pdf_buffer.read()                
        filename = f"ticket-{date.today().strftime('%d%m%Y')}-{serializer.instance.consultation_id}.pdf"
        ticket = Ticket(
            date_ticket=date.today(),
            consultation = serializer.instance,
        )
        ticket.url.save(filename, ContentFile(pdf_bytes), save=True)
        ticket.save()
        return JsonResponse({
            "message": serializer.data,
            "ticket": ticket.url.url,
            "notification": "Votre consultation a été enregistrée avec succès.",
            "status": status.HTTP_201_CREATED
        })
    else:
        return Response({
                "errors": serializer.errors,
                "status": status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)




# @api_view(['POST'])
# def TicketGenerateView(request):
#     praticien_info = {
#         "nom": "Dr N'Guessan",
#         "adresse": "123 Rue Santé, 75000 Paris"
#     }

#     patient_info = {
#         "nom": "Pascal",
#         "date": datetime.today().strftime('%d/%m/%Y')
#     }

#     prestation_info = {
#         "description": "Entrée au congrès médical",
#         "montant": "20.00 €"
#     }

#     qr_data = f"Ticket - {patient_info['nom']} - {prestation_info['description']}"

#     pdf_buffer = generate_pdf_base(
#         title="Ticket d'entrée",
#         praticien_info=praticien_info,
#         patient_info=patient_info,
#         prestation_info=prestation_info,
#         qr_data=qr_data
#     )

#     return FileResponse(pdf_buffer, as_attachment=True, filename="ticket.pdf")
