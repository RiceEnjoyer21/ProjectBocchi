from django.urls import path, include

urlpatterns = [
    path('users/', include('users.urls')),  # JWT login here
    path('groups/', include('groups.urls')),
    path('api/', include('api.urls')),
]
