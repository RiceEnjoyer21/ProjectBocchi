from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView,
    MyProfileView,
    TestProtectedView,
    user_basic_info,
    user_profile_detail,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MyProfileView.as_view(), name='my_profile'),
    path('test/', TestProtectedView.as_view(), name='protected_test'),
    path('info/', user_basic_info, name='user_info'),
    path('profile/', user_profile_detail, name='user_profile_detail'),
]