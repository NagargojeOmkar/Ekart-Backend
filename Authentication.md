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



