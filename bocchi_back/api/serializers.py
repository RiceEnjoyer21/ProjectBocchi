from rest_framework import serializers
from .models import Ticket, Merch
from groups.models import Group
from django.contrib.auth.models import User

class TicketSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    event_name = serializers.CharField(max_length=255)
    event_date = serializers.DateTimeField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    purchased_at = serializers.DateTimeField()
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())


class MerchSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    item_name = serializers.CharField(max_length=255)
    item_description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    purchased_at = serializers.DateTimeField()
    image = serializers.ImageField()
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
