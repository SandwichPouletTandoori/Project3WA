import xss from 'xss';
import query from '../database.js';

export default (req, res) => {
  const id = req.params.idUser;

  query(
    'SELECT idUser, role FROM User WHERE idUser = ?', [id],
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
          error: `L'utilisateur avec l'id ${id} n' pas été trouvé`
        });
      }

      const userToUpdate = {
        id,
        username: xss(req.body.username),
        role: results[0].role
      }

      query(
        'UPDATE User SET username = ? WHERE idUser = ?', [userToUpdate.username, id],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
          }

          res.status(201).json({
            data: results
          });
        }
      );
    }
  );
};
