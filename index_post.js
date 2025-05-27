const e1 = require('express');
const app = e1();

//REG API
app.post('/registration', (req, res) => {
    res.send('<html><body>INSIDE REGISTRATION API..</body></html>');
});

app.post('/login', (req, res) => {
    res.send('<html><body>INSIDE LOGIN API..</body></html>');
});

// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(5000, () =>
    console.log('EXPRESS Server Started at Port No: 5000'));