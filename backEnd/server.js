import dotenv from 'dotenv';
dotenv.config();
import session from 'express-session';
import cors from 'cors';

import express from 'express';
import router from './router.js';

const PORT = process.env.PORT;
const app = express();

/* CORS policy */
app.use(cors({
	origin: 'http://arthurpiau.ide.3wa.io:9000',
}));

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}));

//pour récupérer les informations du formulaire
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

//importation des routes
app.use('/', router);

// connexion du serveur au réseau
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
