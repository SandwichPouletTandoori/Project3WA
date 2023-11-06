import xss from 'xss';
import { v4 } from 'uuid';
import query from '../database.js';

export default (req, res) => {
  const { idUser, textComment } = req.body;
  if (!idUser || !textComment) {
    res.status(400).json({
      error: 'Error Request',
    });
    return;
  }

  const comment = {
    idComment: v4(),
    idUser: idUser,
    textComment: xss(textComment),
  };

  query(
    'INSERT INTO Comment (idComment, idUser, textComment) VALUES (?, ?, ?)',
    [comment.idComment, comment.idUser, comment.textComment],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          error: 'Internal Server Error',
        });
        return;
      }

      res.status(201).json({
        data: {
          idComment: comment.idComment, 
        },
      });
    }
  );
};