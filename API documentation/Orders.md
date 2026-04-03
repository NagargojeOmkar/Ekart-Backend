● Order APIs

  Base path: /api/v1/orders — all routes require auth.

  ---
  1. Place Order (Creates order from cart)

  POST /api/v1/orders

  Request Body:
  {
    "shippingAddress": "123 Main St, City, State - 400001",
    "paymentMethod": "COD"
  }

  Response (201):
  {
    "success": true,
    "message": "Order placed successfully",
    "data": {
      "id": 1,
      "orderNumber": "ORD-260403-1234",
      "totalAmount": 1499.50,
      "status": "PENDING",
      "paymentStatus": "PENDING",
      "paymentMethod": "COD",
      "shippingAddress": "123 Main St, City, State - 400001",
      "items": [
        {
          "productId": 5,
          "name": "Wireless Mouse",
          "quantity": 2,
          "priceAtPurchase": 499.50,
          "subtotal": 999.00
        },
        {
          "productId": 10,
          "name": "USB Cable",
          "quantity": 1,
          "priceAtPurchase": 500.50,
          "subtotal": 500.50
        }
      ],
      "createdAt": "2026-04-03T10:00:00.000Z",
      "updatedAt": "2026-04-03T10:00:00.000Z"
    }
  }

  ▎ Clears cart items after success. Validates stock, decrements it.

  ---
  2. Get User's Order History (Paginated)

  GET /api/v1/orders?page=1&limit=10&status=PENDING

  Query Params:

  ┌────────┬────────┬──────────┬─────────┐
  │ Param  │  Type  │ Required │ Default │
  ├────────┼────────┼──────────┼─────────┤
  │ page   │ number │ No       │ 1       │
  ├────────┼────────┼──────────┼─────────┤
  │ limit  │ number │ No       │ 10      │
  ├────────┼────────┼──────────┼─────────┤
  │ status │ string │ No       │ all     │
  └────────┴────────┴──────────┴─────────┘

  Response (200):
  {
    "success": true,
    "data": {
      "orders": [
        {
          "id": 1,
          "orderNumber": "ORD-260403-1234",
          "totalAmount": 1499.50,
          "status": "PENDING",
          "paymentStatus": "PENDING",
          "itemCount": 2,
          "createdAt": "2026-04-03T10:00:00.000Z"
        }
      ],
      "totalOrders": 5,
      "totalPages": 1,
      "currentPage": 1
    }
  }

  ---
  3. Get Single Order

  GET /api/v1/orders/:orderId

  Response (200):
  {
    "success": true,
    "data": {
      "id": 1,
      "orderNumber": "ORD-260403-1234",
      "totalAmount": 1499.50,
      "status": "PENDING",
      "paymentStatus": "PENDING",
      "paymentMethod": "COD",
      "shippingAddress": "123 Main St",
      "cancelledAt": null,
      "cancellationReason": null,
      "items": [
        {
          "productId": 5,
          "name": "Wireless Mouse",
          "quantity": 2,
          "priceAtPurchase": 499.50,
          "subtotal": 999.00
        }
      ],
      "createdAt": "2026-04-03T10:00:00.000Z",
      "updatedAt": "2026-04-03T10:00:00.000Z"
    }
  }

  ---
  4. Cancel Order (User)

  POST /api/v1/orders/:orderId/cancel

  Request Body:
  {
    "reason": "Changed my mind"
  }

  Response (200):
  {
    "success": true,
    "message": "Order cancelled",
    "data": { ...full order object... }
  }

  ▎ Only works if status is PENDING. User can only cancel own orders.

  ---
  5. Update Order Status (Admin Only)

  POST /api/v1/orders/:orderId/status

  Request Body:
  {
    "status": "SHIPPED"
  }

  Valid statuses: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED

  Response (200):
  {
    "success": true,
    "message": "Order status updated",
    "data": { ...full order object... }
  }

  ---
  6. Update Payment Status (Admin Only)

  POST /api/v1/orders/:orderId/payment

  Request Body:
  {
    "paymentStatus": "PAID"
  }

  Valid payment statuses: PENDING, PAID, FAILED, REFUNDED

  Response (200):
  {
    "success": true,
    "message": "Payment status updated",
    "data": { ...full order object... }
  }

  ---
  7. Get All Orders — Admin

  GET /api/v1/orders/admin/all?page=1&limit=10&status=PENDING&search=ORD-26

  Query Params:

  ┌────────┬────────┬──────────┬─────────┐
  │ Param  │  Type  │ Required │ Default │
  ├────────┼────────┼──────────┼─────────┤
  │ page   │ number │ No       │ 1       │
  ├────────┼────────┼──────────┼─────────┤
  │ limit  │ number │ No       │ 10      │
  ├────────┼────────┼──────────┼─────────┤
  │ status │ string │ No       │ all     │
  ├────────┼────────┼──────────┼─────────┤
  │ search │ string │ No       │ —       │
  └────────┴────────┴──────────┴─────────┘

  Searches by order number.
