from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Blog, Comment, Vote, Problem, Contest, ContestProblem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True},
                        "email": {"required": True}}
        
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    





class getCurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
        extra_kwargs = {"id": {"read_only": True}}
        


    
    


# NOTE This serializer is used to create a comment for a blog

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "blog", "content", "author", "created_at", "updated_at"]
        extra_kwargs = {"author": {"read_only": True}}
        
    def create(self, validated_data):
        comment = Comment.objects.create(**validated_data)
        return comment
    
    
    
    
    
    
    
# NOTE This serializer is used to show comments for a blog

class CommentShowSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    
    class Meta:
        model = Comment
        fields = ["id", "content", "author", "created_at", "updated_at"]
    
    
    

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
        
        
        
        
        
        
        
# NOTE This serializer is used to show a single blog in the frontend
        
class SingleBlogShowSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    
    comment_count = serializers.SerializerMethodField()
    upvote_count = serializers.SerializerMethodField()
    downvote_count = serializers.SerializerMethodField()
    
    comments = CommentShowSerializer(many=True, read_only=True)
    
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
                    "comments",
                    "created_at", 
                    "updated_at",  
                    "content"]
        

        



class AllCategoryShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ["category"]




    
    
class VoteSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())

    class Meta:
        model = Vote
        fields = ["id", "blog", "author", "vote"]
        extra_kwargs = {"blog": {"required": True},
                        "vote": {"required": True}}
        
    def create(self, validated_data):
        vote = Vote.objects.create(**validated_data)
        return vote
    




class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ["id", "title", "description", "author", "category", "answer", "is_approved", "created_at", "updated_at"]
        extra_kwargs = {
            "author": {"read_only": True},
            "is_approved": {"read_only": True},  # Make is_approved read-only
            "description": {"required": True},
            "category": {"required": True},
            "answer": {"required": True}
        }
        
    def create(self, validated_data):
        problem = Problem.objects.create(**validated_data)
        return problem





class AllProblemShowSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField() 
    class Meta:
        model = Problem
        fields = ["id", "title", "author", "category", "created_at", "updated_at"]
        
        

class SingleProblemShowSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField() 
    class Meta:
        model = Problem
        fields = ["id", "title", "author", "description", "category", "created_at", "updated_at"]
        
        
        
class CreateContestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = ["id", "title", "description", "start_date", "end_date"]
        extra_kwargs = {
            "start_date": {"required": True},
            "end_date": {"required": True},
            "title": {"required": True},
            "description": {"required": True}
        }
        
    def create(self, validated_data):
        contest = Contest.objects.create(**validated_data)
        return contest
    
    
    

class ContestProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestProblem
        fields = ["id", "contest", "problem", "points"]
        extra_kwargs = {
            "contest": {"required": True},
            "problem": {"required": True},
            "points": {"required": True}
        }
        
    def create(self, validated_data):
        contest_problem = ContestProblem.objects.create(**validated_data)
        return contest_problem