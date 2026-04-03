# Ekart Backend API

## Overview

Ekart is a scalable e-commerce backend built using Node.js, Express, and Sequelize. It provides REST APIs for authentication, products, categories, brands, cart, and other core e-commerce functionalities.

## Tech Stack

- Backend: Node.js, Express.js
- Database: MySQL (Sequelize ORM)
- Authentication: JWT / Firebase
- Environment Management: dotenv

## Project Structure

```
├── src/                 Main backend source code
├── frontend/            Frontend (if integrated)
├── assets/              Static files
├── .env                 Environment variables
├── package.json
├── ReadMe.md
```

---

## API Documentation

### Authentication APIs

Module 1: Authentication

  1.1 Register

  Creates a new local user account with email + password.

  POST http://localhost:3000/api/v1/auth/register
  Content-Type: application/json

  Body: {
    "name": "Omkar",
    "email": "omkar@test.com",
    "password": "test123",
    "mobile": "9876543210"
  }

  ┌──────────┬────────┬──────────┬─────────────────────────┐
  │  Field   │  Type  │ Required │       Description       │
  ├──────────┼────────┼──────────┼─────────────────────────┤
  │ name     │ String │ No       │ User's full name        │
  ├──────────┼────────┼──────────┼─────────────────────────┤
  │ email    │ String │ Yes      │ Valid email address     │
  ├──────────┼────────┼──────────┼─────────────────────────┤
  │ password │ String │ Yes      │ Min 6 chars recommended │
  ├──────────┼────────┼──────────┼─────────────────────────┤
  │ mobile   │ String │ No       │ Phone number            │
  └──────────┴────────┴──────────┴─────────────────────────┘

  Response 201 — Success:
  {
    "success": true,
    "message": "Registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "Omkar",
      "email": "omkar@test.com",
      "role": "user",
      "provider": "local"
    }
  }

  Response 400 — Already registered:
  { "success": false, "message": "Email already registered" }

  Response 400 — Missing fields:
  { "success": false, "message": "Email and password are required" }

  ---
  1.2 Login (Local)

  POST http://localhost:3000/api/v1/auth/login
  Content-Type: application/json

  Body: {
    "email": "omkar@test.com",
    "password": "test123"
  }

  Response 200 — Success:
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "Omkar",
      "email": "omkar@test.com",
      "role": "user",
      "provider": "local"
    }
  }

  Response 400 — Wrong credentials:
  { "success": false, "message": "Invalid password" }
  { "success": false, "message": "User not found" }

  Response 400 — Google user trying local login:
  { "success": false, "message": "This account uses google login. Please use that instead." }

  ---
  1.3 Google/Firebase Login

  Verifies a Firebase ID token (from Google Sign-In on frontend) and creates or finds a user in your DB.

  POST http://localhost:3000/api/v1/auth/firebase-login
  Content-Type: application/json

  Body: {
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
  }

  Response 200 — Success (existing user):
  {
    "success": true,
    "message": "Google login successful",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "Omkar",
      "email": "omkar@test.com",
      "mobile": null,
      "role": "user",
      "provider": "google"
    }
  }

  Response 200 — Success (new user, auto-created):
  {
    "success": true,
    "message": "Google login successful",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 3,
      "name": "Omkar N",
      "email": "omkar@gmail.com",
      "mobile": null,
      "role": "user",
      "provider": "google"
    }
  }

  ---
  1.4 Get Current User (Protected)

  Returns the logged-in user's info using the JWT token.

  GET http://localhost:3000/api/v1/auth/me
  Authorization: Bearer <token>

  Response 200:
  {
    "success": true,
    "user": {
      "id": 1,
      "name": "Omkar",
      "email": "omkar@test.com",
      "mobile": "9876543210",
      "role": "user",
      "provider": "local",
      "createdAt": "2025-04-01T10:30:00.000Z"
    }
  }

---

### Brands APIs

  Module 4: Brands

  4.1 Create Brand

  POST http://localhost:3000/api/v1/brands
  Content-Type: application/json

  Body: {
    "name": "Logitech",
    "description": "Leading manufacturer of computer peripherals"
  }

  ┌─────────────┬────────┬──────────┬───────────────────┐
  │    Field    │  Type  │ Required │    Description    │
  ├─────────────┼────────┼──────────┼───────────────────┤
  │ name        │ String │ Yes      │ Brand name        │
  ├─────────────┼────────┼──────────┼───────────────────┤
  │ description │ String │ Yes      │ Brief description │
  └─────────────┴────────┴──────────┴───────────────────┘

  Response 200:
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Logitech",
      "description": "Leading manufacturer of computer peripherals",
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T10:30:00.000Z"
    }
  }

  ---
  4.2 Get All Brands

  GET http://localhost:3000/api/v1/brands

  Response 200:
  {
    "success": true,
    "data": {
      "total": 3,
      "brands": [
        {
          "id": 1,
          "name": "Logitech",
          "description": "Leading manufacturer of computer peripherals",
          "createdAt": "2025-04-01T10:30:00.000Z",
          "updatedAt": "2025-04-01T10:30:00.000Z"
        },
        {
          "id": 2,
          "name": "Samsung",
          "description": "South Korean electronics brand",
          "createdAt": "2025-04-01T10:31:00.000Z",
          "updatedAt": "2025-04-01T10:31:00.000Z"
        }
      ]
    }
  }

  ---
  4.3 Get Brand by ID

  GET http://localhost:3000/api/v1/brands/1

  Response 200:
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Logitech",
      "description": "Leading manufacturer of computer peripherals",
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T10:30:00.000Z"
    }
  }

  ---
  4.4 Update Brand

  PUT http://localhost:3000/api/v1/brands/1
  Content-Type: application/json

  Body: {
    "name": "Logitech Int.",
    "description": "Updated description"
  }

  Response 200:
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Logitech Int.",
      "description": "Updated description",
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T11:00:00.000Z"
    }
  }

  ---
  4.5 Delete Brand

  DELETE http://localhost:3000/api/v1/brands/1

  Response 200:
  { "success": true, "deleted": 1 }


---

### Categories APIs

  Module 3: Categories

  3.1 Create Category

  POST http://localhost:3000/api/v1/categories
  Content-Type: application/json

  Body: {
    "title": "Electronics",
    "description": "Electronic devices and accessories"
  }

  ┌─────────────┬────────┬──────────┬───────────────────┐
  │    Field    │  Type  │ Required │    Description    │
  ├─────────────┼────────┼──────────┼───────────────────┤
  │ title       │ String │ Yes      │ Category name     │
  ├─────────────┼────────┼──────────┼───────────────────┤
  │ description │ String │ Yes      │ Brief description │
  └─────────────┴────────┴──────────┴───────────────────┘

  Response 201:
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Electronics",
      "description": "Electronic devices and accessories",
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T10:30:00.000Z"
    }
  }

  Response 400 — Missing fields:
  { "success": false, "message": "Title and description are required" }

  ---
  3.2 Get All Categories

  GET http://localhost:3000/api/v1/categories

  Response 200:
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Electronics",
        "description": "Electronic devices and accessories",
        "createdAt": "2025-04-01T10:30:00.000Z",
        "updatedAt": "2025-04-01T10:30:00.000Z"
      },
      {
        "id": 2,
        "title": "Books",
        "description": "Physical and digital books",
        "createdAt": "2025-04-01T10:35:00.000Z",
        "updatedAt": "2025-04-01T10:35:00.000Z"
      }
    ]
  }

  ---
  3.3 Get Category by ID

  GET http://localhost:3000/api/v1/categories/1

  Response 200:
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Electronics",
      "description": "Electronic devices and accessories",
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T10:30:00.000Z"
    }
  }

  ---
  3.4 Update Category

  PUT http://localhost:3000/api/v1/categories/1
  Content-Type: application/json

  Body: {
    "title": "Consumer Electronics"
  }

  Response 200:
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Consumer Electronics",
      "description": "Electronic devices and accessories",
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T11:00:00.000Z"
    }
  }

  ---
  3.5 Delete Category

  DELETE http://localhost:3000/api/v1/categories/1

  Response 200:
  { "success": true, "message": "Deleted" }

  Response 400 — Not found:
  { "success": false, "message": "Not found" }



---

### Cart APIs
● All Cart API Endpoints — Complete Reference

  Base URL: http://localhost:3000/api/v1/cart

  Prerequisite: Every endpoint requires authentication. Get a token first:

  POST http://localhost:3000/api/v1/auth/login
  Body: { "email": "your@email.com", "password": "yourpassword" }
  Save: the "token" value from the response

  ---
  1. Get Cart

  Returns all items currently in the authenticated user's cart, with stock status and total calculations.

  GET http://localhost:3000/api/v1/cart
  Authorization: Bearer <token>

  No body required.

  Response 200 (with items):
  {
    "success": true,
    "data": {
      "cartId": 1,
      "items": [
        {
          "id": 1,
          "productId": 5,
          "name": "Wireless Mouse",
          "quantity": 2,
          "priceAtAdd": 29.99,
          "stock": 48
        },
        {
          "id": 2,
          "productId": 8,
          "name": "USB Keyboard",
          "quantity": 1,
          "priceAtAdd": 49.99,
          "stock": 0
        }
      ],
      "totalItems": 3,
      "totalPrice": 109.97,
      "outOfStockItems": ["USB Keyboard"]
    }
  }

  Response 200 (empty cart):
  {
    "success": true,
    "data": {
      "cartId": null,
      "items": [],
      "totalItems": 0,
      "totalPrice": 0,
      "outOfStockItems": []
    }
  }

  Key points:
  - priceAtAdd = the price when the item was added (not current price)
  - outOfStockItems = items whose current stock is less than the quantity requested
  - totalItems = sum of all quantities (2 + 1 = 3)
  - If stock goes to zero after adding, the item still appears but is flagged in outOfStockItems

  ---
  2. Add to Cart

  Adds a product to the user's cart or merges quantity if the product already exists in the cart.

  POST http://localhost:3000/api/v1/cart/items
  Authorization: Bearer <token>
  Content-Type: application/json

  Body: { "productId": 5, "quantity": 2 }

  ┌───────────┬─────────┬──────────┬────────────────────────────────┐
  │   Field   │  Type   │ Required │          Description           │
  ├───────────┼─────────┼──────────┼────────────────────────────────┤
  │ productId │ Integer │ Yes      │ ID of the product to add       │
  ├───────────┼─────────┼──────────┼────────────────────────────────┤
  │ quantity  │ Integer │ Yes      │ Number of units (must be >= 1) │
  └───────────┴─────────┴──────────┴────────────────────────────────┘

  Response 201 (new item):
  {
    "success": true,
    "message": "Item added to cart",
    "data": {
      "cartId": 1,
      "items": [
        {
          "id": 1,
          "productId": 5,
          "name": "Wireless Mouse",
          "quantity": 2,
          "priceAtAdd": 29.99,
          "stock": 48
        }
      ],
      "totalItems": 2,
      "totalPrice": 59.98,
      "outOfStockItems": []
    }
  }

  Response 201 (item already exists — quantities merge):
  {
    "success": true,
    "message": "Item added to cart",
    "data": {
      "cartId": 1,
      "items": [
        {
          "id": 1,
          "productId": 5,
          "name": "Wireless Mouse",
          "quantity": 5,
          "priceAtAdd": 29.99,
          "stock": 48
        }
      ],
      "totalItems": 5,
      "totalPrice": 149.95,
      "outOfStockItems": []
    }
  }
  First call added 2, second call added 3 → merged to 5.

  Response 400 (invalid input):
  { "success": false, "message": "Quantity must be at least 1" }
  { "success": false, "message": "productId is required" }

  Response 404 (product doesn't exist):
  { "success": false, "message": "Product 999 not found" }

  Response 400 (not enough stock):
  { "success": false, "message": "Insufficient stock. Requested: 99, Available: 10" }

  How it works internally:
  1. Validates productId and quantity
  2. Checks product exists and has enough stock
  3. Finds or creates a cart for the user
  4. If item already exists → adds to existing quantity
  5. If item is new → creates new entry with price snapshot
  6. Returns the updated cart

  ---
  3. Update Quantity

  Changes the quantity of a specific item already in the cart.

  PATCH http://localhost:3000/api/v1/cart/items/:itemId
  Authorization: Bearer <token>
  Content-Type: application/json

  Body: { "quantity": 10 }

  Replace :itemId with the actual id from the cart items list.

  ┌──────────┬─────────┬──────────┬─────────────────────────────┐
  │  Field   │  Type   │ Required │         Description         │
  ├──────────┼─────────┼──────────┼─────────────────────────────┤
  │ quantity │ Integer │ Yes      │ New quantity (must be >= 1) │
  └──────────┴─────────┴──────────┴─────────────────────────────┘

  Response 200:
  {
    "success": true,
    "message": "Quantity updated",
    "data": {
      "cartId": 1,
      "items": [
        {
          "id": 1,
          "productId": 5,
          "name": "Wireless Mouse",
          "quantity": 10,
          "priceAtAdd": 29.99,
          "stock": 48
        }
      ],
      "totalItems": 10,
      "totalPrice": 299.90,
      "outOfStockItems": []
    }
  }

  Response 400 (requested more than stock):
  { "success": false, "message": "Insufficient stock. Requested: 100, Available: 48" }

  Response 404 (item not in user's cart):
  { "success": false, "message": "Cart item not found" }

  Important: This replaces the quantity completely (not adding). Setting quantity: 10 means the cart now has exactly 10 of that item, regardless of what it had before.

  ---
  4. Remove Item from Cart

  Deletes a specific item from the user's cart.

  DELETE http://localhost:3000/api/v1/cart/items/:itemId
  Authorization: Bearer <token>

  No body required. Replace :itemId with the item's id.

  Response 200:
  {
    "success": true,
    "message": "Item removed from cart",
    "data": {
      "cartId": 1,
      "items": [],
      "totalItems": 0,
      "totalPrice": 0,
      "outOfStockItems": []
    }
  }

  Response 404:
  { "success": false, "message": "Cart item not found" }

  ---
  5. Checkout

  Finalizes the cart as an order, deducts stock, and clears the cart.

  POST http://localhost:3000/api/v1/cart/checkout
  Authorization: Bearer <token>
  Content-Type: application/json

  Body: { "shippingAddress": "123 Main St, Mumbai", "paymentMethod": "cod" }

  ┌─────────────────┬────────┬──────────┬───────────────────────────────────────────┐
  │      Field      │  Type  │ Required │                Description                │
  ├─────────────────┼────────┼──────────┼───────────────────────────────────────────┤
  │ shippingAddress │ String │ Yes      │ Delivery address for the order            │
  ├─────────────────┼────────┼──────────┼───────────────────────────────────────────┤
  │ paymentMethod   │ String │ Yes      │ Payment mode (e.g., "cod", "upi", "card") │
  └─────────────────┴────────┴──────────┴───────────────────────────────────────────┘

  Response 200:
  {
    "success": true,
    "message": "Checkout successful",
    "items": [
      {
        "productId": 5,
        "quantity": 2,
        "priceAtPurchase": 29.99
      },
      {
        "productId": 8,
        "quantity": 1,
        "priceAtPurchase": 49.99
      }
    ]
  }

  Response 400 (empty cart):
  { "success": false, "message": "Cart is empty" }

  Response 400 (stock ran out during checkout):
  { "success": false, "message": "\"Wireless Mouse\" is out of stock. Only 1 available." }

  What happens internally:
  1. Fetches cart with all items
  2. Rejects if cart is empty
  3. Starts a database transaction
  4. For each item → locks the product row, checks stock, deducts it
  5. If any item fails → entire checkout rolls back, nothing is deducted
  6. Clears all cart items
  7. Commits the transaction
  8. Returns the order summary

  ---
  Complete Testing Sequence

  ![Alt Text](./assets/seq)

  ---
  Quick cURL Copy-Paste Cheat Sheet

  TOKEN="your_token_here"
  BASE="http://localhost:3000/api/v1/cart"

  # Add to cart
  curl -X POST $BASE/items \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"productId": 1, "quantity": 2}'

  # Get cart
  curl $BASE \
    -H "Authorization: Bearer $TOKEN"

  # Update quantity
  curl -X PATCH $BASE/items/1 \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"quantity": 10}'

  # Remove item
  curl -X DELETE $BASE/items/1 \
    -H "Authorization: Bearer $TOKEN"

  # Checkout
  curl -X POST $BASE/checkout \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"shippingAddress": "123 Main St", "paymentMethod": "cod"}'

    

---

### Pin APIs

Detailed documentation: [Ping.md](./Ping.md)

Endpoints:

- GET /ping

---

### Product APIs

  Module 2: Products

  2.1 Create Product (Admin Only)

  POST http://localhost:3000/api/v1/products/products
  Authorization: Bearer <admin_token>
  Content-Type: application/json

  Body: {
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with DPI control",
    "price": 29.99,
    "stock": 50,
    "categoryId": 1
  }

  ┌─────────────┬─────────┬──────────┬──────────────────────────┐
  │    Field    │  Type   │ Required │       Description        │
  ├─────────────┼─────────┼──────────┼──────────────────────────┤
  │ name        │ String  │ Yes      │ Product name             │
  ├─────────────┼─────────┼──────────┼──────────────────────────┤
  │ description │ String  │ Yes      │ Short description        │
  ├─────────────┼─────────┼──────────┼──────────────────────────┤
  │ price       │ Number  │ Yes      │ Must be > 0              │
  ├─────────────┼─────────┼──────────┼──────────────────────────┤
  │ stock       │ Integer │ Yes      │ Available quantity       │
  ├─────────────┼─────────┼──────────┼──────────────────────────┤
  │ categoryId  │ Integer │ Yes      │ Must exist in categories │
  └─────────────┴─────────┴──────────┴──────────────────────────┘

  Response 201 — Success:
  {
    "success": true,
    "data": {
      "id": 5,
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with DPI control",
      "price": 29.99,
      "stock": 50,
      "categoryId": 1,
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T10:30:00.000Z"
    }
  }

  Response 422 — Validation errors:
  {
    "success": false,
    "errors": [
      {
        "field": "name",
        "message": "Name is required",
        "value": ""
      }
    ]
  }

  Response 400 — Price too low:
  { "success": false, "message": "Price must be greater than zero" }

  ▎ Note: Requires authMiddleware + isAdmin. Regular users get 403.

  ---
  2.2 Get All Products (Paginated + Search + Filter + Sort)

  The most powerful endpoint — supports multiple filters simultaneously.

  GET http://localhost:3000/api/v1/products/products?search=mouse&page=1&limit=10&sortBy=price&sortOrder=ASC&minPrice=10&maxPrice=100&categoryId=1

  ┌────────────┬─────────┬──────────┬────────────────────────────────┐
  │ Parameter  │  Type   │ Required │          Description           │
  ├────────────┼─────────┼──────────┼────────────────────────────────┤
  │ page       │ Integer │ Yes      │ Page number (>= 1)             │
  ├────────────┼─────────┼──────────┼────────────────────────────────┤
  │ limit      │ Integer │ Yes      │ Items per page (1-50)          │
  ├────────────┼─────────┼──────────┼────────────────────────────────┤
  │ search     │ String  │ No       │ Search by name or description  │
  ├────────────┼─────────┼──────────┼────────────────────────────────┤
  │ sortBy     │ String  │ No       │ Field to sort by (e.g., price) │
  ├────────────┼─────────┼──────────┼────────────────────────────────┤
  │ sortOrder  │ String  │ No       │ ASC or DESC                    │
  ├────────────┼─────────┼──────────┼────────────────────────────────┤
  │ minPrice   │ Number  │ No       │ Minimum price filter           │
  ├────────────┼─────────┼──────────┼────────────────────────────────┤
  │ maxPrice   │ Number  │ No       │ Maximum price filter           │
  ├────────────┼─────────┼──────────┼────────────────────────────────┤
  │ categoryId │ Integer │ No       │ Filter by category             │
  └────────────┴─────────┴──────────┴────────────────────────────────┘

  Response 200:
  {
    "total": 25,
    "page": 1,
    "limit": 10,
    "data": [
      {
        "id": 5,
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse",
        "price": 29.99,
        "stock": 50,
        "categoryId": 1,
        "createdAt": "2025-04-01T10:30:00.000Z",
        "updatedAt": "2025-04-01T10:30:00.000Z"
      }
    ]
  }

  Response 400 — Invalid pagination:
  { "success": false, "message": "Limit must be a number" }

  Search only (no other filters):
  GET /api/v1/products/products?search=keyboard&page=1&limit=10

  Price range only:
  GET /api/v1/products/products?minPrice=20&maxPrice=80&page=1&limit=10

  Sort by price high to low:
  GET /api/v1/products/products?page=1&limit=10&sortBy=price&sortOrder=DESC

  ---
  2.3 Get Product by ID

  GET http://localhost:3000/api/v1/products/products/5

  No body required.

  Response 200:
  {
    "success": true,
    "data": {
      "id": 5,
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse",
      "price": 29.99,
      "stock": 50,
      "categoryId": 1,
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T10:30:00.000Z"
    }
  }

  Response 400 — Invalid format:
  { "success": false, "message": "Invalid product ID" }

  ---
  2.4 Update Product (Admin Only)

  PUT http://localhost:3000/api/v1/products/products/5
  Authorization: Bearer <admin_token>
  Content-Type: application/json

  Body: {
    "price": 24.99,
    "stock": 75
  }

  Sends only the fields you want to update.

  Response 200:
  {
    "success": true,
    "data": {
      "id": 5,
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse",
      "price": 24.99,
      "stock": 75,
      "categoryId": 1,
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T11:00:00.000Z"
    }
  }

  ---
  2.5 Delete Product (Admin Only)

  DELETE http://localhost:3000/api/v1/products/products/5
  Authorization: Bearer <admin_token>

  No body required.

  Response 200:
  { "success": true, "message": "Product 5 deleted successfully" }


---

## Sample Response Format

```
{
  "success": true,
  "data": {},
  "message": "Request successful"
}
```

---

## Error Response Format

```
{
  "success": false,
  "message": "Something went wrong"
}
```

---

## Author

Omkar Nagargoje

---

## Notes

- All APIs follow REST principles
- Authentication is required for protected routes
- Proper validation and error handling are implemented
