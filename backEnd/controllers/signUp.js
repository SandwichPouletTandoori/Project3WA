import {v4} from 'uuid';
import bcrypt from 'bcrypt';
import query from '../database.js';
import xss from 'xss';

const SignUp = (req, res) => {
 
    const { name, surname, username, password } = req.body;

    if (!name || !surname || !username || !password) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
        }
 
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
        }
        
        const user = {
            idUser: v4(),
            name: xss(name),
            surname: xss(surname),
            username: xss(username),
            password: hash,
            role: 'admin',
            }; 
        query(
            'INSERT INTO User (idUser, name, surname, username, password, role) VALUES (?, ?, ?, ?, ?, ?)',
            [user.idUser, user.name, user.surname, user.username, user.password, user.role],
            (error, result) => {
                if(error) {
                    console.error(error);
                    res.status(500).json({
                        error: 'Erreur server'
                    });
                    return;
                }
                
                res.status(201).json({
                    data: {
                        id: user.idUser,
                        username: user.username,
                        role: user.role
                    }
                });
            }
        );
    });
}

export { SignUp }