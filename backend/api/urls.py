from django.urls import path
from . import views



urlpatterns = [
    path('blog/', views.BlogListCreate.as_view(), name="blog_list_create"),
    path('blog/delete/<int:pk>/', views.BlogDelete.as_view(), name="blog_delete"),
    path('blog/<int:pk>/', views.SingleBlogView.as_view(), name="single_blog"),
    path('comment/', views.CommentListCreate.as_view(), name="comment_list_create"),
    path('blog/<int:pk>/comment/', views.CommentOfABlogListCreate.as_view(), name="comment_list_create"),
    path('vote/', views.VoteCreate.as_view(), name="vote_create"),
    
]
