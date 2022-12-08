const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();
    //Insert categories later
    const categories = await Category.insertMany([
        {name: ''},
        {name: ''},
        {name: ''},
        {name: ''},
        {name: ''}
    ]);

    await Product.deleteMany();
    //Insert Products
    const products = await Product.insertMany([
        {

        }
    ]);

    await User.deleteMany();
    //Insert Users
    await User.create({

    });
    await User.create({
        
    })
})