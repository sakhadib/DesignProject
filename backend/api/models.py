from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blogs")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

class Tag(models.Model):
    name = models.CharField(max_length=100)
    blogs = models.ManyToManyField(Blog, related_name="tags")

    def __str__(self):
        return self.name
    
    
    
    
    
    
# avb <- user