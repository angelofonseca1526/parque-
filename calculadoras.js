function CalcularIdade(dataNascimento, dataIngresso) {
    const nascimento = new Date(dataNascimento);
    const ingresso = new Date(dataIngresso);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const aindaNaoFezAniversario =
        hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() &&
         hoje.getDate() < nascimento.getDate());

    if (aindaNaoFezAniversario) {
        idade--;
    }

    return idade;
}

function VerificarFaixaEtaria(idade) {
    if (idade < 14) return "Criança";
    if (idade < 18) return "Jovem";
    if (idade < 60) return "Adulto";

    return "Idoso";
}

function CalcularMetrosParaCentimetros(altura) {
    return altura * 100;
}

module.exports = {
    CalcularIdade,
    VerificarFaixaEtaria,
    CalcularMetrosParaCentimetros
};
