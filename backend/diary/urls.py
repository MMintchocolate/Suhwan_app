from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views 

urlpatterns = [
    path('', views.diary_list, name='diary-list'),
    
    path('<int:pk>/', views.diary_detail, name='diary-detail'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)