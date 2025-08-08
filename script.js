// Passo 1: Selecionar os Elementos HTML
const cronometroDisplay = document.getElementById('cronometro');
const iniciarBtn = document.getElementById('iniciar');
const resetarBtn = document.getElementById('resetar');
const horasFocoDisplay = document.getElementById('horasFoco');
const backgroundContainer = document.querySelector('.background-container');

// Botões de modo
const pomodoroBtn = document.getElementById('pomodoro-mode');
const shortBreakBtn = document.getElementById('short-break');
const longBreakBtn = document.getElementById('long-break');

// Passo 2: Variáveis de Estado
let tempoTotalSegundos = 0;
let tempoInicialShortBreak = 5 * 60;
let tempoInicialLongBreak = 15 * 60;
let estadoAtual = 'pomodoro';
let estaRodando = false;
let intervalId;
let horasFocoAcumuladas = 0; // CORREÇÃO: Inicializa com 0.

// Configura os caminhos das imagens de fundo
const fundoFoco = 'url("assets/background-foco.jpg")';
const fundoShortBreak = 'url("assets/background-short-break.png")'; 
const fundoLongBreak = 'url("assets/background-long-break.jpeg")'; 

// Passo 3: Funções do Cronômetro

function iniciarCronometro() {
    if (estaRodando) return;

    estaRodando = true;
    iniciarBtn.textContent = 'Pause';
    
    intervalId = setInterval(() => {
        if (estadoAtual === 'pomodoro') {
            tempoTotalSegundos++;
        } else {
            tempoTotalSegundos--;
            if (tempoTotalSegundos < 0) {
                pausarCronometro();
            }
        }
        atualizarDisplay();
    }, 1000);
}

function pausarCronometro() {
    if (!estaRodando) return;
    estaRodando = false;
    clearInterval(intervalId);
    iniciarBtn.textContent = 'Start';
}

function resetarCronometro() {
    pausarCronometro();
    if (estadoAtual === 'pomodoro') {
      tempoTotalSegundos = 0;
    } else if (estadoAtual === 'short-break') {
      tempoTotalSegundos = tempoInicialShortBreak;
    } else { // long-break
      tempoTotalSegundos = tempoInicialLongBreak;
    }
    atualizarDisplay();
}

function atualizarDisplay() {
    const minutos = Math.floor(tempoTotalSegundos / 60).toString().padStart(2, '0');
    const segundos = (tempoTotalSegundos % 60).toString().padStart(2, '0');
    cronometroDisplay.textContent = `${minutos}:${segundos}`;
    horasFocoDisplay.textContent = horasFocoAcumuladas.toFixed(2);
}

function mudarModo(novoModo) {
    pausarCronometro();
    estadoAtual = novoModo;

    switch (novoModo) {
        case 'pomodoro':
            tempoTotalSegundos = 0;
            backgroundContainer.style.backgroundImage = fundoFoco;
            break;
        case 'short-break':
            tempoTotalSegundos = tempoInicialShortBreak;
            backgroundContainer.style.backgroundImage = fundoShortBreak;
            break;
        case 'long-break':
            tempoTotalSegundos = tempoInicialLongBreak;
            backgroundContainer.style.backgroundImage = fundoLongBreak;
            break;
    }

    atualizarDisplay();
}

// Passo 4: Adicionar os Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    mudarModo('pomodoro');
    horasFocoDisplay.textContent = horasFocoAcumuladas.toFixed(2);

    iniciarBtn.addEventListener('click', () => {
        if (estaRodando) {
            pausarCronometro();
        } else {
            iniciarCronometro();
        }
    });
    
    resetarBtn.addEventListener('click', resetarCronometro);
    pomodoroBtn.addEventListener('click', () => mudarModo('pomodoro'));
    shortBreakBtn.addEventListener('click', () => mudarModo('short-break'));
    longBreakBtn.addEventListener('click', () => mudarModo('long-break'));
});