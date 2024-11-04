from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blogs")
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class Vote(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="upvotes")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="upvotes")
    vote = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.author} upvoted {self.blog}"
    


class Problem(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="problems")
    category = models.CharField(max_length=100)
    is_approved = models.BooleanField(default=False)
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    


class Contest(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    
    
    
    
class ContestProblem(models.Model):
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE, related_name="problems")
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name="contests")
    points = models.IntegerField(default=20)
    
    def __str__(self):
        return f"{self.problem} in {self.contest}"
    
    