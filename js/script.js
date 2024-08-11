var inputNome = document.getElementById("nome")
var inputEmail = document.getElementById("email")
var inputData = document.getElementById("nascimento")
var inputTelefone = document.getElementById("telefone")
var inputPais = document.getElementById("pais")
var inputCidade = document.getElementById("cidade")
var inputEstado = document.getElementById("estado")
var inputCpf= document.getElementById("cpf")
var inputProva1 = document.getElementById("prova1")
var inputProva2 = document.getElementById("prova2")


inputNome.addEventListener("change",ValidarNome)
inputCpf.addEventListener("focus", DesmascararCPF)
inputCpf.addEventListener("input",ValidarCPF)
inputCpf.addEventListener("change", MascararCPF)
inputProva1.addEventListener("change",function (e) {ValidarNota("prova1",e.target)})
inputProva2.addEventListener("change",function (e) {ValidarNota("prova2",e.target)})
inputEmail.addEventListener("change", ValidarEmail);
inputData.addEventListener("change",ValidarDataNascimento)
inputTelefone.addEventListener("input", MascararTelefone)
inputTelefone.addEventListener("change", ValidarTelefone)
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

/**
 * Validações do formulario
 */
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
function ValidarNota(id, input) {
  let errosDiv = document.getElementById(id + "-erro-message")
  errosDiv.innerHTML = ""
  let erros = [""]
  let nota = parseFloat(input.value)
  let esNumero = typeof(nota) == "number"
  if(!esNumero){
    erros.push("Somente numeros são permitidos")
  } 
  let estaEntre = nota >= 0 && nota <= 10
  if(!estaEntre) {
    erros.push("A nota deve ser maior ou igual a 0 e menor ou igual a 10")
  }
  let valido = esNumero && estaEntre
  DisplayInputFeedback(valido, input, errosDiv, erros)
}
function ValidarEmail(){
  let errosDiv = document.getElementById("email-erro-message")
  errosDiv.innerHTML = ""

  let email = inputEmail.value;

  let vazioOuPequeno = (email == null) || (email.length < 4)

  let partes = email.split('@');
  let temDoisPartes = partes.length == 2
  let  primeiraParteValida = false , partesDoDominio = false, dominioComDoisOuMaisPartes = false, partesDominioValidas = [true];
  if(temDoisPartes){
    let pre = partes[0];
    primeiraParteValida = /^[a-zA-Z0-9_.-/+]+$/.test(pre)
    
    partesDoDominio = partes[1].split('.');
    dominioComDoisOuMaisPartes =  partesDoDominio.length >= 2
    if(dominioComDoisOuMaisPartes){
      for ( let indice = 0; indice < partesDoDominio.length; indice++ )
        {
            let parteDoDominio = partesDoDominio[indice];
            if (parteDoDominio.length == 0) {
              partesDominioValidas.push(false);  
              continue
            }
            if (!/^[a-zA-Z0-9-]+$/.test(parteDoDominio)){
              partesDominioValidas.push(false);
              continue
            }
            partesDominioValidas.push(true);
        }
    }
    
  }
  let todasAsPartesValidas =partesDominioValidas.every(e => !!e) 
  let valido =todasAsPartesValidas && !vazioOuPequeno && temDoisPartes && primeiraParteValida && dominioComDoisOuMaisPartes
  if(valido){
    DisplayInputFeedback(true, inputEmail,errosDiv,[])
  }else{
    DisplayInputFeedback(false, inputEmail,errosDiv,["Email Invalido"])

  }
}
function ValidarDataNascimento(){
  let errosDiv = document.getElementById("data-erro-message")
  errosDiv.innerHTML = ""
  let erros = [""]
  const partesData = inputData.value.split('-')
  const data = { 
    ano: partesData[0], 
    mes: partesData[1], 
    dia: partesData[2] 
  }
  
  // Converte strings em número
  const dia = parseInt(data.dia)
  const mes = parseInt(data.mes)
  const ano = parseInt(data.ano)
  let anoValido = ano > 1920 && ano <= 2008 
  if(!anoValido){
    erros.push("O Ano de nascimento deve estar entre 1920 e 2008")
  }
  let valido = anoValido
  DisplayInputFeedback(valido, inputData, errosDiv, erros)
}
function ValidarTelefone(){
  // Remove caracteres não numéricos
  let telefone = inputTelefone.value;
  telefone = telefone.replace(/[^\d]+/g, "");
  let errosDiv = document.getElementById("telefone-erro-message")
  errosDiv.innerHTML = ""
  erros = []

  let tamanhoCorreto = telefone.length === 10 || telefone.length === 11
  let numeroValido = false
  if(!tamanhoCorreto) erros.push("Telefone deve ter 10 ou 11 numeros")
  // Verifica se o telefone tem 10 ou 11 dígitos
  else if (tamanhoCorreto) {
    // Verifica se os dois primeiros dígitos são válidos (DDD)
    const ddd = telefone.substring(0, 2);
    if (/^\d{2}$/.test(ddd)) {
      // Verifica se o número de telefone é válido
      const numero = telefone.substring(2);
      if (/^\d{8}$/.test(numero) || /^\d{9}$/.test(numero)) {
        numeroValido = true;
      }
      else{
        erros.push("Número Inválido")
      }
    }
    else{
      erros.push("DDD inválido")
    }
    
  }
  let valido = tamanhoCorreto 
  DisplayInputFeedback(valido, inputTelefone, errosDiv, erros)

}
function MascararTelefone(){
  let value = inputTelefone.value;
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  inputTelefone.value = value;
}

inputCidade.addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
});
inputEstado.addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
});



function DesmascararCPF(){
  if(inputCpf.mascarado){
    inputCpf.value = inputCpf.value.replace(/\./g, "")
    inputCpf.value = inputCpf.value.replace(/\-/, "")
    inputCpf.mascarado = false;
  } 
}

function MascararCPF() {
  inputCpf.mascarado = true;
  inputCpf.value = inputCpf.value.replace(/(\d{3})(\d)/, "$1.$2");
  inputCpf.value = inputCpf.value.replace(/(\d{3})(\d)/, "$1.$2");
  inputCpf.value = inputCpf.value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/*Funções de validação*/

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



function ativaDesativaEnviar(valor) {
  valor === true
    ? document.getElementById("enviar").removeAttribute("disabled")
    : document.getElementById("enviar").setAttribute("disabled", true);
}


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

function exportCSV(){

  const header = new Array(Object.keys(new Studant))
  const rows = students.map((student) => {return Object.values(student);} )

  const tabla = header.concat(rows)
  
  const csvContent = "data:text/csv;charset=utf-8," 
  + tabla.map(e => e.join(";")).join("\n");
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}