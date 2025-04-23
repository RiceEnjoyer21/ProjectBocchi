from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from groups.models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']

class UserProfileSerializer(serializers.ModelSerializer):
    favorite_groups = GroupSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['bio', 'avatar', 'favorite_groups']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']