import { v4 } from 'uuid';
import database from '../database.js';
import query from '../database.js';
import formidable from 'formidable';
import fs from 'fs';
import xss from 'xss';

const id = v4();

export function handleProducts(req, res) {
  const query = 'SELECT * FROM Products';

  database(query, [], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.json(result);
    }
  });
};

export function handleCreateProduct(req, res) {
    const {name,  description} = req.body;
    
    const newProduct = {
        id: v4(),
        name,
        description,
    }
            
    query(
        'INSERT INTO Products (idProduct, nameProduct, descriptionProduct) VALUES (?, ?, ?)',
            [id, newProduct.name, newProduct.description],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur lors de la requete');
                    return;
                }
                res.send()
                }
            );
}


export function handleModifyProduct(req, res) {
    const idProduct = req.params.idProduct;

    query(
        'SELECT idProduct FROM Products WHERE idProduct = ?',
        [idProduct],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({
                  error: 'Erreur serveur'
                });
                return;
            }
            
            if (results.length === 0) {
                return res.status(404).send({
                  error: `Le produit avec l'id ${idProduct} n' pas été trouvé`
                });
            }

            const productToUpdate = {
                idProduct,
                nameProduct: xss(req.body.nameProduct),
                imageProduct: xss(req.body.imageProduct),
                descriptionProduct: xss(req.body.descriptionProduct),
            }

            query(
                'UPDATE Products SET nameProduct = ?, descriptionProduct = ? WHERE idProduct = ?',
                [productToUpdate.nameProduct, productToUpdate.descriptionProduct, productToUpdate.idProduct],
                (error) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({
                          error: 'Erreur serveur'
                        });
                        return;
                    }
                    res.json({
                        data: productToUpdate
                    });
                }
            )
        }
    )
};

export function handleDeleteProduct(req, res) {
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
            res.send();
        }
    );
};