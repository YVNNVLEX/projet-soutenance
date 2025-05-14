from ..models import Praticien, Patient

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