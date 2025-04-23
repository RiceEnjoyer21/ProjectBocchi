from django.db import models

class Group(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='group_images/', blank=True, null=True)

    def __str__(self):
        return self.name

