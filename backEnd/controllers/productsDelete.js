import query from '../database.js';

/****SUPPRESSION DE CONTACT */
export default (req, res) => {
    const productId = req.params.idProduct;
    
    query(
        `DELETE FROM Products WHERE idProduct = ?`,
        [productId],
        (error, result) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            //on redirige vers la page d'accueil
            res.send();
        }
    );
};