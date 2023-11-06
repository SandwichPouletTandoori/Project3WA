import query from '../database.js';
import formidable from 'formidable';
import fs from 'fs';
import xss from 'xss';

export default (req, res) => {
    const idProduct = req.params.idProduct;

    // On récupère le user à modifier depuis la BDD
    query(
        'SELECT idProduct FROM Products WHERE idProduct = ?',
        [idProduct],
        (error, results) => {
            // On vérifie s'il y a une erreur lors l'exécution de la requête
            if (error) {
                console.error(error);
                res.status(500).json({
                  error: 'Erreur serveur'
                });
                return;
            }
            
            // Si le user n'a pas été trouvé, on répond not found au client
            if (results.length === 0) {
                return res.status(404).send({
                  error: `Le produit avec l'id ${idProduct} n' pas été trouvé`
                });
            }

            // On créé le user à modifier, qui sera retourné au client
            const productToUpdate = {
                idProduct,
                nameProduct: xss(req.body.nameProduct),// !!! Important
                imageProduct: xss(req.body.imageProduct),
                descriptionProduct: xss(req.body.descriptionProduct),
            }

            // On met à jour le user dans la BDD
            query(
                'UPDATE Products SET nameProduct = ?, descriptionProduct = ? WHERE idProduct = ?',
                [productToUpdate.nameProduct, productToUpdate.descriptionProduct, productToUpdate.idProduct],
                (error) => {
                    // On vérifie s'il y a une erreur lors l'exécution de la requête
                    if (error) {
                        console.error(error);
                        res.status(500).json({
                          error: 'Erreur serveur'
                        });
                        return;
                    }
                    
                    //On répond au client avec le user modifié
                    res.json({
                        data: productToUpdate
                    });
                }
            )
        }
    )
};

// export default (req, res) => {
//     let idProduct = req.params.idUser;
//     const formData = formidable({
//         allowEmptyFiles: true,
//         minFileSize: 0
//     });

//     const updateProductIntoDb = (data) =>
//         query(`UPDATE Products SET idProduct = ?,
//                               nameProduct = ?,
//                               imageProduct = ?,
//                               descriptionProduct = ?,
//             WHERE idProduct = ?`, data,
//             (error, result) => {
//                 if (error) {
//                     console.error(error);
//                     res.status(500).send('Erreur lors de la requete');
//                     return;
//                 }
//                 //on redirige vers la page d'accueil
//                 res.json(data);
//             }
//         );

//     // Récupération des champs et des fichiers
//     formData.parse(req, (error, fields, files) => {
//         if (error) {
//             console.error(`Erreur lors de la récupération de la photo ${error}`);
//             res.status(500).send('Erreur serveur');
//             return;
//         }
        
//         // On change le fichier uniquement s'il y en a un de spécifié
//         // dans le formulaire de modification
//         if (files.image[0].originalFilename === '') {
//             updateProductIntoDb([
//                 idProduct,
//                 fields.nameProduct,
//                 '',
//                 fields.descriptionProduct,
//             ]);
//             return;
//         }
        
//         // Récupération du chemin temporaire du fichier
//         let oldPath = files.image[0].filepath;
//         // Chemin vers où sera stocké le fichier
//         let newPath = 'public/pictures/' + files.image[0].originalFilename;
//         // R2cupération du nom du fichier pour le stocker en BDD
//         let imageName = files.image[0].originalFilename;

//         // Copie le fichier depuis le dossier temporaire vers le dossier de destination
//         fs.copyFile(oldPath, newPath, (error) => {
//             if (error) {
//                 console.error(`Erreur lors de la récupération de la photo`);
//                 res.status(500).send('Erreur serveur');
//                 return;
//             }
//             updateProductIntoDb([
//                 idProduct,
//                 fields.nameProduct,
//                 imageName,
//                 fields.descriptionProduct,
//             ]);
//         });
//     });
// };
