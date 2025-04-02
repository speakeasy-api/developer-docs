from drf_spectacular.utils import extend_schema, extend_schema_view, extend_schema_field, OpenApiExample, OpenApiParameter
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Book
from .serializers import BookSerializer

@extend_schema_view(
    list=extend_schema(
        summary="Retrieve a list of books",
        description="Get a list of all books available in the library with optional filtering and pagination.",
        tags=["Books"]
    ),
    retrieve=extend_schema(
        summary="Retrieve a specific book",
        description="Get the details of a specific book by its ID.",
        tags=["Books"],
        responses={200: BookSerializer}
    ),
    create=extend_schema(
        summary="Create a new book",
        description="Add a new book to the library collection by providing the necessary details.",
        tags=["Books"],
    )
)
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @extend_schema_field(int)
    class CustomField(BookSerializer):
        def to_representation(self, value):
            return int(value)
        
    @extend_schema(
        summary="Get all books by the same author",
        description="Retrieve all books written by the same author as the specified book.",
        responses={200: BookSerializer(many=True)},
        extensions={
            'x-speakeasy-retries': {
                'strategy': 'backoff',
                'backoff': {
                    'initialInterval': 500,
                    'maxInterval': 60000,
                    'maxElapsedTime': 3600000,
                    'exponent': 1.5,
                },
                'statusCodes': ['5XX'],
                'retryConnectionErrors': True,
            },
        },
        tags=["Books", "Authors"],
        parameters=[
            OpenApiParameter(name='author', description='Filter books by author', required=False, type=str),
            OpenApiParameter(name='published_date', description='Filter books by published date', required=False, type=str),
        ],
        examples=[
            OpenApiExample(
                "Example Book",
                summary="Example of a book object",
                description="This example demonstrates how to use the Book API",
                value={
                    "title": "A Tale of Two Cities",
                    "author": "Charles Dickens",
                    "published_date": "1859-04-30"
                }
            )
        ],
    )
    @action(detail=True, methods=['get'])
    def author_books(self, request, pk=None):
        book = get_object_or_404(Book, pk=pk)
        books_by_author = Book.objects.filter(author=book.author)
        serializer = self.get_serializer(books_by_author, many=True)
        return Response(serializer.data)
