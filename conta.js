// Criação da classe-pai que representa a conta bancária simples e primária do projeto
class Conta {
    constructor(titular) {
        this.titular = titular;
        // O saldo de todas as contas criadas se inicia em R$0,00
        this.saldo = 0;
    }

    // O método "depositar()"" adiciona um valor especificado
    // ao saldo da conta em questão
    depositar(valor) {
        this.saldo += valor;
    }

    // O método "sacar()" subtrai um valor especificado
    // ao saldo da conta em questão
    sacar(valor) {
        this.saldo -= valor;
    }
}

module.exports = Conta;
