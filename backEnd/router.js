import express from 'express';
import jwt from 'jsonwebtoken'

const router = express.Router();

import { Home } from "./controllers/home.js"
import { Products } from "./controllers/products.js"
import ProductsDelete from "./controllers/productsDelete.js"
import ProductsAdd from "./controllers/productsAdd.js"
import ProductUpdate from "./controllers/productUpdate.js"
import { Contact } from "./controllers/contact.js"
import { About } from "./controllers/about.js"

import { SignUp } from "./controllers/signUp.js"
import { LogIn } from "./controllers/logIn.js"
import { LogOut } from "./controllers/logOut.js"

import listUsers from "./controllers/listUsers.js";
import getUser from "./controllers/getUser.js";
import updateUser from "./controllers/updateUser.js";
import deleteUser from "./controllers/deleteUser.js";

import addComment from "./controllers/addComment.js"
import { Error404 } from "./controllers/error404.js"

// const Home = require("./controllers/home.js");
// const SignUp = require("./controllers/signUp.js");
// const LogIn = require("./controllers/logIn.js");
// const Products = require("./controllers/products.js");
// const Contact = require("./controllers/contact.js");
// const About = require("./controllers/about.js");
// const Error404 = require("./controllers/error404.js");

const checkAuthentication = (req, res, next) => {
    if(!req.session.role) {
      return res.status(401).send({
        error: `Accès non autorisé`
      });
    }
    next();
}

// function authenticateJWT(req, res, next) {
//     const token = req.header('Authorization');
    
//     if (!token) {
//         return res.status(401).json({ message: 'Authentication failed: No token provided' });
//     }
    
//     /* token = 'Bearer xxxx' */
//     jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (error, user) => {
//         if (error) {
//             return res.status(403).json({ message: 'Authentication failed: Invalid token' });
//         }
        
//         req.user = user;
        
//         next();
//     })
// }

router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});
   
router.get('/', Home);

router.get('/signup', SignUp);
router.post('/signup', SignUp);

router.get('/login', LogIn);
router.post('/login', LogIn);
router.get('/logout', LogOut);

router.get('/products', Products);
router.post('/products/add', ProductsAdd);
// router.get('/products/:idProduct/update', ProductUpdate)
router.post('/products/:idProduct/update', ProductUpdate)
router.delete('/products/:idProduct', ProductsDelete);


router.get('/contact', Contact);
router.post('/contact', addComment);

router.get('/about', About);

router.get('/users', checkAuthentication, listUsers);
router.get('/users/:id', checkAuthentication, getUser);
router.put('/users/:id', checkAuthentication, updateUser);
router.delete('/users/:id', checkAuthentication, deleteUser);


router.get('/users/:id', checkAuthentication, getUser);
router.put('/users/:id', checkAuthentication, updateUser);


router.get('*', Error404) 

export default router;