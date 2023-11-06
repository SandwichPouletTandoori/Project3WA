import database from '../database.js';

const Products = (req, res) => {
  // Define your SQL query
  const query = 'SELECT * FROM Products';

  // Execute the query using your MySQL connection
  database(query, [], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error fetching data from the database');
    } else {
      // Send the result (an array of products) as a JSON response
      res.json(result);
    }
  });
};

export { Products };