var inputNome = document.getElementById("nome")
var inputEmail = document.getElementById("email")
var inputData = document.getElementById("data")
var inputTelefone = document.getElementById("telefone")
var inputPais = document.getElementById("pais")
var inputCidade = document.getElementById("cidade")
var inputEstado = document.getElementById("estado")
var inputCpf= document.getElementById("cpf")
var inputProva1 = document.getElementById("prova1")
var inputProva2 = document.getElementById("prova2")


inputNome.addEventListener("change",ValidarNome);
inputCpf.addEventListener("focus", DesmascararCPF)
inputCpf.addEventListener("input",ValidarCPF)

function DisplayInputFeedback(valido, input, errosDiv, erros){
  if(valido){
    errosDiv.style.display = "none";
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
  }
  else {
    errosDiv.style.display = "block";
    input.classList.add("is-invalid")
    input.classList.remove("is-valid")
    
    erros.forEach(element => {
      if(element != "") {
        let p = document.createElement("p");
        p.textContent = element
        errosDiv.appendChild(p);
      }
  
    });
  }
}

function ValidarNome(){
  let errosDiv = document.getElementById("nome-erro-message")
  errosDiv.innerHTML = ""
  let erros = [""]
  let temAlgo = validarVazio(inputNome.value);
  if (!temAlgo) {
    erros.push("Não Pode estar Vazío")
  } 
  let temSomenteLetras = validarSeNaotemNumeros(inputNome.value)
  if (!temSomenteLetras) {
    erros.push("Nome não pode ter números")
  } 
  
  let temTamanhoMin = validarMinLength(inputNome.value,3)
  if (!temTamanhoMin) {
   erros.push("Nome deve ter mais de 2 letras")
  } 

  let valido = temAlgo && temSomenteLetras && temTamanhoMin
  DisplayInputFeedback(valido, inputNome, errosDiv, erros)
}

function ValidarCPF(){
  let errosDiv = document.getElementById("cpf-erro-message")
  errosDiv.innerHTML = ""
  let erros = [""]
  let somenteNumeros = /^[0-9]*$/.test(inputCpf.value);
  if (!somenteNumeros) {
    erros.push("Não Pode ter letras")
    inputCpf.value = inputCpf.value.slice(0, -1);
  } 

  let correctLength = inputCpf.value.length == 11;
  if(!correctLength) erros.push("CPF deve ter 11 digitos")
  
  // Remove caracteres não numéricos
  cpf = inputCpf.value;
  cpf = cpf.replace(/[^\d]+/g, "");

  let validCPF =true;
  // Valida os dígitos verificadores
  for (let t = 9; t < 11; t++) {
    let d = 0;
    for (let i = 0; i < t; i++) {
      d += cpf[i] * (t + 1 - i);
    }
    d = ((10 * d) % 11) % 10;
    if (cpf[t] != d){
      validCPF = false;
      erros.push("CPF Inválido")
      break;
    }  
  }
    
  let valido = somenteNumeros && correctLength && validCPF
  DisplayInputFeedback(valido, inputCpf, errosDiv, erros)
}

inputCpf.addEventListener("change", function (e) {
  e.target.value = mascararCPF(e.target.value);
});

inputProva1.addEventListener("change", function (e) {
  ativaDesativaEnviar(validarNumero(e.target.value));
});
inputProva2.addEventListener("change", function (e) {
  ativaDesativaEnviar(validarNumero(e.target.value));
});

inputEmail.addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
});
inputTelefone.addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
  e.target.value = mascaraTelefone(e.target.value);
  ativaDesativaEnviar(validarTelefone(e.target.value));
});
inputCidade.addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
});
inputEstado.addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
});

const students = [];

class Studant {
  constructor(
    nome,
    cpf,
    nascimento,
    email,
    telefone,
    pais,
    estado,
    cidade,
    prova1,
    prova2
  ) {
    this.nome = nome;
    this.cpf = cpf;
    this.nascimento = nascimento;
    this.email = email;
    this.telefone = telefone;
    this.pais = pais;
    this.estado = estado;
    this.cidade = cidade;
    this.prova1 = prova1;
    this.prova2 = prova2;
    this.media = (prova1 + prova2) / 2;
    this.situacao = this.media >= 5 ? "aprovado" : "reprovado";
  }

  exibeDados() {
    return `O Aluno ${this.nome} tirou nota ${this.prova} na P1 e ${
      this.prova2
    } na P2. Sua média é: ${this.media.toString().replace(".", ",")} e esta ${
      this.situacao
    }`;
  }
}

function enviarFormulario() {
  const nome = inputNome.value;
  const cpf = inputCpf.value;
  const nascimento = inputData.value;
  const email = inputEmail.value;
  const telefone = inputTelefone.value;
  const pais = inputPais.value;
  const estado = inputEstado.value;
  const cidade = inputCidade.value;
  const prova1 = parseFloat(inputProva1.value);
  const prova2 = parseFloat(inputProva2.value);

  const student = new Studant(
    nome,
    cpf,
    nascimento,
    email,
    telefone,
    pais,
    estado,
    cidade,
    prova1,
    prova2
  );

  students.push(student);

  renderData();

  function renderData() {
    const studentTableBody = document.getElementById("studentTableBody");
    studentTableBody.innerHTML = "";

    students.forEach((student) => {
      const row = document.createElement("tr");
      Object.values(student).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        studentTableBody.appendChild(cell);
      });
      studentTableBody.appendChild(row);
    });
  }
}

function DesmascararCPF(){
  if(inputCpf.mascarado){
    inputCpf.value = inputCpf.value.replace(/\./g, "")
    inputCpf.value = inputCpf.value.replace(/\-/, "")
    inputCpf.mascarado = false;
  } 
}



/*Funções de validação*/
function validarNumero(numero) {
  // Verifica se o número está entre 0 e 10
  if (numero >= 0 && numero <= 10) {
    return true;
  } else {
    return false;
  }
}
function validarMinLength(input, min){
  return input.length >= min 
}
function validarSeNaotemNumeros(input){
  return !/[0-9]/.test(input)
}
function validarVazio(campo) {
  // Verifica se o campo não está vazio
  if (campo.trim() !== "") {
    return true;
  } else {
    return false;
  }
}

function validarTelefone(telefone) {
  // Remove caracteres não numéricos
  telefone = telefone.replace(/[^\d]+/g, "");

  // Verifica se o telefone tem 10 ou 11 dígitos
  if (telefone.length === 10 || telefone.length === 11) {
    // Verifica se os dois primeiros dígitos são válidos (DDD)
    const ddd = telefone.substring(0, 2);
    if (/^\d{2}$/.test(ddd)) {
      // Verifica se o número de telefone é válido
      const numero = telefone.substring(2);
      if (/^\d{8}$/.test(numero) || /^\d{9}$/.test(numero)) {
        return true;
      }
    }
  }
  return false;
}

function ativaDesativaEnviar(valor) {
  valor === true
    ? document.getElementById("enviar").removeAttribute("disabled")
    : document.getElementById("enviar").setAttribute("disabled", true);
}


function mascararCPF(input) {
  inputCpf.mascarado = true;
  input = input.replace(/(\d{3})(\d)/, "$1.$2");
  input = input.replace(/(\d{3})(\d)/, "$1.$2");
  input = input.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return input;
}
function mascaraTelefone(telefone) {
  // Remove caracteres não numéricos
  telefone = telefone.replace(/[^\d]+/g, "");

  // Verifica se o telefone tem 10 ou 11 dígitos
  if (telefone.length === 10) {
    // Formato para telefone com 8 dígitos
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (telefone.length === 11) {
    // Formato para telefone com 9 dígitos
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else {
    // Retorna o telefone original se não tiver 10 ou 11 dígitos
    return telefone;
  }
}
function exportCSV(){

  const header = new Array(Object.keys(new Studant))
  const rows = students.map((student) => {return Object.values(student);} )

  const tabla = header.concat(rows)
  
  const csvContent = "data:text/csv;charset=utf-8," 
  + tabla.map(e => e.join(";")).join("\n");
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}