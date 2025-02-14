const display = document.querySelector(".display");
const teclas = document.querySelector(".teclas");

let operadorAtual = "";
let numeroAtual = "";
let numeroAnterior = "";

teclas.addEventListener("click", (e) => {
  const botao = e.target;

  if (botao.classList.contains("numeros")) {
    adicionarNumero(botao.textContent);
  } else if (botao.classList.contains("operador")) {
    escolherOperador(botao.textContent);
  } else if (botao.classList.contains("decimal")) {
    adicionarDecimal();
  } else if (botao.classList.contains("limpar")) {
    limpar();
  } else if (botao.classList.contains("igual")) {
    calcular();
  }
});

function adicionarNumero(numero) {
  if (numeroAtual.length < 10) {
    numeroAtual += numero;
    atualizarDisplay();
  }
}

function escolherOperador(operador) {
  if (numeroAtual === "") return;

  if (numeroAnterior !== "") {
    calcular();
  }

  operadorAtual = operador;
  numeroAnterior = numeroAtual;
  numeroAtual = "";
  atualizarDisplay();
}

function adicionarDecimal() {
  if (!numeroAtual.includes(".")) {
    numeroAtual += ".";
    atualizarDisplay(numeroAtual);
  }
}

function limpar() {
  numeroAtual = "";
  numeroAnterior = "";
  operadorAtual = "";
  atualizarDisplay("0");
}

function calcular() {
  if (numeroAtual === "" || numeroAnterior === "") return;

  let resultado;
  const num1 = parseFloat(numeroAnterior);
  const num2 = parseFloat(numeroAtual);

  switch (operadorAtual) {
    case "+":
      resultado = num1 + num2;
      break;
    case "-":
      resultado = num1 - num2;
      break;
    case "*":
      resultado = num1 * num2;
      break;
    case "÷":
      resultado = num2 !== 0 ? num1 / num2 : "Erro";
      break;
    default:
      return;
  }

  numeroAtual = resultado.toString().slice(0, 10);
  operadorAtual = "";
  numeroAnterior = "";
  atualizarDisplay();
}

function atualizarDisplay() {
  if (numeroAnterior && operadorAtual) {
    display.textContent = `${numeroAnterior} ${operadorAtual} ${numeroAtual}`;
  } else {
    display.textContent = numeroAtual || "0";
  }
}
