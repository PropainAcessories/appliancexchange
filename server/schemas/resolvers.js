const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Product, Category, Seller, Review } = require('../models');
const { signToken } = require('../utils/auth');
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
        review: async (parent, { _id }) => {
            return await Review.findById(_id).populate('product');
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
        seller: async (parent, args, context) => {
            if (context.seller) {
                const seller = await Seller.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                seller.orders.sort((a,b) => b.purchaseDate - a.purchaseDate);

                return seller;
            }
            
            throw new AuthenticationError('Log in please.');
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
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products');

            for (let i=0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]

                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }
    },
    Mutation: {
        addCategory: async (parent, args) => {
            const category = await Category.create(args);
            const user = await User.findOne(email);

            if (user.role !== 'ROLE_ADMIN') {
                throw new AuthenticationError('Must be Site Administrator to create Categories.');
            };

            return category;
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addSeller: async (parent, args) => {
            const seller = await Seller.create(args);
            const token = signToken(seller);

            return { token, seller };
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
            throw new AuthenticationError('Please Log In to edit your account.');
        },
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Product.findByIdAndUpdate(_id, 
                { $inc: { quantity: decrement } },
                { new: true });
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid Credentials try again; or sign up.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Invalid Credentials try again; or sign-up.');
            }

            const token = signToken(user);

            return { token, user };
        },
        addProduct: async (parent, args, context) => {
            if (context.user) {
                const {
                    category,
                    name,
                    description,
                    price,
                    quantity,
                    image,
                } = args
                console.log('Hello World this error is here', args);
                try {    
                    const product = await Product.create({
                        category,
                        name,
                        description,
                        price,
                        quantity,
                        image,
                        seller: context.user._id
                    });
    
                    return product;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        deleteProduct: async (parent, { productId }) => {
            const product = await Product.findOneAndDelete({ _id: productId });
            const user = await User.findOne(email)

            if (product.seller.toString() !== user._id.toString() &&
            user.role !== 'ROLE_ADMIN'
            ) {
                throw new AuthenticationError('Must be the seller; or Site Admin to Delete products.');
            }

            return product;            
        },
        deleteOrder: async (parent, { orderId, productId }, context) => {
            if (context.user) {
                return Order.findByIdAndUpdate(
                    { _id: orderId },
                    { $pull: { products: { _id: productId } } },
                    { new: true }
                );
            };
        },
        deleteCategory: async (parent, { _id }) => {
            const user = User.findOne(email);
            
            const category = Category.findByIdAndDelete(_id);

            if (user.role !== 'ROLE_ADMIN') {
                throw new AuthenticationError('Must be Site Administrator to Do this.');
            }

            return category;
        },
    },
};

module.exports = resolvers;
