from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=True, methods=['get'])
    def author_books(self, request, pk=None):
        book = get_object_or_404(Book, pk=pk)
        books_by_author = Book.objects.filter(author=book.author)
        serializer = self.get_serializer(books_by_author, many=True)
        return Response(serializer.data)
