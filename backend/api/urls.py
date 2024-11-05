from django.urls import path
from . import views



urlpatterns = [
    # Creating A Blog
    path('blog/', views.BlogListCreate.as_view(), name="blog_list_create"),                                # ! POST
    
    # Viewing All Blog Categories
    path('blog/categories/', views.AllCategoryShow.as_view(), name="blog_category_list"),                  # ? GET
    
    # Viewing All Blogs
    path('blog/all/', views.AllBlogShow.as_view(), name="all_blog_show"),                                  # ? GET
    
    # Deleting and Viewing A Blog
    path('blog/delete/<int:pk>/', views.BlogDelete.as_view(), name="blog_delete"),                         # ! DELETE
    path('blog/<int:pk>/', views.SingleBlogView.as_view(), name="single_blog"),                            # ? GET
    
    # Commenting on a Blog
    path('comment/', views.CommentListCreate.as_view(), name="comment_list_create"),                       # ! POST

    # Voting on a Blog
    path('vote/', views.VoteCreate.as_view(), name="vote_create"),                                         # ! POST
    path('vote/<int:pk>/', views.VoteCount.as_view(), name="upvote_count"),                                # ? GET
    
    # Creating a Problem
    path('problem/', views.ProblemCreate.as_view(), name="problem_create"),                                # ! POST  
    
    # Viewing All Problems
    path('problem/all/', views.AllProblemShow.as_view(), name="all_problem_show"),                         # ? GET  
    path('problem/<int:pk>/', views.SingleProblemShow.as_view(), name="single_problem"),                   # ? GET 
    
    # Getting the current user
    path('user/', views.CurrentUser.as_view(), name="current_user"),                                        # ? GET
    

    
    
    
    
    
    
    
    
    
    
    #Admin
    path('mathx/problem/<int:pk>/approve/', views.ApproveProblem.as_view(), name="problem_approve"),             # ! POST
    path('mathx/problem/all', views.AllProblemShowAdmin.as_view(), name="all_problem_show"),                     # ? GET
    
    
    #Contest
    path('mathx/contest/', views.CreateContest.as_view(), name="contest_create"),                                 # ! POST
    path('mathx/contest/all/', views.AllContestShow.as_view(), name="all_contest_show"),                          # ? GET
    path('mathx/addcontestproblem/', views.AddProblemToContest.as_view(), name="add_problem_to_contest")         # ! POST
]
