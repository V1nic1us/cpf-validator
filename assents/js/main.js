const messageContainer = document.querySelector('.messageContainer');
const urlParams = new URLSearchParams(window.location.search);
const cpfUrl= urlParams.get('cpf')
console.log(cpfUrl);
const cpf = new validateCpf(urlParams.get('cpf'));

function validateCpf(cpfSent) {
  Object.defineProperty(this, 'cpfClear', {
    enumerable: true,
    get: function() {
      return cpfSent.replace(/\D+/g, '');
    },
  });
}

validateCpf.prototype.validate= function() {
  if (typeof this.cpfClear === "undefined") return false;
  if (this.cpfClear.length !== 11) return false;
  if (this.isSequential(this.cpfClear)) return false;
  const partialCpf = this.cpfClear.slice(0,-2);
  const partialCpf2 = this.cpfClear.slice(0,-1);
  const digit1 = this.createDigit1(partialCpf);
  const digit2 = this.createDigit2(partialCpf2);
  const fullCpf = partialCpf + String(digit1) + String(digit2);
    return fullCpf === this.cpfClear;
}

validateCpf.prototype.isSequential = function (cpfClear) {
  const sequential = this.cpfClear[0].repeat(this.cpfClear.length);
  return sequential === this.cpfClear;
}

validateCpf.prototype.createDigit1= function (cpfParcial) {   
    let cont =0;
    let digit1 = Array.from(cpfParcial).reduce((accumulator, value, index) => {
      cont = (10-index)* Number(value);
      console.log(cont,10-index, Number(value), accumulator);
      return accumulator + cont;
    },0);
    console.log(digit1);
    digit1 = 11 - (digit1 % 11) <= 9 ? 11 - (digit1 % 11) : 0;
    console.log('digito1 ---> ',digit1);
    return digit1;
  }
  
  validateCpf.prototype.createDigit2= function (partialCpf2) {   
    let cont =0;
    let digit2 = Array.from(partialCpf2).reduce((accumulator, value, index) => {
      cont = (11-index)* Number(value);
      console.log(cont,11-index, Number(value), accumulator);
      return accumulator + cont;
    },0)
    console.log(digit2);
  console.log(11 - (digit2 % 11));
  digit2 = 11 - (digit2 % 11) <= 9 ? 11 - (digit2 % 11) : 0;
  console.log('digito2 ---> ',digit2);
  return digit2;
}

// const cpf = new validateCpf('005.186.322.70');
// console.log(cpf.validate());
const message = cpf.validate();
response(message);
function response(message) {
  console.log(message);
  if (message) messageContainer.innerHTML='cpf valido';
  else messageContainer.innerHTML='cpf invalido';
}