from django.db import models
from django.contrib.auth.models import User
from groups.models import Group

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    favorite_groups = models.ManyToManyField(Group, blank=True, related_name='fans')
    
    def __str__(self):
        return f"{self.user.username}'s profile"