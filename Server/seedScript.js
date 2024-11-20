import 'dotenv/config.js'
import mongoose from 'mongoose'
import { Product, Category } from './src/models/index.js';
import { categories, products } from './seedData.js';


async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Deleting old data...");
        await Product.deleteMany({});
        await Category.deleteMany({});
        
        console.log("Inserting categories...");
        const categoryDocs = await Category.insertMany(categories);
        
        console.log("Mapping categories...");
        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        }, {});
        
        console.log("Inserting products...");
        const ProductwithCategoryIds = products.map((product) => ({
            ...product,
            category: categoryMap[product.category],
        }));
        
        await Product.insertMany(ProductwithCategoryIds);
        

        console.log("Database seeded successfully");

    } catch (error) {
        console.error("Failed to seed database", error);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();