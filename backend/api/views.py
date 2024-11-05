from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, BlogSerializer, CommentSerializer, VoteSerializer, voteBackSerializer
from .serializers import AllBlogShowSerializer, SingleBlogShowSerializer, ProblemSerializer
from .serializers import AllProblemShowSerializer, SingleProblemShowSerializer, getCurrentUserSerializer
from .serializers import CreateContestSerializer, ContestProblemSerializer, AllCategoryShowSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from .models import Blog, Comment, Vote, Problem, Contest, ContestProblem

# Create your views here.

# * ADMIN USER
class AllContestShow(generics.ListAPIView):
    queryset = Contest.objects.all().order_by('-start_date')
    serializer_class = CreateContestSerializer
    permission_classes = [IsAdminUser]
    
    def get_queryset(self):
        return Contest.objects.all()






# * ADMIN USER
class AddProblemToContest(generics.CreateAPIView):
    queryset = ContestProblem.objects.all()
    serializer_class = ContestProblemSerializer
    permission_classes = [IsAdminUser]
    
    def perform_create(self, serializer):
        serializer.save() 
    





# * ADMIN USER
class CreateContest(generics.CreateAPIView):
    queryset = Contest.objects.all()
    serializer_class = CreateContestSerializer
    permission_classes = [IsAdminUser]
    
    def perform_create(self, serializer):
        serializer.save()




# * ADMIN USER
class AllProblemShowAdmin(generics.ListAPIView):
    queryset = Problem.objects.all()
    serializer_class = AllProblemShowSerializer
    permission_classes = [IsAdminUser]
    
    def get_queryset(self):
        return Problem.objects.all()





# * ADMIN USER
class ApproveProblem(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        try:
            # Retrieve the problem by primary key (ID)
            problem = Problem.objects.get(pk=pk)
        except Problem.DoesNotExist:
            return Response({"error": "Problem not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Set `is_approved` to True
        problem.is_approved = True
        problem.save()
        
        return Response({"status": "Problem approved successfully"}, status=status.HTTP_200_OK)





# * Any USER
class SingleProblemShow(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SingleProblemShowSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        p = Problem.objects.filter(pk=self.kwargs.get('pk'))
        if p[0].is_approved:
            return p
        else:
            return Problem.objects.none()
        # return Problem.objects.filter(pk=self.kwargs.get('pk'))




# * Any USER
class AllProblemShow(generics.ListAPIView):
    # queryset = Problem.objects.all()
    serializer_class = AllProblemShowSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Problem.objects.filter(is_approved=True)






# * Authorised USER
class ProblemCreate(generics.CreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)





# * Authorised USER
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
            
            
            


# * Authorised USER         
class VoteCount(generics.ListCreateAPIView):
    serializer_class = voteBackSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        blog_id = self.kwargs.get('pk')
        return Vote.objects.filter(blog=blog_id)





# * Authorised USER
class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        




# * Authorised USER      
class CommentOfABlogListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        blog_id = self.kwargs.get('pk')
        return Comment.objects.filter(blog=blog_id)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        




# * Authorised USER       
class CommentDelete(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Comment.objects.filter(author=user)
    
    def perform_destroy(self, instance):
        instance.delete()



# * Authorised USER
class BlogListCreate(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    
    # def get_queryset(self):
    #     user = self.request.user
    #     return Blog.objects.filter(author=user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        



# * Any USER
class AllBlogShow(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = AllBlogShowSerializer
    permission_classes = [AllowAny]
        



# * Authorised USER
class BlogDelete(generics.DestroyAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Blog.objects.filter(author=user)
    
    def perform_destroy(self, instance):
        instance.delete()
        



# * Any USER     
class SingleBlogView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = SingleBlogShowSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Blog.objects.filter(pk=self.kwargs.get('pk'))
    



# * Any USER
class AllCategoryShow(generics.ListAPIView):
    serializer_class = AllCategoryShowSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Blog.objects.values('category').distinct()





# * Any USER
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    



# * Authorised USER
class CurrentUser(generics.ListAPIView):
    serializer_class = getCurrentUserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(username=user)


