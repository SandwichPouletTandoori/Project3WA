import {v4} from 'uuid';
import bcrypt from 'bcrypt';
import query from '../database.js';
import xss from 'xss';

const SignUp = (req, res) => {
 
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
        }
        
        const user = {
            id: v4(),
            name: xss(req.body.name),
            surname: xss(req.body.surname),
            username: xss(req.body.pseudo),
            password: hash,
            role: 'admin'
        }
        query(
            'INSERT INTO User (id, name, surname, username, password, role) VALUES (?, ?, ?, ?, ?, ?)',
            [user.id, user.name, user.surname, user.username, user.password, user.role],
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
                        id: user.id,
                        username: user.username,
                        role: user.role
                    }
                });
            }
        );
    });
}

export { SignUp }