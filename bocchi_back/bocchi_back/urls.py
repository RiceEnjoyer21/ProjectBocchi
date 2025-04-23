from django.urls import path, include

urlpatterns = [
    path('api/auth/', include('users.urls')),  # JWT login here
    path('api/groups/', include('groups.urls')),
    path('api/merch/', include('api.urls')),
]
