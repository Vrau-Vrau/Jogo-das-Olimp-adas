let vida = 100; // Vida do personagem (0-100)
let inventario = { empatia: 0 }; // Inventário inicial
let checkpoints = []; // Lista de checkpoints

const storyElement = document.getElementById('story');

// Função para iniciar o jogo
function startGame() {
    vida = 100;
    inventario = { empatia: 0 };
    checkpoints = [];
    showIntroduction();
}

// Função para mostrar a introdução
function showIntroduction() {
    storyElement.textContent = 'Fernando decide deixar seu país devido a problemas políticos e buscar seu sonho na canoagem. O que ele deve fazer agora?';
    updateButtons('deixarPais', 'refletirSobreDecisao');
}

// Função para atualizar os botões
function updateButtons(option1, option2) {
    const buttons = document.querySelectorAll('button');
    buttons[0].setAttribute('onclick', `choose('${option1}')`);
    buttons[1].setAttribute('onclick', `choose('${option2}')`);
    buttons[0].textContent = option1;
    buttons[1].textContent = option2;
}

// Função para lidar com escolhas
function choose(option) {
    if (option === 'deixarPais') {
        leaveCountry();
    } else if (option === 'refletirSobreDecisao') {
        reflectOnDecision();
    } else if (option === 'atravessarRio') {
        crossRiver();
    } else if (option === 'salvarMulher') {
        saveWoman();
    } else if (option === 'receberAsilo') {
        receiveAsylum();
    } else if (option === 'treinar') {
        train();
    } else if (option === 'participarOlimpiadas') {
        participateInOlympics();
    } else if (option === 'embarcarParaFranca') {
        boardForFrance();
    } else if (option === 'fimJogo') {
        endGame();
    } else if (option === 'salvarProgresso') {
        saveProgress();
    } else if (option === 'voltarApt') {
        returnToCheckpoint();
    }
}

// Função para deixar o país
function leaveCountry() {
    storyElement.textContent = 'Fernando deixa seu país e sente um misto de medo e esperança ao embarcar para um novo começo.';
    vida -= 10; // Perda de vida por decisão difícil
    updateButtons('atravessarRio', 'receberAsilo');
}

// Função para refletir sobre a decisão
function reflectOnDecision() {
    storyElement.textContent = 'Fernando reflete sobre a decisão de deixar seu país e se convence de que era necessário para um futuro melhor.';
    updateButtons('atravessarRio', 'salvarMulher');
}

// Função para atravessar o Rio Grande
function crossRiver() {
    storyElement.textContent = 'Fernando enfrenta o desafio de atravessar o Rio Grande, um dos maiores obstáculos.';
    vida -= 20; // Perda de vida por desafio
    updateButtons('salvarMulher', 'receberAsilo');
}

// Função para salvar a mulher
function saveWoman() {
    storyElement.textContent = 'Fernando vê uma mulher em perigo no rio e decide salvá-la, aumentando sua empatia e coragem.';
    inventario.empatia += 20; // Ganho de empatia
    updateButtons('receberAsilo', 'treinar');
}

// Função para receber asilo
function receiveAsylum() {
    storyElement.textContent = 'Fernando recebe asilo e começa a treinar para competir nas Olimpíadas.';
    vida += 20; // Recupera vida com novo começo
    updateButtons('treinar', 'participarOlimpiadas');
}

// Função para treinar
function train() {
    storyElement.textContent = 'Fernando treina intensamente, superando desafios físicos e emocionais.';
    vida += 10; // Recupera vida por treinamento bem-sucedido
    updateButtons('participarOlimpiadas', 'salvarProgresso');
}

// Função para participar das Olimpíadas
function participateInOlympics() {
    if (vida > 50 && inventario.empatia > 10) {
        storyElement.textContent = 'Fernando participa das Olimpíadas e representa a equipe de refugiados com orgulho.';
        vida += 10; // Aumenta a vida com sucesso nas Olimpíadas
        updateButtons('embarcarParaFranca', 'salvarProgresso');
    } else {
        storyElement.textContent = 'Fernando não consegue se qualificar para as Olimpíadas devido à falta de preparo.';
        vida -= 30; // Perda de vida por falha
        if (vida <= 0) {
            gameOver('Você não conseguiu se qualificar para as Olimpíadas.');
        } else {
            updateButtons('embarcarParaFranca', 'salvarProgresso');
        }
    }
}

// Função para embarcar para a França
function boardForFrance() {
    storyElement.textContent = 'Fernando embarca para as Olimpíadas na França, sentindo-se realizado por ter chegado tão longe.';
    updateButtons('fimJogo', 'salvarProgresso');
}

// Função para finalizar o jogo
function endGame() {
    storyElement.textContent = 'Fernando chegou às Olimpíadas e reflete sobre sua jornada. Sua coragem e determinação foram fundamentais para alcançar seu sonho.';
    removeButtons();
}

// Função para salvar o progresso
function saveProgress() {
    checkpoints.push({ vida, inventario });
    storyElement.textContent = 'Progresso salvo! Você pode continuar a partir deste ponto.';
    updateButtons('treinar', 'participarOlimpiadas');
}

// Função para retornar ao último checkpoint
function returnToCheckpoint() {
    if (checkpoints.length > 0) {
        const checkpoint = checkpoints.pop();
        vida = checkpoint.vida;
        inventario = checkpoint.inventario;
        storyElement.textContent = 'Você voltou ao último checkpoint. Boa sorte!';
        updateButtons('participarOlimpiadas', 'salvarProgresso');
    } else {
        storyElement.textContent = 'Não há checkpoints para retornar.';
        updateButtons('treinar', 'participarOlimpiadas');
    }
}

// Função para finalizar o jogo com mensagem de fim
function gameOver(message) {
    storyElement.textContent = message + ' Fim do jogo.';
    removeButtons();
}

// Função para remover os botões
function removeButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.remove());
}
