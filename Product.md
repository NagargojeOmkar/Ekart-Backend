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

  
  