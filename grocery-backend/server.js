// server.js (root of grocery-backend)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route files
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/UserRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // for viewing categories
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminCategoryRoutes = require('./routes/admincategoryRoutes'); // for adding category/subcategory

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/GroceryStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ DB connection error:', err));

// Routes
app.use('/products', productRoutes);         // Product APIs
app.use('/users', userRoutes);               // User registration/login
app.use('/checkout', checkoutRoutes);        // Checkout data
app.use('/cart', cartRoutes);                // Cart logic
app.use('/admin', adminRoutes);              // Admin login
app.use('/category', adminCategoryRoutes);   // Admin category & subcategory insert
app.use('/categories', categoryRoutes);      // View categories list (separate route)
app.use('/feedback', feedbackRoutes);        // Feedback form & view

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
