from django.urls import path
from . import views



urlpatterns = [
    path('blog/', views.BlogListCreate.as_view(), name="blog_list_create"),
    path('blog/delete/<int:pk>/', views.BlogDelete.as_view(), name="blog_delete"),
]
