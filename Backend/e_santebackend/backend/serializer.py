from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers
from .models import CustomUser, Patient, Praticien
import uuid

class UserCreateSerializer(BaseUserCreateSerializer):
    dateNaissance = serializers.DateField(source="date", required=False)

    class Meta(BaseUserCreateSerializer.Meta):
        model = CustomUser
        fields = (
            'id', 'email', 'password','username', 'nom', 'prenom',
            'tel', 'type', 'photo', 'dateNaissance'
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "photo": {"required": False},
        }

    def create(self, validated_data):
        # Champs custom extraits
        nom = validated_data.pop("nom", "")
        prenom = validated_data.pop("prenom", "")
        tel = validated_data.pop("tel", "")
        type_user = validated_data.pop("type", "")
        photo = validated_data.pop("photo", None)
        date_naissance = validated_data.pop("dateNaissance", None)  # grâce à source='date'

        # Création utilisateur de base
        user = super().create(validated_data)

        # Ajout des champs custom
        user.nom = nom
        user.prenom = prenom
        user.tel = tel
        user.type = type_user
        user.date = date_naissance
        if photo:
            user.photo = photo
        user.save()

        # Création des profils
        if type_user == "patient":
            Patient.objects.create(user=user, patient_id=str(uuid.uuid4()))
        elif type_user == "praticien":
            Praticien.objects.create(user=user, praticien_id=str(uuid.uuid4()))

        return user
