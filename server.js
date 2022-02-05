const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    let name = 'samule';
    let url = req.url;
    if(url ==='/'){
        res.write(`<h1>Hello ${name}</h1>`);
    }else if(url === '/user'){
                res.write(
					`<body>
                        <form action="message" method="POST">
                            <label>User Name</label>
                            <input name="message" type="text"/>
                            <button type="submit">Submit</button>
                        </form>
                    </body>`
				);
    }else if(url ==='/message'){
        const body = []
    
        req.on('data',(chunk)=>{
            body.push(chunk)
        })
        return req.on('end',()=>{
            let str = Buffer.concat(body).toString();
            let message = str.split("=")[1];
            fs.writeFile('message.txt', message,(err)=>{
                if(err){
                    console.log(err);
                }
                console.log(message);
            });
            res.statusCode = 301;
			res.setHeader("Location", "/");
            return res.end()
        })
        
    }
    // console.log(require);
    else{
        res.write('<h1>Page not found</h1>')
		
    }
    res.end();
});


server.listen(3000)