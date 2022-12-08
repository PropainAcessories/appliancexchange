const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Product, Category } = require('../models');
const signToken = require('../utils/auth');
const stripe = require('stripe')(/*TODO: Read the documentation for whatever the fuck goes in here. */);

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await Product.find(params).populate('category');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                user.orders.sort((a,b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Please Log in or Create an Account.');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Please Log in or Create an Account.');
        },
        /*  
        
        TODO: Make this work for payments somehow
        
                READ THE FUCKING DOCUMENTATION THIS TIME YOU MORON; I KNOW YOU THINK YOU'RE SMART.
        */
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products');

            for (let i=0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,

                })
            }
        }
    },
    Mutation: {
        /** 
         ADD MUTATIONS
        
         PIGS IN SPAAAAAAAAACE!
        
        **/
    }
};

module.exports = resolvers;
