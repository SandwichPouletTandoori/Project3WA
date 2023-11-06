import query from '../database.js';
import bcrypt from 'bcrypt';

const LogIn = (req, res) => {
    const {username, password} = req.body;
    console.log(username, password)
    // Récupération du User par son pseudo
    query(
        'SELECT * FROM User WHERE username = ?',
        [username],
        (error, results) => {
            // Gestion de l'erreur
            console.log(results)
            if (error) {
                console.error(`Erreur lors l'exécution de la requête : ${error}`);
                res.status(500).json({
                  error: 'Erreur serveur'
                });
                return;
            }

            // Si le user n'a pas été trouvé, on répond au client
            if (results.length === 0) {
                return res.status(400).json({
                  error: `Identifiants incorrects`
                });
            }
            
            bcrypt.compare(password, results[0].password, (error, isAllowed) => {
                // Gestion de l'erreur
                if (error) {
                    console.error(`Erreur de hash: ${error}`);
                    res.status(500).json({
                      error: 'Erreur serveur'
                    });
                    return;
                }
                
                else if(!isAllowed) {
                return res.status(400).json({
                  error: `Identifiants incorrects`    
                    })
                }
                
                else {
                    req.session.isLogged = true;
                    req.session.role = results[0].role;
                    return res.json({
                        data: {
                            id: results[0].idUser,
                            username: results[0].username,
                            role: results[0].role
                        }
                    })
                }                
            })
        }
    )
}


// bcrypt.compare(password, results[0].password, (error, isAllowed) => {
//                 // Gestion de l'erreur
//                 if (error) {
//                     console.error(`Erreur de hash: ${error}`);
//                     res.status(500).json({
//                       error: 'Erreur serveur'
//                     });
//                     return;
//                 }
                
//                 if(isAllowed) {
//                     req.session.role = results[0].role;
//                     return res.json({
//                         data: {
//                             id: results[0].id,
//                             username: results[0].username,
//                             role: results[0].role
//                         }
//                     })
//                 }
                
//                 return res.status(400).json({
//                   error: `Identifiants incorrects`
//                 });
//             })
//         }
//     )
// }
export { LogIn }