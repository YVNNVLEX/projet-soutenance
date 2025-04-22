from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse

from .models import Disponibilite, Hopital, Paiement, Patient, Praticien, Ticket, Notification
from .serializer import DispoSerializer, HopitalSerializer, ConsulSerializer, PatientSerializer, PraticienSerializer

from .utils.pdf_generator import generate_pdf_base
from datetime import datetime


@api_view(['POST'])
def DispoView(request):
    serializer = DispoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": serializer.data,
            "status": status.HTTP_201_CREATED
        })

@api_view(['GET'])
def GetDispoView(request):
    disponibilites = Disponibilite.objects.all()
    serializer = DispoSerializer(disponibilites, many=True)
    return Response(serializer.data)


@api_view(['POST', 'GET'])
def HostoView(request):
    serializer = HopitalSerializer(data=request.data)
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

@api_view(['POST'])
def ConsultView(request):
    serializer = HopitalSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": serializer.data,
            "status": status.HTTP_201_CREATED
        })


@api_view(['POST'])
def TicketGenerateView(request):
    praticien_info = {
        "nom": "Dr N'Guessan",
        "adresse": "123 Rue Santé, 75000 Paris"
    }

    patient_info = {
        "nom": "Pascal",
        "date": datetime.today().strftime('%d/%m/%Y')
    }

    prestation_info = {
        "description": "Entrée au congrès médical",
        "montant": "20.00 €"
    }

    qr_data = f"Ticket - {patient_info['nom']} - {prestation_info['description']}"

    pdf_buffer = generate_pdf_base(
        title="Ticket d'entrée",
        praticien_info=praticien_info,
        patient_info=patient_info,
        prestation_info=prestation_info,
        qr_data=qr_data
    )

    return FileResponse(pdf_buffer, as_attachment=True, filename="ticket.pdf")