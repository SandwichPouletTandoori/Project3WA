import Comment from '../controllers/addComment.js';

const Contact = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const allComments = await Comment.findAll();
      res.json(allComments);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    const { text } = req.body;

    if (text) {
      try {
        const newComment = await Comment.create({ text });
        res.status(201).json(newComment);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    } else {
      res.status(400).json({ error: 'Bad Request' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export { Contact };