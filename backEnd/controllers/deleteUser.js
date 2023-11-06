import query from '../database.js';

export default (req, res) => {
  const id = req.params.idUser;

  query(
    'DELETE FROM User WHERE idUser = ?',
    [id],
    (error, results) => {
           if (error) {
          console.error(error);
          res.status(500).json({
            error: 'Erreur serveur'
          });
          return;
      }

      res.json({
        data: {
          id
        }
      });
    }
  );
};
