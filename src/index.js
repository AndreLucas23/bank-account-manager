const prompt = require('prompt-sync')();

// Importação das classe criadas para as diferentes contas
const Conta = require('./conta');
const ContaCorrente = require('./conta-corrente');
const ContaPoupanca = require('./conta-poupanca');

// Declaração das variáveis globais do projeto
const opcoes = [
    'Acessar a conta simples',
    'Criar uma conta corrente',
    'Criar uma conta poupança',
    'Sair'
];

let contaCorrente;
let contaPoupanca;

// Criação da função que pede a senha já criada pelo
// usuário para a realização de uma tarefa
function checarSenha(senha) {
    if (senha === prompt('Digite sua senha para a confirmação: ')) {
        return true;
    }
    console.log();
    console.log('A senha está incorreta');
    return false;
}

// Criação da função que exibe as opções do menu principal
function exibirOpcoes() {
    console.log();
    opcoes.forEach((opcao, indice) => {
        console.log(`${indice + 1}) ${opcao}`);
    })
    return +prompt('Escolha um número de opção: ');
}

// Criação da função que exibe as opções do menu da conta simples
function exibirOpcoesSimples() {
    const opcoesSimples = [
        'Depositar saldo',
        'Sacar saldo',
        'Exibir saldo',
        'Sair'
    ];

    console.log()
    opcoesSimples.forEach((opcao, indice) => {
        console.log(`${indice + 1}) ${opcao}`);
    })

    return +prompt('Digite um número de opção: ');
}

// Criação da função que exibe as opções da conta, a depender
// se é corrente ou poupança
function exibirOpcoesPorConta(tipoConta) {
    const opcoesConta = [
        'Depositar saldo',
        'Sacar saldo',
        'Exibir saldo',
        tipoConta === 'corrente' ? 'Aplicar juros' : 'Aplicar rendimento',
        'Sair'
    ];

    console.log();
    opcoesConta.forEach((opcao, indice) => {
        console.log(`${indice + 1}) ${opcao}`);
    })

    return +prompt('Digite um número de opção: ')
}

// Criação da função que recebe a recebe um número do usuário para a escolha da opção já exibida por um menu
// É uma função que suporta qualquer tipo de conta
function processarComandoConta(conta, tipoConta) {
    const comandoConta = tipoConta === 'simples' ? exibirOpcoesSimples() : exibirOpcoesPorConta()

    // O input "1" realiza o depósito de um saldo específico em qualquer tipo de conta
    // a menos que o valor inserido seja negativo
    if (comandoConta === 1 && checarSenha(senha)) {
        valorADepositar = +prompt('Digite o valor a ser depositado na conta: R$').replace(',','.');

        if (verificarValor(valorADepositar)) {
            conta.depositar(valorADepositar);
            console.log();
            console.log('O valor foi depositado na sua conta!');
        } else {
            console.log();
            console.warn('Não é possível depositar valores nulos ou negativos');
        }
    // O input "2" realiza o saque de um saldo específico em qualquer tipo de conta,
    // a menos que o valor inserido seja negativo
    } else if (comandoConta === 2 && checarSenha(senha)) {
        valorASacar = +prompt('Digite o valor a ser sacado da conta: R$').replace(',','.');

        if (verificarValor(valorASacar)) {
            console.log();
            console.log('O valor foi sacado da sua conta!');
        } else {
            console.log();
            console.warn('Não é possível sacar valores nulos ou negativos');
        }
    // O input "3" exibe o saldo da conta atual no console
    } else if (comandoConta === 3 && checarSenha(senha)) {
        console.log();
        console.log(`Saldo atual (${tipoConta === 'simples' ? 'conta simples' : tipoConta === 'corrente' ? 'conta corrente' : 'conta poupança'}): R$${conta.saldo}`);
    // Nas contas corrente e poupança, o input "4" aplica, respectivamente, juros e rendimento
    } else if (comandoConta === 4 && tipoConta !== 'simples' && checarSenha(senha)) {
        tipoConta === 'corrente' ? conta.aplicarJuros() : conta.aplicarRendimento()
        console.log();
        console.log('Investimento aplicado!');
    // Na conta simples, o input "4" sai do menu atual
    } else if (comandoConta === 4 && tipoConta === 'simples') {
        return;
    // Nas contas corrente e poupança, o input "5" sai do menu atual
    } else if (comandoConta === 5 && (tipoConta === 'corrente' || tipoConta === 'poupanca')) {
        return;
    // Caso nenhum dos inputs acima seja o inserido, a ação é tratada como um erro
    } else {
        exibirErro();
    }
}

// Criação da função simples que informa ao usuário que um erro ocorreu na inserção de um número para um menu de opções
function exibirErro() {
    console.log()
    console.warn('Por favor, digite um valor válido')
}

// Criação da função que verifica se o valor a ser
// sacado ou depositado não é nulo ou negativo
function verificarValor(valor) {
    if (valor <= 0) {
        return false
    }
    return true
}

// Declaração das variáveis globais próprias do usuário
const titular = prompt('Digite o nome do titular da conta: ')
const contaSimples = new Conta(titular);
const senha = prompt('Digite uma senha: ');

console.log();
console.log(`Olá, ${titular}!`);
console.log('Sua conta foi criada!');

// Criação de um loop while que permanentemente exibe o menu principal após a execução de uma ação
while (true) {
    // Exibição do menu principal e recolhimento do número digitado pelo usuário
    let comando = exibirOpcoes();

    // Tratamento diferenciado de cada opção numérica do usuário
    // O input "1" exibe o menu da conta simples já criada e opera a partir da resposta do usuário
    if (comando === 1) {
        processarComandoConta(contaSimples, 'simples');
    } else if (comando === 2) {
        // Caso a conta-corrente ainda não tenha sido criada,
        // o input "2" a cria
        if (!contaCorrente) {
            contaCorrente = new ContaCorrente(titular);

            console.log();
            console.log(`Sua conta corrente, com uma taxa de juros de ${((contaCorrente.juros * 100).toFixed(2))}% ao mês, foi criada!`);
            opcoes[1] = 'Acessar a conta corrente';
        // Caso a conta-corrente já tenha sido criada,
        // exibe seu menu de ações e opera a partir da resposta do usuário
        } else {
            processarComandoConta(contaCorrente, 'corrente');
        }
    } else if (comando === 3) {
        // Caso a conta-poupança ainda não tenha sido criada,
        // o input "3" a cria
        if (!contaPoupanca) {
            contaPoupanca = new ContaPoupanca(titular);

            console.log();
            console.log(`Sua conta poupança, com um rendimento de ${((contaPoupanca.rendimento * 100).toFixed(2))}% ao mês, foi criada!`);
            opcoes[2] = 'Acessar a conta poupança';
        // Caso a conta-poupança já tenha sido criada,
        // exibe seu menu de ações e opera a partir da resposta do usuário
        } else {
            processarComandoConta(contaPoupanca, 'poupanca');
        }
    // O input "4" encerra a execução do programa
    } else if (comando === 4) {
        process.exit();
    // Caso nenhum dos inputs acima seja o inserido, a ação é tratada como um erro
    } else {
        exibirErro();
    }
}
