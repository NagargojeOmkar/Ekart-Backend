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

Detailed documentation: [Authentication.md](./Authentication.md)

Endpoints:

- POST /auth/register
- POST /auth/login
- GET /auth/me

---

### Brands APIs

Detailed documentation: [Brands.md](./Brands.md)

Endpoints:

- GET /brands
- POST /brands
- PUT /brands/:id
- DELETE /brands/:id

---

### Categories APIs

Detailed documentation: [Categories.md](./Categories.md)

Endpoints:

- GET /categories
- POST /categories
- PUT /categories/:id
- DELETE /categories/:id

---

### Cart APIs

Detailed documentation: [Cart.md](./Cart.md)

Endpoints:

- GET /cart
- POST /cart
- DELETE /cart/:id

---

### Pincode APIs

Detailed documentation: [Ping.md](./Ping.md)

Endpoints:

- GET /ping

---

### Product APIs

Detailed documentation: [Product.md](./Product.md)

Endpoints:

- GET /products
- GET /products/:id
- POST /products
- PUT /products/:id
- DELETE /products/:id

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
