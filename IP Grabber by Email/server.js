const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/tracking_pixel', (req, res) => {
    const ipAddress = req.ip;
    console.log(`IP Address: ${ipAddress} - Accessed at ${new Date().toISOString()}`);

   //Place its IP to a file
    fs.appendFileSync('ip_access_log.txt', `IP Address: ${ipAddress} - Accessed at ${new Date().toISOString()}\n`);

    // Send a 1x1 pixel GIF image
    const imgBuffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': imgBuffer.length,
    });
    res.end(imgBuffer);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
