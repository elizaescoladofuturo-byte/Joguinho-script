
const questions = [
    {
        topic: "Arrays",

        question: "O que é um array em JavaScript?",

        options: [
            "Uma estrutura que guarda vários valores em uma única variável.",
            "Um comando usado somente para mostrar mensagens.",
            "Uma condição que verifica se algo é verdadeiro.",
            "Uma função que repete o código automaticamente."
        ],

        answer: 0,

        explanation:
            "Um array armazena uma lista de valores, acessados por índices."
    },

    {
        topic: "Variáveis",

        question: "O que é uma variável e para que ela serve?",

        options: [
            "É uma tag HTML usada para criar imagens.",
            "É um espaço nomeado que armazena um valor que o programa pode usar.",
            "É um operador que soma dois números.",
            "É uma repetição que executa um bloco várias vezes."
        ],

        answer: 1,

        explanation:
            "Variáveis guardam dados para serem usados durante a execução do programa."
    },

    {
        topic: "Operadores Aritméticos",

        question: "Para que servem os operadores aritméticos?",

        options: [
            "Para criar estilos e cores em uma página.",
            "Para comparar textos e números apenas.",
            "Para realizar cálculos, como soma, subtração, multiplicação e divisão.",
            "Para armazenar vários valores em uma lista."
        ],

        answer: 2,

        explanation:
            "Os operadores +, -, *, / e % são exemplos de operadores aritméticos."
    },

    {
        topic: "Operadores Lógicos",

        question: "O que os operadores &&, || e ! significam?",

        options: [
            "Somar, subtrair e multiplicar.",
            "Criar arrays, variáveis e funções.",
            "Repetir, parar e reiniciar.",
            "E (AND), OU (OR) e NÃO (NOT)."
        ],

        answer: 3,

        explanation:
            "&& exige ambas as condições, || aceita uma delas e ! inverte o valor lógico."
    },

    {
        topic: "Condicionais",

        question: "Quando o código dentro de um if é executado?",

        options: [
            "Sempre que a página é aberta.",
            "Quando a condição do if é verdadeira.",
            "Somente quando existe um array.",
            "Quando a condição é sempre falsa."
        ],

        answer: 1,

        explanation:
            "O if executa seu bloco quando a condição avaliada é verdadeira."
    },

    {
        topic: "Estrutura de repetição for",

        question: "Quais são as três partes comuns de um for?",

        options: [
            "Variável, array e função.",
            "HTML, CSS e JavaScript.",
            "Início, condição e passo.",
            "Entrada, saída e resultado."
        ],

        answer: 2,

        explanation:
            "O for normalmente define inicialização, condição e atualização (passo)."
    },

    {
        topic: "Funções",

        question: "O que é uma função em JavaScript?",

        options: [
            "Um bloco de código reutilizável que pode executar uma tarefa.",
            "Uma imagem que aparece no navegador.",
            "Um tipo de operador aritmético.",
            "Uma variável que só guarda números."
        ],

        answer: 0,

        explanation:
            "Funções organizam tarefas e podem ser chamadas sempre que necessário."
    }
];

// Variáveis do jogo

let currentQuestion = 0;
let points = 0;
let answered = false;


// Elementos HTML

const questionCount =
    document.getElementById("questionCount");

const score =
    document.getElementById("score");

const progressBar =
    document.getElementById("progressBar");

const topic =
    document.getElementById("topic");

const questionText =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const feedback =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextButton");

const quiz =
    document.getElementById("quiz");

const result =
    document.getElementById("result");


// Mostrar pergunta

function showQuestion() {

    answered = false;

    const item = questions[currentQuestion];

    questionCount.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    score.textContent = `Pontos: ${points}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    topic.textContent = item.topic;

    questionText.textContent = item.question;

    answers.innerHTML = "";

    feedback.textContent = "";

    feedback.className = "feedback";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "Ver resultado »"
        : "Próxima pergunta »";


    // Criar alternativas

    item.options.forEach(function(option, index) {

        const button = document.createElement("button");

        button.className = "answer";

        button.textContent =
            `${String.fromCharCode(65 + index)}) ${option}`;

        button.addEventListener("click", function() {

            chooseAnswer(index, button);

        });

        answers.appendChild(button);

    });

}


// Verificar resposta

function chooseAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const item = questions[currentQuestion];

    const allButtons =
        answers.querySelectorAll(".answer");


    // Desativar todas as alternativas

    allButtons.forEach(function(button) {

        button.disabled = true;

    });


    // Verificar se acertou

    if (selected === item.answer) {

        points++;

        selectedButton.classList.add("correct");

        feedback.textContent =
            `✓ Resposta correta! ${item.explanation}`;

        feedback.classList.add("good");

    } else {

        selectedButton.classList.add("wrong");

        allButtons[item.answer].classList.add("correct");

        feedback.textContent =
            `✗ Não foi dessa vez. ${item.explanation}`;

        feedback.classList.add("bad");

    }


    // Atualizar pontuação

    score.textContent = `Pontos: ${points}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.disabled = false;

}


// Próxima pergunta

function nextQuestion() {

    if (!answered) return;

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }

}


// Mostrar resultado final

function showResult() {

    quiz.classList.add("hidden");

    result.classList.remove("hidden");

    document.getElementById("finalScore").textContent =
        `${points}/${questions.length}`;

    let message;


    if (points === questions.length) {

        message =
            "Incrível! Você acertou todas as perguntas!";

    } else if (points >= 5) {

        message =
            "Mandou muito bem! Você conhece bastante JavaScript.";

    } else if (points >= 3) {

        message =
            "Bom trabalho! Continue praticando para dominar esses conceitos.";

    } else {

        message =
            "Continue estudando! Revise os temas e tente novamente.";

    }


    document.getElementById("resultMessage").textContent =
        message;

}


// Reiniciar o jogo

function restartGame() {

    currentQuestion = 0;

    points = 0;

    result.classList.add("hidden");

    quiz.classList.remove("hidden");

    showQuestion();

}


// Eventos dos botões

nextButton.addEventListener(
    "click",
    nextQuestion
);

document.getElementById("restartButton")
    .addEventListener("click", restartGame);


// Iniciar o jogo

showQuestion();
