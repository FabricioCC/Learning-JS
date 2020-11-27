class ValidaCPF {
    
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, '')
    });
  }
    
    
  //verifica se os digitos estao em sequencia
  ehSequência() {
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
  }

  //gera um cpf valido pra ser comparado com o que quer conferir se eh valido
  geraNovoCpf() {
    
    //usa o slice para armazenar o cpf sem os digitos
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    
    //gera o digito 1
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
    //gera o digito 2
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
    this.novoCPF = cpfSemDigitos + digito1 + digito2;
  }

  static geraDigito(cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;

    //vai multiplicando em ordem decrescente
    for(let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }

    //o digito sera 11 menos o resto da divisao do total armazenado por 11
    const digito = 11 - (total % 11);
    
    return digito <= 9 ? String(digito) : '0';
  }

  valida() {

    if(!this.cpfLimpo || typeof this.cpfLimpo !== 'string') return false
    
    if(this.cpfLimpo.length !== 11) return false;
    
    if(this.ehSequência()) return false;
    
    this.geraNovoCpf();

    return this.novoCPF === this.cpfLimpo;
  }
}

let validacpf = new ValidaCPF('070.987.720-03');
// validacpf = new ValidaCPF('999.999.999-99');

if (validacpf.valida()) {
  console.log('CPF válido');
} else {
  console.log('CPF inválido');
}
