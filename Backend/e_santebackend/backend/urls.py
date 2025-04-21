from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from .views import DispoView, GetDispoView, HostoView, TicketGenerateView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('disponibilite/create/', view=DispoView),
    path('disponibilite/list/', view=GetDispoView),
    path('hopital/create/', view=HostoView),
    path('ticket/generate/', view=TicketGenerateView)
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
