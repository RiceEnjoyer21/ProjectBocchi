from django.db import models
from django.contrib.auth.models import User
from groups.models import Group


class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=255)
    event_date = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    purchased_at = models.DateTimeField(auto_now_add=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='tickets')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')

    def __str__(self):
        return f"{self.event_name} - {self.event_date}"


class Merch(models.Model):
    id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length=255)
    item_description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    purchased_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='merch_images/', blank=True, null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='merch')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='merch')

    def __str__(self):
        return self.item_name
