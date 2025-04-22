from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, email, tel, password=None, **extra_fields):
        if not email:
            raise ValueError("L'email est requis.")
        if not tel:
            raise ValueError("Le téléphone est requis.")
        email = self.normalize_email(email)
        user = self.model(email=email, tel=tel, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, tel, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Le superutilisateur doit avoir is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Le superutilisateur doit avoir is_superuser=True.')

        return self.create_user(email=email, tel=tel, password=password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = None  # Retire le champ "username"

    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=100)
    dateNaissance = models.DateField(null=True, blank=True)
    photo = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    email = models.EmailField(unique=True)
    tel = models.CharField(max_length=10, unique=True)

    USER_TYPE_CHOICES = (
        ('patient', 'Patient'),
        ('praticien', 'Praticien'),
        ('admin', 'Administrateur'),
    )
    
    USER_SEXE_CHOICES = (
        ('m', 'M'),
        ('f', 'F')
    )
    
    type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    sexe = models.CharField(max_length=1, choices=USER_SEXE_CHOICES)

    # Champs nécessaires pour gérer les droits
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['tel']
    
    objects = CustomUserManager()

    def __str__(self):
        return f"{self.email or self.tel} ({self.type})"
    

class Patient(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='patient_profile')
    patient_id = models.CharField(max_length=50, primary_key=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    
    

class Hopital(models.Model):
    hopital_id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100)
    localisation = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    commune = models.CharField(max_length=255)
    ville = models.CharField(max_length=255)

    def __str__(self):
        return self.nom

class Praticien(models.Model):
    
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='praticien_profile')
    praticien_id = models.CharField(max_length=50, primary_key=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    specialite = models.CharField(max_length=255)
    hopital_id = models.ForeignKey(Hopital, on_delete= models.CASCADE)


class Consultation(models.Model):
    consultation_id = models.AutoField(primary_key=True)
    date_consultation = models.DateField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    praticien = models.ForeignKey(Praticien, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Consultation {self.consultation_id} - {self.date_consultation}"

class Disponibilite(models.Model):
    disponibilite_id = models.AutoField(primary_key=True)
    date_disponibilite = models.DateField()
    heure_debut = models.TimeField()
    heure_fin = models.TimeField()
    praticien = models.ForeignKey(Praticien, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.praticien} - {self.date_disponibilite}"

class Paiement(models.Model):
    paiement_id = models.AutoField(primary_key=True)
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    date_paiement = models.DateField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.patient} - {self.montant}"

class Ticket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    date_ticket = models.DateField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)

    def __str__(self):
        return f"Ticket {self.ticket_id} - {self.date_ticket}"

class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    message = models.TextField()
    date_notification = models.DateField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return f"Notification {self.notification_id} pour {self.patient}"