from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from .views import DispoView, GetDispoView, HostoView, GetHospView, ConsultView, DispoDeleteView, GetConsultView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('disponibilite/delete/<int:id>/', view=DispoDeleteView),
    path('disponibilite/create/', view=DispoView),
    path('disponibilite/list/', view=GetDispoView),
    path('hopital/create/', view=HostoView),
    path('hopital/list/', view=GetHospView),
    # path('ticket/generate/', view=TicketGenerateView),
    path('consultation/create/', view=ConsultView),
    path('consultation/list/', view=GetConsultView),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
