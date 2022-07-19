

const handleRoutes = (req, res) => {
    const url = req.url
    const method = req.method

    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>Assignment 1</title></head>');
        res.write('<body><div>Hello from Nodejs</div>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>Assignment 1</title></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        .on('end', () => {
            const parseBody = Buffer.concat(body).toString()
            console.log(parseBody.split('=')[1]);
            // res.write('<html><head><title>Assignment 1</title></head>');
            // res.write(`<body>${parseBody.split('=')[1]}</body>`);
            // res.write('</html>');
            res.statusCode = 302;
            res.setHeader('Location', '/')
            res.end();
        })
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>Assignment 1</title></head>');
        res.write('<body>Page not found</body>');
        res.write('</html>');
        return res.end();
    }
}

module.exports = handleRoutes;