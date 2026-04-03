Module 6: Ping (Health Check)

  6.1 Ping

  GET http://localhost:3000/api/v1/ping

  Response 200:
  { "success": true, "ping": "pong" }

  ---
  Quick Reference Table

  ┌──────────┬───────────────────────────────┬────────┬──────┬───────┐
  │  Module  │           Endpoint            │ Method │ Auth │ Role  │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Auth     │ /api/v1/auth/register         │ POST   │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Auth     │ /api/v1/auth/login            │ POST   │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Auth     │ /api/v1/auth/firebase-login   │ POST   │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Auth     │ /api/v1/auth/me               │ GET    │ Yes  │ Any   │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Product  │ /api/v1/products/products     │ POST   │ Yes  │ Admin │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Product  │ /api/v1/products/products     │ GET    │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Product  │ /api/v1/products/products/:id │ GET    │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Product  │ /api/v1/products/products/:id │ PUT    │ Yes  │ Admin │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Product  │ /api/v1/products/products/:id │ DELETE │ Yes  │ Admin │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Category │ /api/v1/categories            │ POST   │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Category │ /api/v1/categories            │ GET    │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Category │ /api/v1/categories/:id        │ GET    │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Category │ /api/v1/categories/:id        │ PUT    │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Category │ /api/v1/categories/:id        │ DELETE │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Brand    │ /api/v1/brands                │ POST   │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Brand    │ /api/v1/brands                │ GET    │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Brand    │ /api/v1/brands/:id            │ GET    │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Brand    │ /api/v1/brands/:id            │ PUT    │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Brand    │ /api/v1/brands/:id            │ DELETE │ No   │ —     │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Cart     │ /api/v1/cart                  │ GET    │ Yes  │ Any   │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Cart     │ /api/v1/cart/items            │ POST   │ Yes  │ Any   │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Cart     │ /api/v1/cart/items/:itemId    │ PATCH  │ Yes  │ Any   │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Cart     │ /api/v1/cart/items/:itemId    │ DELETE │ Yes  │ Any   │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Cart     │ /api/v1/cart/checkout         │ POST   │ Yes  │ Any   │
  ├──────────┼───────────────────────────────┼────────┼──────┼───────┤
  │ Ping     │ /api/v1/ping                  │ GET    │ No   │ —     │
  └──────────┴───────────────────────────────┴────────┴──────┴───────┘

  ▎ Note: Category and Brand endpoints don't have authMiddleware protection in your current code. Anyone can create/update/delete them. Add authMiddleware and isAdmin to
  those routes if you want to restrict access.


  