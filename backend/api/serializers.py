from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Blog, Comment, Vote

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ["id", "title", "content", "author", "category", "created_at", "updated_at"]
        extra_kwargs = {"author": {"read_only": True}}
        
    def create(self, validated_data):
        blog = Blog.objects.create(**validated_data)
        return blog
        
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "blog", "content", "author", "created_at", "updated_at"]
        extra_kwargs = {"author": {"read_only": True}}
        
    def create(self, validated_data):
        comment = Comment.objects.create(**validated_data)
        return comment
    
    
class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ["id", "blog", "author", "vote"]
        extra_kwargs = {"author": {"read_only": True}}
        
    def create(self, validated_data):
        vote = Vote.objects.create(**validated_data)
        return vote