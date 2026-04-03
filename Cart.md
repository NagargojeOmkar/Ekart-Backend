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