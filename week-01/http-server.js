const http = require('node:http');

const servidoresDados = {
    1: { id: 123, nome: 'lanceta',  nascimento: '23/02/1989', rubrica: 'R998' },
    2: { id: 456, nome: 'Coronel', nascimento: '02/08/1971', rubrica: 'R600' }
};

http
    .createServer((req, res) => {
        req.on('error', err => {
            console.error(err);
            res.statusCode = 400;
            res.end()
        });

        res.on('error', err => {
            console.error(err);
        });

        if (req.url === '/servidores') {
            if (req.method === 'GET') {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(servidoresDados));
            
            } else if (req.method === 'POST') {
                let body = [];
                req.on('data', chuck => body.push(chuck));
                req.on('end', () => {
                    try {
                        const dado = JSON.parse(Buffer.concat(body).toString());
                        const novoId = Object.keys(servidoresDados).length + 1;
                        servidoresDados[novoId] = dado;
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(dado));
                    }  catch (e) {
                        res.statusCode = 400;
                        res.end('JSON inválido')
                    }
                });
            } else {
                res.statusCode = 405;
                res.end();
            }
        } else {
            res.statusCode = 404;
            res.end('Rota não encontrada');
        }
    })
.listen(8080)


// curl -X GET http://localhost:8080/servidores
// result : {"1":{"id":123,"nome":"lanceta","nascimento":"23/02/1989","rubrica":"R998"},"2":{"id":456,"nome":"Coronel","nascimento":"02/08/1971","rubrica":"R600"}}

// curl -X POST http://localhost:8080/servidores \
//   -H "Content-Type: application/json" \
//   -d '{
//     "3": {
//       "id": 987,
//       "nome": "Carlos Mendes",
//       "nascimento": "10/05/1980",
//       "rubrica": "R310"
//     },
//     "4": {
//       "id": 741,
//       "nome": "Fernanda Costa",
//       "nascimento": "28/09/1991",
//       "rubrica": "R455"
//     },
//     "5": {
//       "id": 852,
//       "nome": "Ricardo Alves",
//       "nascimento": "14/12/1987",
//       "rubrica": "R720"
//     }
//   }'

//   result : curl -X GET http://localhost:8080/servidores
//         {"1":{"id":123,"nome":"lanceta","nascimento":"23/02/1989","rubrica":"R998"},
//         "2":{"id":456,"nome":"Coronel","nascimento":"02/08/1971","rubrica":"R600"},
//         "3":{"3":{"id":987,"nome":"Carlos Mendes","nascimento":"10/05/1980","rubrica":"R310"},
//         "4":{"id":741,"nome":"Fernanda Costa","nascimento":"28/09/1991","rubrica":"R455"},
//         "5":{"id":852,"nome":"Ricardo Alves","nascimento":"14/12/1987","rubrica":"R720"}}}
