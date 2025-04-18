# Generated by Django 5.2 on 2025-04-17 11:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_consultation_disponibilite_hopital_notification_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rapportmedical',
            name='consultation',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='consultation',
        ),
        migrations.RemoveField(
            model_name='disponibilite',
            name='praticien',
        ),
        migrations.RemoveField(
            model_name='hopital',
            name='praticien',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='patient',
        ),
        migrations.RemoveField(
            model_name='paiement',
            name='patient',
        ),
        migrations.RemoveField(
            model_name='rapportmedical',
            name='patient',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='patient',
        ),
        migrations.DeleteModel(
            name='Consultation',
        ),
        migrations.DeleteModel(
            name='Disponibilite',
        ),
        migrations.DeleteModel(
            name='Hopital',
        ),
        migrations.DeleteModel(
            name='Notification',
        ),
        migrations.DeleteModel(
            name='Paiement',
        ),
        migrations.DeleteModel(
            name='RapportMedical',
        ),
        migrations.DeleteModel(
            name='Ticket',
        ),
    ]
