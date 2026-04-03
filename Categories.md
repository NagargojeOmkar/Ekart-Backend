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
