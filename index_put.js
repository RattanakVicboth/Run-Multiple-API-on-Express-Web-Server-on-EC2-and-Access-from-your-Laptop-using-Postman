const e1 = require('express');
const app = e1();

//UPDATE API
app.put('/updateprofile', (req, res) => {
    res.send('<html><body>INSIDE UPDATE PROFILE API..</body></html>');
});

// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(5000, () =>
    console.log('EXPRESS Server Started at Port No: 5000'));



