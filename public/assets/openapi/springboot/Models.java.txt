package com.bookstore;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.DiscriminatorMapping;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Arrays;

public class Models {

    @Schema(description = "Represents a publication in the store", type="object", discriminatorMapping = {
        @DiscriminatorMapping(value = "Book", schema = Book.class),
        @DiscriminatorMapping(value = "Magazine", schema = Magazine.class)
    }, discriminatorProperty = "type", enumAsRef = true)
    @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type", visible = true)
    @JsonSubTypes({
        @JsonSubTypes.Type(value = Book.class, name = "Book"),
        @JsonSubTypes.Type(value = Magazine.class, name = "Magazine")
    })
    public static abstract class Publication {
        @Schema(description = "Unique identifier of the publication", example = "123e4567-e89b-12d3-a456-426614174000", nullable = true)
        private String id;

        @Schema(description = "Title of the publication", example = "Spring Boot in Action", nullable = true)
        private String title;

        @Schema(description = "Publication date", example = "2023-06-15", nullable = true)
        private String publishDate;

        @Schema(description = "Price in USD", example = "39.99", nullable = true)
        private float price;

        @Schema(description = "Type of the publication", example = "Book", allowableValues = {"Book", "Magazine"})
        private String type;

        // Constructors, getters, and setters
        public Publication() {}

        public Publication(String id, String title, String publishDate, float price, String type) {

            // Validate the type
            // We don't use an Enum, because swagger-core doesn't allow subtypes to override the enum and limit the values per subtype
            List<String> validTypes = Arrays.asList("Book", "Magazine");

            if (!validTypes.contains(type)) {
                throw new IllegalArgumentException("Invalid type: " + type);
            }

            this.id = id;
            this.title = title;
            this.publishDate = publishDate;
            this.price = price;
            this.type = type;
        }

        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getPublishDate() { return publishDate; }
        public void setPublishDate(String publishDate) { this.publishDate = publishDate; }
        public float getPrice() { return price; }
        public void setPrice(float price) { this.price = price; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }

    @Schema(description = "Represents a book in the store", allOf = {Publication.class})
    @JsonTypeName("Book")
    public static class Book extends Publication {
        @Schema(description = "Author of the book", example = "Craig Walls", nullable = true)
        private String author;

        @Schema(description = "ISBN of the book", example = "978-1617292545", nullable = true)
        private String isbn;

        @Schema(description = "Type of the publication", example = "Book", defaultValue = "Book", allowableValues = {"Book"}, requiredMode = Schema.RequiredMode.REQUIRED, accessMode = Schema.AccessMode.READ_ONLY)
        private final String type = "Book";

        // Constructors
        public Book() {}

        public Book(String id, String title, String publishDate, float price, String author, String isbn) {
            super(id, title, publishDate, price, "Book");
            this.author = author;
            this.isbn = isbn;
        }

        // Getters and setters
        public String getAuthor() { return author; }
        public void setAuthor(String author) { this.author = author; }
        public String getIsbn() { return isbn; }
        public void setIsbn(String isbn) { this.isbn = isbn; }
    }

    @Schema(description = "Represents a magazine in the store", allOf = {Publication.class})
    @JsonTypeName("Magazine")
    public static class Magazine extends Publication {
        @Schema(description = "Issue number of the magazine", example = "42", nullable = true)
        private int issueNumber;

        @Schema(description = "Publisher of the magazine", example = "National Geographic Society", nullable = true)
        private String publisher;

        @Schema(description = "Type of the publication", example = "Magazine", defaultValue = "Magazine", allowableValues = {"Magazine"}, requiredMode = Schema.RequiredMode.REQUIRED, accessMode = Schema.AccessMode.READ_ONLY)
        private final String type = "Magazine";

        // Constructors
        public Magazine() {}

        public Magazine(String id, String title, String publishDate, float price, int issueNumber, String publisher) {
            super(id, title, publishDate, price, "Magazine");
            this.issueNumber = issueNumber;
            this.publisher = publisher;
        }

        // Getters and setters
        public int getIssueNumber() { return issueNumber; }
        public void setIssueNumber(int issueNumber) { this.issueNumber = issueNumber; }
        public String getPublisher() { return publisher; }
        public void setPublisher(String publisher) { this.publisher = publisher; }
    }

    @Schema(description = "Represents an item in a list of publications", oneOf = {Book.class, Magazine.class}, allOf = {Publication.class}, discriminatorProperty = "type", discriminatorMapping = {
        @DiscriminatorMapping(value = "Book", schema = Book.class),
        @DiscriminatorMapping(value = "Magazine", schema = Magazine.class)
    })
    public final class PublicationListItem {}

    @Schema(description = "Represents an order for publications")
    public static class Order {
        @Schema(description = "Unique identifier for the order", example = "ord-123456")
        private String id;

        @Schema(description = "Customer who placed the order", example = "cust-789012", nullable = true)
        private String customerId;

        @ArraySchema(minItems = 1, schema = @Schema(implementation = PublicationListItem.class), arraySchema = @Schema(description = "List of items in the order"))
        private List<Publication> items;

        @Schema(description = "Total price of the order", example = "89.97")
        private float totalPrice;

        @Schema(description = "Status of the order")
        private OrderStatus status;

        // Constructors, getters, and setters
        public Order() {}

        public Order(String id, String customerId, List<Publication> items, float totalPrice, OrderStatus status) {
            this.id = id;
            this.customerId = customerId;
            this.items = items;
            this.totalPrice = totalPrice;
            this.status = status;
        }

        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getCustomerId() { return customerId; }
        public void setCustomerId(String customerId) { this.customerId = customerId; }
        public List<Publication> getItems() { return items; }
        public void setItems(List<Publication> items) { this.items = items; }
        public float getTotalPrice() { return totalPrice; }
        public void setTotalPrice(float totalPrice) { this.totalPrice = totalPrice; }
        public OrderStatus getStatus() { return status; }
        public void setStatus(OrderStatus status) { this.status = status; }
    }

    @Schema(description = "Possible statuses for an order")
    public enum OrderStatus {
        PENDING,
        SHIPPED,
        DELIVERED,
        CANCELLED
    }

    @Schema(description = "Represents an error response")
    public static class ErrorResponse {
        @Schema(description = "Error code", example = "404")
        private int code;

        @Schema(description = "Error message", example = "Publication not found")
        private String message;

        // Constructors
        public ErrorResponse() {}

        public ErrorResponse(int code, String message) {
            this.code = code;
            this.message = message;
        }

        // Getters and setters
        public int getCode() { return code; }
        public void setCode(int code) { this.code = code; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}