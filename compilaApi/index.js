const express = require('express');
const bodyParser = require('body-parser');
const solc = require('solc');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

app.post('/compile', (req, res) => {
    const { code } = req.body;

    // Configuração de input para o compilador
    var input = {
        language: 'Solidity',
        sources: {
            'Contract.sol': {
                content: code,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
        },
    };

    // Compila o código Solidity
    let compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

    res.send(compiledCode);
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});
