# Generated by Django 5.1.4 on 2025-04-24 11:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_rename_hopital_id_customuser_hopital'),
    ]

    operations = [
        migrations.RenameField(
            model_name='consultation',
            old_name='date_consultation',
            new_name='date',
        ),
        migrations.RemoveField(
            model_name='consultation',
            name='praticien',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='patient',
        ),
        migrations.AddField(
            model_name='consultation',
            name='disponibilite',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='backend.disponibilite'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='consultation',
            name='heure',
            field=models.TimeField(default='09:00'),
            preserve_default=False,
        ),
    ]
