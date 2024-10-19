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
    
    
    
    
    
# NOTE This serializer is used to show all the blogs in the frontend

class AllBlogShowSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    
    comment_count = serializers.SerializerMethodField()
    upvote_count = serializers.SerializerMethodField()
    downvote_count = serializers.SerializerMethodField()
    
    def get_comment_count(self, obj):
        return obj.comments.count()
    
    def get_upvote_count(self, obj):
        return obj.upvotes.filter(vote=True).count()
    
    def get_downvote_count(self, obj):
        return obj.upvotes.filter(vote=False).count()
    
    class Meta:
        model = Blog
        fields =   ["id", 
                    "title", 
                    "author", 
                    "category",
                    "comment_count", 
                    "upvote_count", 
                    "downvote_count",
                    "created_at", 
                    "updated_at",  
                    "content"]
        
        
        
        
        

        
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