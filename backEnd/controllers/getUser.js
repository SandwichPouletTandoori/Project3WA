import query from '../database.js';

export default (req, res) => {
  const id = req.params.idUser;

  query(
    'SELECT idUser, username, role FROM User WHERE idUser = ?',
    [id],
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

      res.json({
        data: results[0]
      });
    }
  );
};
