from django.urls import path
from . import views



urlpatterns = [
    path('blog/', views.BlogListCreate.as_view(), name="blog_list_create"),                                # ! POST
    path('blog/all/', views.AllBlogShow.as_view(), name="all_blog_show"),                                  # ? GET
    path('blog/delete/<int:pk>/', views.BlogDelete.as_view(), name="blog_delete"),                         # ! DELETE
    path('blog/<int:pk>/', views.SingleBlogView.as_view(), name="single_blog"),                            # ? GET
    path('blog/<int:pk>/comment/', views.CommentOfABlogListCreate.as_view(), name="comment_list_create"),  # ! POST
    
    path('comment/', views.CommentListCreate.as_view(), name="comment_list_create"),                       # ! POST

    path('vote/', views.VoteCreate.as_view(), name="vote_create"),                                         # ! POST
    path('vote/<int:pk>/', views.VoteCount.as_view(), name="upvote_count"),                                # ? GET                                          
]
