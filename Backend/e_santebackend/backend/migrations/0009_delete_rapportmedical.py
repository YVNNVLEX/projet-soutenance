# Generated by Django 5.2 on 2025-04-18 09:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_rename_customuser_praticien_user_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RapportMedical',
        ),
    ]
