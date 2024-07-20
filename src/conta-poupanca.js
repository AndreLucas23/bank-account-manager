const Conta = require('./conta');

// Criação da classe-filha que herda as características da classe "conta" e
// implementa adicionais de uma conta-poupança bancária
class ContaPoupanca extends Conta {
    constructor(titular) {
        super(titular);
        this.saldo = 0;
        // Rendimento baseado em uma média mensal de bancos reais
        this.rendimento = 0.0153;
    }

    // O método "aplicarRendimento()" soma o saldo da conta em
    // questão pela taxa de rendimento multiplicada pelo mesmo saldo
    aplicarRendimento() {
        this.saldo += (this.saldo * this.rendimento);
    }
}

module.exports = ContaPoupanca;
