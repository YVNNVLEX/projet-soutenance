from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers
from .models import CustomUser, Patient, Praticien, Hopital, Consultation, Ticket, Disponibilite, Paiement
import uuid
from .utils.user_utils import get_praticien_id_from_user
from datetime import datetime

class UserCreateSerializer(BaseUserCreateSerializer):
    dateNaissance = serializers.DateField(required=False, format="%d/%m/%Y",input_formats=["%d/%m/%Y", "%Y-%m-%d"])
    
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
        hopital = validated_data.get("hopital", None)
        nom = validated_data.get("nom", "")
        prenom = validated_data.get("prenom", "")
        tel = validated_data.get("tel", "")
        type_user = validated_data.get("type", "")
        photo = validated_data.get("photo", None)
        date_naissance = validated_data.get("dateNaissance", None)
        sexe = validated_data.get("sexe", "")
        specialite = validated_data.get("specialite", "")
        email = validated_data.get("email", "")

        
        user = super().create(validated_data)

        # Mise à jour des attributs supplémentaires
        user.nom = nom
        user.prenom = prenom
        user.tel = tel
        user.type = type_user
        user.dateNaissance = date_naissance
        user.sexe = sexe
        user.specialite = specialite
        if photo:
            user.photo = photo
        if hopital:
            user.hopital = hopital
        user.save()

        # Création du profil secondaire
        if type_user == "patient":
            Patient.objects.create(
                user=user,
                patient_id=f"PAT-{uuid.uuid4()}",
                nom=nom,
                prenom=prenom,
                sexe=sexe,
                dateNaissance=date_naissance,
                tel=tel,
                photo=photo,
                email=email,
            )
        elif type_user == "praticien":
            Praticien.objects.create(
                user=user,
                praticien_id=f"MED-{uuid.uuid4()}",
                nom=nom,
                prenom=prenom,
                specialite=specialite,
                dateNaissance=date_naissance,
                tel=tel,
                email=email,
                hopital_id=user.hopital_id
            )

        return user




class PraticienSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    class Meta:
        model = Praticien
        fields = "__all__"
        
        
class PatientSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
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

    def to_internal_value(self, data):
        praticien_id = data.get('praticien_id')
        if praticien_id and isinstance(praticien_id, int):
            vrai_id = get_praticien_id_from_user(praticien_id)
            if vrai_id:
                data['praticien_id'] = vrai_id
        return super().to_internal_value(data)
        
        
class HopitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hopital
        fields = "__all__"
        

class ConsulSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        input_formats=['%d-%m-%Y', '%d/%m/%Y', '%Y-%m-%d'],
        required=False,
        read_only=True
    )
    heure = serializers.TimeField(
        required=False,
        read_only=True
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

    def create(self, validated_data):
        date = datetime.now().date()
        heure = datetime.now().time()
        validated_data['date'] = date
        validated_data['heure'] = heure
        return super().create(validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.date:
            representation['date'] = instance.date.strftime("%d-%m-%Y")
        if instance.heure:
            representation['heure'] = instance.heure.strftime("%H:%M")
        return representation
