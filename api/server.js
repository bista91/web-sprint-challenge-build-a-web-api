const app = require('../index');  // Importing from the root index.js
const port = process.env.PORT || 9000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
