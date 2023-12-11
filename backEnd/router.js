import express from 'express';
import jwt from 'jsonwebtoken'

const router = express.Router();

import { Home } from "./controllers/home.js"
import { handleProducts, handleCreateProduct, handleModifyProduct, handleDeleteProduct } from "./controllers/products.js"
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

const checkAuthentication = (req, res, next) => {
    if(!req.session.role) {
      return res.status(401).send({
        error: `Accès non autorisé`
      });
    }
    next();
}

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

router.get('/products', handleProducts);
router.post('/products/add', handleCreateProduct);
router.post('/products/:idProduct/update', handleModifyProduct)
router.delete('/products/:idProduct', handleDeleteProduct);


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