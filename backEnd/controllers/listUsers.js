import query from '../database.js';

export default (req, res) => {
  query(
      'SELECT idUser, name, surname, username, role FROM User',
      [],
      (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
        }
        res.json({
          data: results
        });
      }
    );
};
