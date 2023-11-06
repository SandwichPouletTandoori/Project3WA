import { v4 } from 'uuid';
import query from '../database.js';
import formidable from 'formidable';
import fs from 'fs';

//AFFICHAGE DU FORMULAIRE
export default (req, res) => {
    
    const formData = formidable();

    // Récupération des champs et des fichiers
    formData.parse(req, (error, fields, files) => {
        if (error) {
            console.error(`Erreur lors de la récupération de la photo`);
            res.status(500).send('Erreur serveur');
            return;
        }
        // Récupération du chemin temporaire du fichier
        let oldPath = files.imageProduct[0].filepath;
        console.log(oldPath)
        // Chemin vers où sera stocké le fichier
        let newPath = '/public/pictures/' + files.imageProduct[0].originalFilename;
        console.log(newPath)
        // R2cupération du nom du fichier pour le stocker en BDD
        let imageProduct = files.imageProduct[0].originalFilename;
        console.log(imageProduct)

        // Copie le fichier depuis le dossier temporaire vers le dossier de destination
        fs.copyFile(oldPath, newPath, (error) => {
            if (error) {
                console.error(`Erreur lors de la récupération de la photo`);
                res.status(500).send('Erreur serveur');
                return;
            }
            
            const id = v4();
            
            // Faire la requête INSERT
            query(
                'INSERT INTO Products (idProduct, nameProduct, imageProduct, descriptionProduct) VALUES (?, ?, ?, ?)',
                [id, fields.nameProduct, imageProduct, fields.descriptionProduct],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Erreur lors de la requete');
                        return;
                    }
                    //on redirige vers la page d'accueil
                    // res.send()
                    res.send()
                }
            );
        });
    });
}
