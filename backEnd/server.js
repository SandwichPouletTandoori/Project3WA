import dotenv from 'dotenv';
dotenv.config();
import session from 'express-session';
import cors from 'cors';
import express from 'express';
import router from './router.js';


const PORT = process.env.PORT;
const app = express();

app.use(cors({
	origin: 'http://arthurpiau.ide.3wa.io:9000',
    credentials: true, 
}));


app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
