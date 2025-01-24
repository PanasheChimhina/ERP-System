# ERP System Backend

This repository contains the implementation for an ERP (Enterprise Resource Planning) system. It provides RESTful APIs for managing inventory, sales, HR, finance, and procurement.

## Features

- **Inventory Management**: CRUD operations for products and stock checking.
- **Sales Management**: CRUD operations for sales and sale processing.
- **HR Management**: CRUD operations for employees and payroll processing.
- **Finance Management**: CRUD operations for transactions and financial reporting.
- **Procurement Management**: CRUD operations for purchase orders and order processing.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB.
- **dotenv**: Environment variable management.
- **Helmet**: Security middleware for HTTP headers.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Express Validator**: Middleware for validating request data.
- **Winston**: Logging library.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PanasheChimhina/ERP-System.git
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/erp_system
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

4. Seed the database with mock data:

   ```bash
   npm run seed
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

### API Endpoints

- **Inventory**: `/api/inventory`
- **Sales**: `/api/sales`
- **HR**: `/api/hr`
- **Finance**: `/api/finance`
- **Procurement**: `/api/procurement`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License

This project is licensed under the ISC License.