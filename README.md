# Product Management API

## Overview

This is a RESTful API for managing products using Node.js, Express, MongoDB, and Cloudinary. The API allows you to create, read, update, and delete products, and also handles image uploads to Cloudinary.

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Cloudinary account

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/product-management-api.git
cd product-management-api
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Create a `.env` File
**Create a `.env` file in the root of the project and add the following environment variables:**
```env
PORT=8080
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
### 4. Start the Server
```
npm start
```
>The server will start on http://localhost:8080.

## API Endpoints

### 1. Create a Product
- Endpoint: **POST** ***http://localhost:8080/api/products/create***
- **Description:** Create a new product.
- **Request Body:**
  ```json
  {
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "quantity": 10,
  }
  ```
  >Here is a sample from Postman
![Screenshot 2024-07-06 014353](https://github.com/Maticmania/restful-api-tsa/assets/102809968/dda28788-3214-4bb0-a36a-f8524d122150)
- **Response:**
  ```json
  {
  "success": true,
  "message": "Product created successfully",
  "product": {
    /* Product Object */
  }
  }
  ```
>Here is a sample from Postman
![Screenshot 2024-07-06 014609](https://github.com/Maticmania/restful-api-tsa/assets/102809968/61532415-2a20-4f2f-bbe8-79465e85fa64)

### 2. Get All Products
- Endpoint: **GET** ***http://localhost:8080/api/products/all***
- **Description:** Retrieve all products.
- **Response:**
```json
{
  "success": true,
  "totalProduct" /*Total product here*/
  "products": [/* Array of product objects */]
}
```
>Here is a sample from Postman
![Screenshot 2024-07-06 015648](https://github.com/Maticmania/restful-api-tsa/assets/102809968/edbcba19-3977-4c55-99c6-97620b174f06)

### 3. Get Product by ID
- Endpoint: **GET** ***http://localhost:8080/api/products/:productId***
- **Description:** Retrieve a specific product by ID.
- **Response:**
  ```json
  {
  "success": true,
  "product": {
    /* Product Object */
  }
  }
  ```
>Here is a sample from Postman
![Screenshot 2024-07-06 020519](https://github.com/Maticmania/restful-api-tsa/assets/102809968/f871ee27-bd02-4c2c-a4f2-5a1c25a33ed7)

### 4. Update a Product
- Endpoint: **PUT** ***http://localhost:8080/api/products/update/:productId***
- **Description:** Update an existing product by ID.
- **Request Body:**
```json
{
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 150,
  "quantity": 5,
}
```
>Here is a sample from postman
![Screenshot 2024-07-06 020943](https://github.com/Maticmania/restful-api-tsa/assets/102809968/6a21c50c-63b5-4fe5-94b9-a71475558d9c)

- **Request Body:**
  ```json
  {
  "success": true,
  "message": "Product updated successfully",
  "product": {
    /* Updated Product Object */
  }
  }
  ```
>Here is a sample from postman
![Screenshot 2024-07-06 021157](https://github.com/Maticmania/restful-api-tsa/assets/102809968/4a3757e1-1b6a-4655-a81a-46980e51268e)


### 4. Delete a Product
- Endpoint: **DELETE** ***http://localhost:8080/api/products/:productId***
- **Description:** Delete a product by ID.
- **Response:**
  ```json
  {
  "success": true,
  "message": "Product deleted successfully"
  }
  ```
>Here is a sample from postman
  ![image](https://github.com/Maticmania/restful-api-tsa/assets/102809968/803761a4-4c3e-4563-9fcc-2f8d7ea116ff)

  
                                                                          Code with 💖 by Matic 🐒
