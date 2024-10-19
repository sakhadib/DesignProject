from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, serializers
from .serializers import UserSerializer, BlogSerializer, CommentSerializer, VoteSerializer
from .serializers import AllBlogShowSerializer, SingleBlogShowSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Blog, Comment, Vote

# Create your views here.

class VoteCreate(generics.CreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        user = self.request.user
        blog = serializer.validated_data['blog']
        
        # Check if the vote already exists
        existing_vote = Vote.objects.filter(author=user, blog=blog).first()
        
        if existing_vote:
            # Update the existing vote
            existing_vote.vote = serializer.validated_data['vote']
            existing_vote.save()
        else:
            # Create a new vote
            serializer.save(author=user)
            
            
class VoteCount(generics.ListCreateAPIView):
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        blog_id = self.kwargs.get('pk')
        return Vote.objects.filter(blog=blog_id)


class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
        
class CommentOfABlogListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        blog_id = self.kwargs.get('pk')
        return Comment.objects.filter(blog=blog_id)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
        
class CommentDelete(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Comment.objects.filter(author=user)
    
    def perform_destroy(self, instance):
        instance.delete()


class BlogListCreate(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    
    # def get_queryset(self):
    #     user = self.request.user
    #     return Blog.objects.filter(author=user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        

class AllBlogShow(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = AllBlogShowSerializer
    permission_classes = [AllowAny]
        

class BlogDelete(generics.DestroyAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Blog.objects.filter(author=user)
    
    def perform_destroy(self, instance):
        instance.delete()
        
        
class SingleBlogView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = SingleBlogShowSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Blog.objects.filter(pk=self.kwargs.get('pk'))
    


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    

