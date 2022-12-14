const db = require('./connection');
const { User, Product, Category, Seller } = require('../models');
require('dotenv').config();


db.once('open', async () => {

    await Seller.deleteMany();
    const sellers = await Seller.create({
        name: 'HenryEvery LLC',
        email: 'hhc3h8@gmail.com',
        address: 'LOLNO',
        phoneNumber: '256-555-5555'
    });
    await Category.deleteMany();
    //Insert categories later
    const categories = await Category.insertMany([
        {name: 'Laptops'},
        {name: 'Desktops'},
        {name: 'Monitors'},
        {name: 'Mobile Devices'},
        {name: 'Televisions'},
        {name: 'Household'},
        {name: 'Kitchen'}
    ]);

    console.log('Categories seeded.');

    await Product.deleteMany();
    //Insert Products
    const products = await Product.insertMany([
        {
            name: 'Acer Laptop',
            description: 'Used Laptop 2.5 ghz cpu, 8gb DDR3 Ram, 2 TB SSD Storage',
            image: 'Laptop.jpg',
            category: categories[0]._id,
            price: 75.00,
            seller: sellers._id,
            quantity: 1
        },
        {
            name: 'Office desktop',
            description: 'Used Desktop Intel Core 2 duo 8 gb ram Windows 10',
            image: 'Desktop.jpg',
            category: categories[1]._id,
            price: 45.00,
            seller: sellers._id,
            quantity: 1
        },
        {
            name: 'Iphone 7',
            description: 'Used Iphone 7',
            image: 'Iphone.jpg',
            category: categories[3]._id,
            price: 60.00,
            seller: sellers._id,
            quantity: 1
        },
        {
            name: 'Phillips Roku Smart TV',
            description: '1080p Roku Smart Television',
            image: 'SmartTv.jpg',
            category: categories[4]._id,
            price: 100.00,
            seller: sellers._id,
            quantity: 1
        },
        {
            name: 'Computer Monitor',
            description: 'Used Display for computer DVI/HDMI.',
            image: 'monitor.jpg',
            category: categories[2]._id,
            price: 100.00,
            seller: sellers._id,
            quantity: 1
        },
        {
            name: 'Desk Lamp',
            description: 'A handemade lamp',
            image: 'FunnyLamp.jpg',
            category: categories[5]._id,
            price: 15.00,
            seller: sellers._id,
            quantity: 1
        },
        {
            name: 'Cutting Boards',
            description: 'Hand-Made Cutting Boards',
            image: 'CuttingBoard.jpg',
            category: categories[6]._id,
            price: 5.00,
            seller: sellers._id,
            quantity: 1
        }
    ]);
    
    console.log('Products Seeded')

    await User.deleteMany();
    //Insert Users
    await User.create({
        firstName: 'Henry',
        lastName: 'Howe',
        email: 'hhc3h8@gmail.com',
        phoneNumber: '256-555-5555',
        role: 'ROLE_ADMIN',
        password: 'password'
    });
    await User.create({
        firstName: 'Henry',
        lastName: 'Every',
        email: 'Pirate@ship.com',
        phoneNumber: '256-555-5555',
        role: 'ROLE_SELLER',
        password: 'password'
    });

    await User.create({
        firstName: 'Oliver',
        lastName: 'Levasseur',
        email: 'findit@gold.com',
        phoneNumber: '256-555-5555',
        role: 'ROLE_MEMBER',
        password: 'password',
        orders: [
            {
                products: [products[0]._id, products[1]._id]
            }
        ]
    });

    console.log('users seeded');

    process.exit();
});
