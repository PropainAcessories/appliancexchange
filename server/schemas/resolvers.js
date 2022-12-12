const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Product, Category } = require('../models');
const signToken = require('../utils/auth');
const stripe = require('stripe')('pk_test_51MEEGRHzZuwtjjIt349YOKmuyJDtsPzI7qUzX2CrIbmkQ0bVYVngAkVqYiVyhGgvLwRZFKVeUazeGZkl6Cg00qMW00ckaTOMPN');

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
        // seller: async (parent, { _id }, context) => {
        //     if (context.user) {
        //         const seller = await Seller.findById(context.user._id).populate({
        //             path: 'seller.users',
        //             populate: 'product'
        //         });

        //         return user.seller.id(_id);
        //     }
            
        //     throw new AuthenticationError('Log in please.');
        // },
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
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
                const order = new Order({ products });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Please Log in to place an order.');
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

        },
        updateProduct: async (parent, { _id, quantity }) => {

        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid Credentials try again; or sign up.')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Invalid Credentials try again; or sign up.')
            }

            const token = signToken(user);

            return { token, user };
        },
        /* addProduct: async (parent, { product }, context) => {
            
         } */
    }
};

module.exports = resolvers;
