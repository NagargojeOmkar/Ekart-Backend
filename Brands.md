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