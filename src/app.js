const {
    CalcularIdade,
    VerificarFaixaEtaria,
    CalcularMetrosParaCentimetros
} = require('./src/scripts/calculadoras');

const verificarEntrada = require('./src/rules/rules');

const argumentos = process.argv.slice(2);
    if (argumentos.length < 5 || argumentos.length > 6) {
    console.log('Erro: informe cinco ou seis argumentos.');
    console.log('Nome, nascimento, altura, brinquedo, visita e, opcionalmente, acompanhante.');
    process.exit(1);
}


const [nome, nascimento, altura, brinquedo, visita, acompanhante] = argumentos;

const alturaMetros = Number(altura);

if (!Number.isFinite(alturaMetros) || alturaMetros <= 0) {
    console.log('Erro: informe uma altura válida em metros.');
    process.exit(1);
}

const idade = CalcularIdade(nascimento, visita);

if (!Number.isInteger(idade) || idade < 0) {
    console.log('Erro: data de nascimento ou visita inválida.');
    process.exit(1);
}

const faixaEtaria = VerificarFaixaEtaria(idade);

const alturaCM = CalcularMetrosParaCentimetros(alturaMetros);

console.log('\n===== PARQUE DE DIVERSÃO =====');

console.log('Nome:', nome);
console.log('Idade:', idade);
console.log('Faixa etária:', faixaEtaria);
console.log('Altura:', alturaCM, 'cm');
console.log('Brinquedo:', brinquedo);
console.log('Data da visita:', visita);

if (faixaEtaria === 'Criança' || faixaEtaria === 'Idoso') {

    if (!acompanhante || acompanhante.trim() === '') {

        console.log('\nEntrada negada!');
        console.log('É obrigatório informar um acompanhante.');

        process.exit(1);
    }

    console.log('Acompanhante:', acompanhante);
}

const pessoa = {
    nome: nome,
    idade: idade,
    altura: alturaCM,
    faixaEtaria: faixaEtaria,
    acompanhante: acompanhante
};
const pessoaJSON = JSON.stringify(pessoa);
const resultado = verificarEntrada(pessoaJSON, brinquedo);
console.log('\n===== RESULTADO =====');

console.log(resultado.mensagem);

if (resultado.autorizado) {
    console.log('Bem-vindo ao parque!');
} else {
    console.log('Acesso não permitido.');
    process.exit(1);
}
