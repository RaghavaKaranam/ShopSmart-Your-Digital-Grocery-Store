const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Category = require('./models/category');

mongoose.connect('mongodb://localhost:27017/GroceryStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categoryMap = {};

fs.createReadStream('./products.csv') // use correct path if it's in root or backend/
  .pipe(csv())
  .on('data', (row) => {
    const category = row.Category?.trim();
    const subCategory = row.SubCategory?.trim();

    if (!category || !subCategory) return;

    if (!categoryMap[category]) {
      categoryMap[category] = new Set();
    }

    categoryMap[category].add(subCategory);
  })
  .on('end', async () => {
    console.log('CSV processing complete. Inserting into DB...');

    const insertPromises = Object.entries(categoryMap).map(([category, subSet]) => {
      return Category.create({
        category,
        subcategories: [...subSet],
      });
    });

    await Promise.all(insertPromises);
    console.log('✅ Categories inserted successfully!');
    mongoose.disconnect();
  });
