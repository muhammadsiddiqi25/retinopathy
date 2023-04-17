from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
# from rest_framework_simplejwt.views import TokenVerifyView
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/jwt/create/', include('djoser.urls.jwt')),
    path('auth/jwt/create/', include('djoser.urls.jwt')),
    path('image/',views.uploadImage.as_view(), name = 'image_upload'),
    path('prediction/',views.prediction, name = 'prediction'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)