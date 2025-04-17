from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
