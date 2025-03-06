const mongoose = require("mongoose");
const Product = require("../backend/Models/product"); // Adjust path to your Product model
const Company = require("../backend/Models/company"); // Adjust path to your Company model

const updateCompanyProducts = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Companies"); // Replace with your DB URL
        
        const companies = await Company.find(); // Fetch all companies

        for (const company of companies) {
            // Find all products related to this company
            const products = await Product.find({ company: company._id });

            if (products.length > 0) {
                // Update the company's products array
                await Company.findByIdAndUpdate(company._id, { products: products.map(p => p._id) });
                console.log(`Updated company ${company.name} with ${products.length} products.`);
            }
        }

        console.log("Company products updated successfully!");
        mongoose.disconnect();
    } catch (error) {
        console.error("Error updating company products:", error);
    }
};

updateCompanyProducts();
