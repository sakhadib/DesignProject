from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from .models import Problem, Contest, Submission, ContestProblem
from .serializers import SubmissionSerializer


class CreateSubmission(generics.CreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Use `validated_data` instead of `data`
        verdict = self.check_verdict(serializer.validated_data)
        serializer.save(author=self.request.user, verdict=verdict)

    def check_verdict(self, validated_data):
        problem = Problem.objects.get(pk=validated_data['problem'].id)
        # Compare answers
        return problem.answer == validated_data['submitted_answer']
