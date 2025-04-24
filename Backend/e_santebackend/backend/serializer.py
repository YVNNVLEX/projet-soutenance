from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers
from .models import CustomUser, Patient, Praticien, Hopital, Consultation, Ticket, Disponibilite, Paiement
import uuid

class UserCreateSerializer(BaseUserCreateSerializer):
    dateNaissance = serializers.DateField(required=False, format="%d/%m/%Y")
    hopital = serializers.PrimaryKeyRelatedField(queryset=Hopital.objects.all(), required=False)
    specialite = serializers.CharField(required=False)

    class Meta(BaseUserCreateSerializer.Meta):
        model = CustomUser
        fields = (
            'id', 'email', 'password', 'username', 'nom', 'prenom',
            'tel', 'type', 'photo', 'dateNaissance', 'sexe', 'hopital', 'specialite'
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "photo": {"required": False},
        }

    def create(self, validated_data):
        
        hopital = validated_data.pop("hopital", None)

        user = super().create(validated_data)
        
        nom = validated_data.pop("nom", "")
        prenom = validated_data.pop("prenom", "")
        tel = validated_data.pop("tel", "")
        type_user = validated_data.pop("type", "")
        photo = validated_data.pop("photo", None)
        date_naissance = validated_data.pop("dateNaissance", None)
        sexe = validated_data.pop("sexe", "")
        specialite = validated_data.pop("specialite", "")

        # Création de l'utilisateur

        # Ajout des champs personnalisés
        user.nom = nom
        user.prenom = prenom
        user.tel = tel
        user.type = type_user
        user.dateNaissance = date_naissance
        user.sexe = sexe
        if photo:
            user.photo = photo
            
        if hopital:
            user.hopital = hopital
            
        user.specialite = specialite
        
        user.save()


        if type_user == "patient":
            Patient.objects.create(
                user=user,
                patient_id= f"PAT-{str(uuid.uuid4())}",
                nom=nom,
                prenom=prenom
            )
        elif type_user == "praticien":
            Praticien.objects.create(
                user=user,
                praticien_id=f"MED-{str(uuid.uuid4())}",
                nom=nom,
                prenom=prenom,
                specialite=specialite,
                hopital_id=user.hopital_id
            )

        return user


class PraticienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Praticien
        fields = "__all__"
        
        
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"


class DispoSerializer(serializers.ModelSerializer):
    praticien = PraticienSerializer(read_only=True)
    praticien_id = serializers.PrimaryKeyRelatedField(
        queryset=Praticien.objects.all(), write_only=True, source='praticien'
    )
    class Meta:
        model = Disponibilite
        fields = "__all__"
        
        
class HopitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hopital
        fields = "__all__"
        

class ConsulSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        input_formats=['%d-%m-%Y', '%d/%m/%Y', '%Y-%m-%d'],
        required=True
    )
    patient = PatientSerializer(read_only=True) 
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all(), 
        source="patient", 
        write_only=True  
    )
    Disponibilite = DispoSerializer(read_only=True)

    class Meta:
        model = Consultation
        fields = "__all__"
