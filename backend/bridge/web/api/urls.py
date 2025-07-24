# from . import views
from django.urls import path
from .view.project_list_view import ProjectListView

urlpatterns = [
    path("projects/", ProjectListView.as_view(), name="project-list"),
] 
