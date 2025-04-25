from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    RegisterSerializer, UserSerializer, UserProfileSerializer, UserUpdateSerializer
)
from .models import UserProfile
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import update_session_auth_hash
from rest_framework.parsers import MultiPartParser, FormParser


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def put(self, request, *args, **kwargs):
        serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserSerializer(request.user).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestProtectedView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        return Response({"message": f"Hello {request.user.username}, you are authenticated!"})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_basic_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_profile_detail(request):
    profile = request.user.profile
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_profile_image(request):
    if 'avatar' not in request.FILES:
        return Response({'detail': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    profile = request.user.profile
    profile.avatar = request.FILES['avatar']
    profile.save()
    
    return Response({'detail': 'Profile image updated successfully'})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    if 'old_password' not in request.data or 'new_password' not in request.data:
        return Response({'detail': 'Both old and new passwords are required'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    user = request.user
    if not user.check_password(request.data['old_password']):
        return Response({'detail': 'Old password is incorrect'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    user.set_password(request.data['new_password'])
    user.save()
    update_session_auth_hash(request, user) 
    
    return Response({'detail': 'Password changed successfully'})