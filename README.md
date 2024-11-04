
# Project API Documentation

This API provides endpoints for managing products, orders, carts, and wishlists in an e-commerce platform.

## Table of Contents

- [Auth Routes](#product-routes)
- [User Routes](#product-routes)
- [Product Routes](#product-routes)
- [Order Routes](#order-routes)
- [Cart Routes](#cart-routes)
- [Wishlist Routes](#wishlist-routes)

---

## API Documentation - Authentication Routes

Base URL: `/api/v1/auth`

### 1. **Login User**

- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Initiates the login process by requesting an OTP to be sent to the user's email address.

#### Request
```json
{
  "email": "user@example.com"
}
```

#### Response (Success - 200)
```json
{
  "message": "OTP sent successfully"
}
```

#### Response (Error - 500)
```json
{
  "error": "Error message describing the issue"
}
```

---

### 2. **Logout User**

- **Endpoint**: `/logout`
- **Method**: `POST`
- **Description**: Logs out the user from the system.

#### Request
_No body required._

#### Response (Success - 200)
```json
{
  "message": "User logged out successfully"
}
```

---

### 3. **Verify OTP for Login**

- **Endpoint**: `/verify-otp`
- **Method**: `POST`
- **Description**: Verifies the OTP sent to the user's email for login purposes. Upon successful verification, a JWT token is generated for the user.

#### Request
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

#### Response (Success - 200)
```json
{
  "message": "OTP verified successfully",
  "token": "jwt_token_here"
}
```

#### Response (Error - 400)
```json
{
  "error": "Error message describing the issue"
}
```

---

**Note**: Make sure to replace `jwt_token_here` with the actual JWT token received in the response for session management.

---

## API Documentation - User Routes

Base URL: `/api/v1/user`

### 1. **Get Current User Profile**

- **Endpoint**: `/profile`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **Description**: Retrieves the profile information of the currently authenticated user.

#### Request
_Headers_
- `Authorization: Bearer <token>`

_No body required._

#### Response (Success - 200)
```json
{
  "userProfile": {
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2023-01-01T00:00:00.000Z",
    // Additional profile fields as applicable
  }
}
```

#### Response (Error - 400)
```json
{
  "error": "Error message describing the issue"
}
```

---

### 2. **Update Current User Profile**

- **Endpoint**: `/profile`
- **Method**: `PUT`
- **Authentication**: Required (JWT token)
- **Description**: Updates the profile information of the currently authenticated user.

#### Request
_Headers_
- `Authorization: Bearer <token>`

_Body_
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  // Additional profile fields as applicable
}
```

#### Response (Success - 200)
```json
{
  "message": "Profile updated successfully",
  "userProfile": {
    "email": "newemail@example.com",
    "name": "Updated Name",
    // Updated profile fields
  }
}
```

#### Response (Error - 400)
```json
{
  "error": "Error message describing the issue"
}
```

---

## Product Routes

Base URL: `/api/v1/products`

### 1. Get All Products

- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Retrieves a list of all products.

#### Response (Success - 200)
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Product 1",
      "price": 19.99
    }
    // Additional products
  ]
}
```

---

### 2. Get Product by ID

- **Endpoint**: `/:productId`
- **Method**: `GET`
- **Description**: Retrieves details of a specific product by ID.

#### Response (Success - 200)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Product 1",
    "price": 19.99
  }
}
```

---

## Order Routes

Base URL: `/api/v1/orders`

### 1. Place a New Order

- **Endpoint**: `/`
- **Method**: `POST`
- **Authentication**: Required
- **Description**: Places a new order for the authenticated user.

#### Request
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "productId": "123",
    "quantity": 2
  }
  ```

#### Response (Success - 201)
```json
{
  "message": "Order placed successfully",
  "order": {
    "id": "12345",
    "userEmail": "user@example.com",
    "items": [
      {
        "productId": "123",
        "quantity": 2,
        "price": 19.99
      }
    ],
    "totalPrice": 39.98
  }
}
```

---

### 2. Get Order by ID

- **Endpoint**: `/:orderId`
- **Method**: `GET`
- **Authentication**: Required
- **Description**: Retrieves details of a specific order by ID for the authenticated user.

---

### 3. Get Past Orders of the User

- **Endpoint**: `/`
- **Method**: `GET`
- **Authentication**: Required
- **Description**: Retrieves the list of past orders for the authenticated user.

---

## Cart Routes

Base URL: `/api/v1/cart`

### 1. Get Current User's Cart

- **Endpoint**: `/`
- **Method**: `GET`
- **Authentication**: Required
- **Description**: Retrieves the authenticated user's current cart.

#### Response (Success - 200)
```json
{
  "items": [
    {
      "productId": "123",
      "quantity": 2,
      "price": 19.99
    }
    // Additional items
  ],
  "totalPrice": 69.97
}
```

---

### 2. Add a Product to the Cart

- **Endpoint**: `/`
- **Method**: `POST`
- **Authentication**: Required
- **Description**: Adds a specified product with a given quantity to the authenticated user's cart.

---

### 3. Remove a Product from the Cart

- **Endpoint**: `/:productId`
- **Method**: `DELETE`
- **Authentication**: Required
- **Description**: Removes a specified product from the authenticated user's cart.

---

## Wishlist Routes

Base URL: `/api/v1/wishlist`

### 1. Get Current User's Wishlist

- **Endpoint**: `/`
- **Method**: `GET`
- **Authentication**: Required
- **Description**: Retrieves the authenticated user's wishlist.

#### Response (Success - 200)
```json
{
  "wishlist": [
    {
      "productId": "123",
      "name": "Product 1",
      "price": 19.99
    }
    // Additional wishlist items
  ]
}
```

---

### 2. Add a Product to the Wishlist

- **Endpoint**: `/`
- **Method**: `POST`
- **Authentication**: Required
- **Description**: Adds a specified product to the authenticated user's wishlist.

---

### 3. Remove a Product from the Wishlist

- **Endpoint**: `/:productId`
- **Method**: `DELETE`
- **Authentication**: Required
- **Description**: Removes a specified product from the authenticated user's wishlist.

---

Each endpoint requires proper authentication and validation middleware where indicated. For more detailed examples, refer to individual route documentation.
