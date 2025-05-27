const e1 = require('express');
const app = e1();

//SEARCH API
app.get('/search', (req, res) => {
    res.send('<html><body>INSIDE SEARCH API..</body></html>');
});

//VIEW API
app.get('/view', (req, res) => {
    res.send('<html><body>INSIDE VIEW API..</body></html>');
});

// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(5000, () =>
    console.log('EXPRESS Server Started at Port No: 5000'));