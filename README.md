<h1>Stationery Inventory Management System</h1>
<p>A comprehensive Stationery Inventory Management System built with Node.js, Express.js,Typescript,Mongoose and MongoDB, designed for managing stationery products, processing orders, and calculating revenue efficiently.</p>

<h2>Features</h2>

<h3>Product Management</h3>
<ul>
<li>Add, update,Get, and delete stationery products.</li>
<li>Track product inventory with real-time stock updates.</li>
<li>Categorize products under predefined types like Writing, Office Supplies, Art Supplies, Educational, and Technology.</li>
</ul>

<h3>Order Processing</h3>
<ul>
<li>Place orders with real-time inventory management.</li>
<li>Calculate total order price dynamically.
</li>
<li>Validate orders to handle insufficient stock scenarios.
</li>
</ul>


<h3>Revenue Calculation</h3>
<ul>
<li>Aggregated total revenue calculation from all orders using MongoDB aggregation pipeline.
</li>

</ul>


<h3>Data Validation</h3>
<ul>
<li>Robust validation for input data using Mongoose schema validations.
</li>
<li>Prevent invalid data entries and ensure consistency.</li>

</ul>



### Steps to Install

<h3>1.Intilization<h3>

```bash
   npm init
```
 <h3>2.install node,mongoose,mongodb,typescript,express and setup eslintrc
</h3>

```bash
npm i node mongodb mongoose express typescript
```


## API Endpoints

### Products

- **Get All Products**: `GET /api/products`
- **Add a Product**: `POST /api/products`
- **Update a Product**: `PUT /api/products/:id`
- **Delete a Product**: `DELETE /api/products/:id`

### Orders

- **Create an Order**: `POST /api/orders`
- **Calculate Revenue**: `GET /api/orders/revenue`

# Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **TypeScript**