from django.urls import path
from language.views import LanguageGenericAPI 

from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('language', LanguageGenericAPI.as_view()),
    path('language/<int:pk>', LanguageGenericAPI.as_view()),
]

