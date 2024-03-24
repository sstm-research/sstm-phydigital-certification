import axios from 'axios';

export async function compileSolidity(solidityCode) {
    // O código Solidity que você quer compilar
    try {
        // Faz a solicitação POST para a API
        const { data } = await axios.post('https://compilaapi.fly.dev/compile', {
            code: solidityCode
        });

        // Aguarda a resposta e converte para JSON

        // Loga a resposta da API
        console.log('Compiled Successfully');
        return data
    } catch (error) {
        // Loga o erro, caso ocorra algum
        console.log('Error compiling Solidity code:', error);
    }
}

