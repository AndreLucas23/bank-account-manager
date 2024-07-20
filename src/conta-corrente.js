const Conta = require('./conta');

// Criação da classe-filha que herda as características da classe "conta" e
// implementa adicionais de uma conta-corrente bancária
class ContaCorrente extends Conta {
    constructor(titular) {
        super(titular);
        this.saldo = 0;
        // Juros baseados em uma média mensal de bancos reais
        this.juros = 0.0794;
    }

    // O método "aplicarJuros()" soma o saldo da conta em
    // questão pela taxa de juros multiplicada pelo mesmo saldo
    aplicarJuros() {
        this.saldo += (this.saldo * this.juros);
    }
}

module.exports = ContaCorrente;
