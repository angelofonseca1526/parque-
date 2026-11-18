const dadosParque = require('./rules.json');

function verificarEntrada(dadosPessoaJSON, brinquedoEscolhido) {

    const pessoa = JSON.parse(dadosPessoaJSON);

    const parque = dadosParque.Parque;

    const brinquedos = parque[0].Brinquedos;
    const restricoes = parque[1].Restricoes;

    const brinquedo = brinquedos.find(
        item => item.nome.toLowerCase() === brinquedoEscolhido.toLowerCase()
    );

    if (!brinquedo) {
        return {
            autorizado: false,
            mensagem: 'Erro: brinquedo não encontrado!'
        };
    }

    for (const regra of brinquedo.regras) {

        const limite = restricoes[regra];

        let aprovado = false;

        if (regra === 'Idade') {
            aprovado = pessoa.idade > limite.valor;
        }
        if (regra === 'Altura') {
            aprovado = pessoa.altura >= limite.valor;
        }

        if (!aprovado) {
            return {
                autorizado: false,
                mensagem: `Entrada negada! Requisito não atendido: ${regra}.`
            };
        }
    }

    return {
        autorizado: true,
        mensagem: 'Entrada autorizada! Todos os requisitos foram atendidos.'
    };
}

module.exports = verificarEntrada;
