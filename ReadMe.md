
# 🛒 Ekart Backend API

## Overview

Ekart is a scalable e-commerce backend built using **Node.js**, **Express**, and **Sequelize**. It provides REST APIs for authentication, products, categories, brands, cart, and other core e-commerce functionalities.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js, Express.js | Backend Framework |
| MySQL with Sequelize ORM | Database |
| JWT / Firebase | Authentication |
| dotenv | Environment Management |

## Project Structure

```
├── src/                 # Main backend source code
├── frontend/            # Frontend (if integrated)
├── assets/              # Static files
├── .env                 # Environment variables
├── package.json
└── ReadMe.md
```

---

## 📚 API Documentation

### 🔐 Authentication APIs

#### 1.1 Register

Creates a new local user account with email + password.

**Endpoint:** `POST http://localhost:3000/api/v1/auth/register`

**Request Body:**
```json
{
  "name": "Omkar",
  "email": "omkar@test.com",
  "password": "test123",
  "mobile": "9876543210"
}
```

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | No | User's full name |
| email | String | Yes | Valid email address |
| password | String | Yes | Min 6 chars recommended |
| mobile | String | No | Phone number |

**Response (201 - Success):**
```json
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
```

**Error Responses:**
- **400 - Already registered:** `{ "success": false, "message": "Email already registered" }`
- **400 - Missing fields:** `{ "success": false, "message": "Email and password are required" }`

---

#### 1.2 Login (Local)

**Endpoint:** `POST http://localhost:3000/api/v1/auth/login`

**Request Body:**
```json
{
  "email": "omkar@test.com",
  "password": "test123"
}
```

**Response (200 - Success):**
```json
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
```

**Error Responses:**
- **400 - Wrong password:** `{ "success": false, "message": "Invalid password" }`
- **400 - User not found:** `{ "success": false, "message": "User not found" }`
- **400 - Google user:** `{ "success": false, "message": "This account uses google login. Please use that instead." }`

---

#### 1.3 Google/Firebase Login

Verifies a Firebase ID token from Google Sign-In.

**Endpoint:** `POST http://localhost:3000/api/v1/auth/firebase-login`

**Request Body:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}
```

**Response (200 - Success - Existing User):**
```json
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
```

**Response (200 - Success - New User Auto-created):**
```json
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
```

---

#### 1.4 Get Current User (Protected)

Returns the logged-in user's info using the JWT token.

**Endpoint:** `GET http://localhost:3000/api/v1/auth/me`
**Authorization:** `Bearer <token>`

**Response (200):**
```json
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
```

---

### 🏷️ Brands APIs

#### 4.1 Create Brand

**Endpoint:** `POST http://localhost:3000/api/v1/brands`

**Request Body:**
```json
{
  "name": "Logitech",
  "description": "Leading manufacturer of computer peripherals"
}
```

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Brand name |
| description | String | Yes | Brief description |

**Response (200):**
```json
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
```

---

#### 4.2 Get All Brands

**Endpoint:** `GET http://localhost:3000/api/v1/brands`

**Response (200):**
```json
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
      }
    ]
  }
}
```

---

#### 4.3 Get Brand by ID

**Endpoint:** `GET http://localhost:3000/api/v1/brands/1`

**Response (200):**
```json
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
```

---

#### 4.4 Update Brand

**Endpoint:** `PUT http://localhost:3000/api/v1/brands/1`

**Request Body:**
```json
{
  "name": "Logitech Int.",
  "description": "Updated description"
}
```

**Response (200):**
```json
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
```

---

#### 4.5 Delete Brand

**Endpoint:** `DELETE http://localhost:3000/api/v1/brands/1`

**Response (200):**
```json
{ "success": true, "deleted": 1 }
```

---

### 📂 Categories APIs

#### 3.1 Create Category

**Endpoint:** `POST http://localhost:3000/api/v1/categories`

**Request Body:**
```json
{
  "title": "Electronics",
  "description": "Electronic devices and accessories"
}
```

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Category name |
| description | String | Yes | Brief description |

**Response (201):**
```json
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
```

---

#### 3.2 Get All Categories

**Endpoint:** `GET http://localhost:3000/api/v1/categories`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Electronics",
      "description": "Electronic devices and accessories",
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T10:30:00.000Z"
    }
  ]
}
```

---

#### 3.3 Get Category by ID

**Endpoint:** `GET http://localhost:3000/api/v1/categories/1`

**Response (200):**
```json
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
```

---

#### 3.4 Update Category

**Endpoint:** `PUT http://localhost:3000/api/v1/categories/1`

**Request Body:**
```json
{
  "title": "Consumer Electronics"
}
```

**Response (200):**
```json
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
```

---

#### 3.5 Delete Category

**Endpoint:** `DELETE http://localhost:3000/api/v1/categories/1`

**Response (200):**
```json
{ "success": true, "message": "Deleted" }
```

---

### 🛒 Cart APIs

> **Prerequisite:** Every cart endpoint requires authentication. Get a token first via login.

**Base URL:** `http://localhost:3000/api/v1/cart`

---

#### 1. Get Cart

Returns all items in the authenticated user's cart with stock status and total calculations.

**Endpoint:** `GET http://localhost:3000/api/v1/cart`
**Authorization:** `Bearer <token>`

**Response (200 - With Items):**
```json
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
```

**Response (200 - Empty Cart):**
```json
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
```

> **Key Points:**
> - `priceAtAdd` = price when the item was added (not current price)
> - `outOfStockItems` = items whose current stock < requested quantity
> - `totalItems` = sum of all quantities

---

#### 2. Add to Cart

Adds a product to the cart or merges quantity if product already exists.

**Endpoint:** `POST http://localhost:3000/api/v1/cart/items`
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
  "productId": 5,
  "quantity": 2
}
```

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| productId | Integer | Yes | ID of the product to add |
| quantity | Integer | Yes | Number of units (must be ≥ 1) |

**Response (201 - New Item):**
```json
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
```

**Error Responses:**
- **400:** `{ "success": false, "message": "Quantity must be at least 1" }`
- **404:** `{ "success": false, "message": "Product 999 not found" }`
- **400:** `{ "success": false, "message": "Insufficient stock. Requested: 99, Available: 10" }`

---

#### 3. Update Quantity

Changes the quantity of a specific item in the cart.

**Endpoint:** `PATCH http://localhost:3000/api/v1/cart/items/:itemId`
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
  "quantity": 10
}
```

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| quantity | Integer | Yes | New quantity (must be ≥ 1) |

**Response (200):**
```json
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
```

> **Note:** This replaces the quantity completely (not additive).

---

#### 4. Remove Item from Cart

**Endpoint:** `DELETE http://localhost:3000/api/v1/cart/items/:itemId`
**Authorization:** `Bearer <token>`

**Response (200):**
```json
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
```

---

#### 5. Checkout

Finalizes the cart as an order, deducts stock, and clears the cart.

**Endpoint:** `POST http://localhost:3000/api/v1/cart/checkout`
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
  "shippingAddress": "123 Main St, Mumbai",
  "paymentMethod": "cod"
}
```

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| shippingAddress | String | Yes | Delivery address for the order |
| paymentMethod | String | Yes | Payment mode (e.g., "cod", "upi", "card") |

**Response (200):**
```json
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
```

**Error Responses:**
- **400 - Empty cart:** `{ "success": false, "message": "Cart is empty" }`
- **400 - Out of stock:** `{ "success": false, "message": "\"Wireless Mouse\" is out of stock. Only 1 available." }`

---

#### Quick cURL Commands

```bash
TOKEN="your_token_here"
BASE="http://localhost:3000/api/v1/cart"

# Add to cart
curl -X POST $BASE/items \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'

# Get cart
curl $BASE -H "Authorization: Bearer $TOKEN"

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
```

---

### 📦 Product APIs

#### 2.1 Create Product (Admin Only)

**Endpoint:** `POST http://localhost:3000/api/v1/products/products`
**Authorization:** `Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with DPI control",
  "price": 29.99,
  "stock": 50,
  "categoryId": 1
}
```

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Product name |
| description | String | Yes | Short description |
| price | Number | Yes | Must be > 0 |
| stock | Integer | Yes | Available quantity |
| categoryId | Integer | Yes | Must exist in categories |

**Response (201 - Success):**
```json
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
```

---

#### 2.2 Get All Products (Paginated + Search + Filter + Sort)

**Endpoint:** `GET http://localhost:3000/api/v1/products/products?search=mouse&page=1&limit=10&sortBy=price&sortOrder=ASC&minPrice=10&maxPrice=100&categoryId=1`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | Integer | Yes | Page number (≥ 1) |
| limit | Integer | Yes | Items per page (1-50) |
| search | String | No | Search by name or description |
| sortBy | String | No | Field to sort by (e.g., price) |
| sortOrder | String | No | ASC or DESC |
| minPrice | Number | No | Minimum price filter |
| maxPrice | Number | No | Maximum price filter |
| categoryId | Integer | No | Filter by category |

**Response (200):**
```json
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
```

**Example Queries:**
- Search only: `GET /api/v1/products/products?search=keyboard&page=1&limit=10`
- Price range: `GET /api/v1/products/products?minPrice=20&maxPrice=80&page=1&limit=10`
- Sort by price high to low: `GET /api/v1/products/products?page=1&limit=10&sortBy=price&sortOrder=DESC`

---

#### 2.3 Get Product by ID

**Endpoint:** `GET http://localhost:3000/api/v1/products/products/5`

**Response (200):**
```json
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
```

---

#### 2.4 Update Product (Admin Only)

**Endpoint:** `PUT http://localhost:3000/api/v1/products/products/5`
**Authorization:** `Bearer <admin_token>`

**Request Body:**
```json
{
  "price": 24.99,
  "stock": 75
}
```

**Response (200):**
```json
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
```

---

#### 2.5 Delete Product (Admin Only)

**Endpoint:** `DELETE http://localhost:3000/api/v1/products/products/5`
**Authorization:** `Bearer <admin_token>`

**Response (200):**
```json
{ "success": true, "message": "Product 5 deleted successfully" }
```

---

## 📋 Response Formats

### Success Response

```json
{
  "success": true,
  "data": {},
  "message": "Request successful"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

## 👨‍💻 Author

**Omkar Nagargoje**

---

## 📝 Notes

- All APIs follow REST principles
- Authentication is required for protected routes
- Proper validation and error handling are implemented
- Admin role required for product creation, update, and deletion
```

