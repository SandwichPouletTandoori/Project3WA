import express from 'express';

const router = express.Router();

import { Home } from "./controllers/home.js"
import { SignUp } from "./controllers/signUp.js"
import { LogIn } from "./controllers/logIn.js"
import { Products } from "./controllers/products.js"
import { Contact } from "./controllers/contact.js"
import { About } from "./controllers/about.js"
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

router.get('/', Home);

router.get('/signup', SignUp);
router.post('/signup', SignUp);

router.get('/login', LogIn);
router.post('/login', LogIn);

router.get('/products', Products);

router.get('/contact', Contact);

router.get('/about', About);

router.get('*', Error404)

export default router;
