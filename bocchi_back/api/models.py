from django.db import models

class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=255)
    event_date = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    purchased_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.event_name} - {self.event_date}"    
    
class Merch(models.Model):
    id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length=255)
    item_description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    purchased_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='merch_images/', blank=True, null=True)


    def __str__(self):
        return self.item_name   

