from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    dependencies = [
        ('backend', '0010_patient_datenaissance_patient_email_patient_photo_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='praticien',
            name='hopital',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to='backend.hopital'
            ),
        ),
    ] 