console.log("Estou aquui");

//Variáveis globais
let quantniveis;
let quantperg;


function rendenizarQuizzesPrincipal(resposta) {
    let arrayDeObjetos = resposta.data
    arrayDeObjetos.forEach(element => {
        let stringId = JSON.stringify(element.id)
        if (localStorage.getItem(stringId) !== null) {
            let DivVazia = document.querySelector(".segundaDivPrimeiraTela")
            let DivQuizzesProprios = document.querySelector(".terceiraDivPrimeiraTela")
            DivVazia.classList.add("oculto")
            DivQuizzesProprios.classList.remove("oculto")
        } else {
            let roloTodosOsQuizzes = document.querySelector(".roloTodosOsQuizzes")
            let templateDivQuizz = `<div onclick="mudartela2(${element.id})" style="background-image:url(${element.image});" class="janelaQuizz"><h4>${element.title}</h4><div class="degrade"></div></div>`
            roloTodosOsQuizzes.innerHTML = roloTodosOsQuizzes.innerHTML + templateDivQuizz
        }
    });
}
function Requisicaoprincipal() {
    let promessaPrincipal = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promessaPrincipal.then(rendenizarQuizzesPrincipal)
    promessaPrincipal.catch(rendenizarQuizzesPrincipal)
}
function mudartela2(id) {
    console.log(id)
}
function mudartela3() {
    let telapedro = document.querySelector(".tela1")
    let telafernando = document.querySelector(".telainfobasica")
    telapedro.classList.add("oculto")
    telafernando.classList.remove("oculto")
}
function meusQuizzes(arrayMemoria) {
    arrayMemoria.forEach(element => {
        let roloSeusQuizzes = document.querySelector(".roloSeusQuizzes")
        let templateDivQuizz = `<div onclick="mudartela2(${element.id})" style="background-image:url(${element.image});" class="janelaQuizz"><h4>${element.title}</h4><div class="degrade"></div></div>`
        roloSeusQuizzes.innerHTML = roloSeusQuizzes.innerHTML + templateDivQuizz
    })
}

Requisicaoprincipal();
let memoria = localStorage.getItem("ids");
meusQuizzes(memoria);

console.log("Estou aquui");



function rendenizarQuizzesPrincipal(resposta) {

    let arrayDeObjetos = resposta.data;

    arrayDeObjetos.forEach(element => {
        let stringId = JSON.stringify(element.id)
        if (localStorage.getItem(stringId) !== null) {
            let DivVazia = document.querySelector(".segundaDivPrimeiraTela");
            let DivQuizzesProprios = document.querySelector(".terceiraDivPrimeiraTela");
            DivVazia.classList.add("oculto");
            DivQuizzesProprios.classList.remove("oculto");
        } else {
            let roloTodosOsQuizzes = document.querySelector(".roloTodosOsQuizzes");
            let templateDivQuizz = `<div onclick="mudartela2(${element.id})" style="background-image:url(${element.image});" class="janelaQuizz"><h4>${element.title}</h4><div class="degrade"></div></div>`;
            roloTodosOsQuizzes.innerHTML = roloTodosOsQuizzes.innerHTML + templateDivQuizz;
        }
    });
}

function Requisicaoprincipal() {
    let promessaPrincipal = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promessaPrincipal.then(rendenizarQuizzesPrincipal);
    promessaPrincipal.catch(rendenizarQuizzesPrincipal);
}


function meusQuizzes(arrayMemoria) {
    arrayMemoria.forEach(element => {
        let roloSeusQuizzes = document.querySelector(".roloSeusQuizzes");
        let templateDivQuizz = `<div onclick="mudartela2(${element.id})" style="background-image:url(${element.image});" class="janelaQuizz"><h4>${element.title}</h4><div class="degrade"></div></div>`;
        roloSeusQuizzes.innerHTML = roloSeusQuizzes.innerHTML + templateDivQuizz;
    })
}

function mudartela2(quizz) {
    console.log("Clicou")

    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela2");

    tela1.classList.toggle("oculto");
    tela2.classList.toggle("oculto");

    window.scrollTo(0, 0);

    let idQuizzClicado = JSON.stringify(quizz);

    let promessaTeste = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizzClicado}`);
    promessaTeste.then(renderizaQuizz);
    promessaTeste.catch(mudartela2);

}

// randomiza as perguntas
function comparador() {
    return Math.random() - 0.5;
}

// renderiza o quizz da tela 2 com perguntas embaralhadas
function renderizaQuizz(resposta) {
    // recolhe os dados
    let quizzEscolhido = resposta.data;

    // topo da página de perguntas
    const imagemQuizzTela2 = document.querySelector(".imagemQuizz-tela2");
    imagemQuizzTela2.innerHTML += `
    <img src="${quizzEscolhido.image}" alt="">
    <div class="tituloQuizz-tela2">
        <h1>${quizzEscolhido.title}</h1>
    </div>
    `;

    let qtDePerguntas = quizzEscolhido.questions.length;

    const listaDePerguntas = document.querySelector(".listaDePerguntas");
    // armazena na variável perguntaHtml as perguntas + respostas 
    for (let i = 0; i < qtDePerguntas; i++) {
        let perguntaHtml = `<div class="perguntaQuizz">
        <div class="titulopergunta-tela2">
            <h1>${quizzEscolhido.questions[i].title}</h1>
        </div>
        <div class="respostas">
`;
        for (let j = 0; j < quizzEscolhido.questions[i].answers.length; j++) {
            let perguntas = quizzEscolhido.questions[i];

            perguntaHtml += `
                <div class="resposta" onclick="selecionarResposta(this)">
                    <img src="${perguntas.answers[j].image}" alt="">
                    <p>${perguntas.answers[j].text}</p>
                </div>
        `;
        }
        perguntaHtml += `
        </div>
        </div>
        `;

        listaDePerguntas.innerHTML += perguntaHtml;
    }

    // botões do final da página
    listaDePerguntas.innerHTML += `
    <button class="reiniciarQuizz" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
    <div class="voltarHome" onclick="voltarHome()"><p>Voltar pra Home</p></div>
    `;


}

function selecionarResposta(click) {
    const respostaSelecionada = document.querySelector(".respostas .selecionado");

    if (respostaSelecionada !== null) {
        respostaSelecionada.classList.remove("selecionado");
    }

    click.classList.add("selecionado");

}

// botão para resetar o quizz atual
function reiniciarQuizz() {
    window.location.reload(true);

    mudartela2(idQuizzClicado);
    window.scrollTo(0, 0);
}

// botão "voltar home"
function voltarHome() {
    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela2");

    tela1.classList.toggle("oculto");
    tela2.classList.toggle("oculto");

    window.scrollTo(0, 0);
}


function verificarURL(texto) {
    try {
        let url = new URL(texto);
        return (true);
    } catch (err) {
        return (false);
    }
}


function verificarCor(cor) {
    const cond1 = (typeof (cor) === 'string');
    const cond2 = (cor[0] === "#");
    const cond3 = (cor.length === 7);
    const corsemhash = (cor.replace(cor[0], ""))
    const cond4 = (!isNaN(Number('0x' + corsemhash)));

    return (cond1 && cond2 && cond3 && cond4);
}

//essa função vai verificar os critérios de todos as inputs gerados na tela
//se bem sucedida, ela vai avançar para a tela de perguntas do quizz - 3.2
//caso não, pedirá para a pessoa verificar as informações

function finalizarInformacoesBasicas() {
    const titquizz = document.querySelector(".titulo-quizz").value;
    const urlimagem = document.querySelector(".url-imagem").value;
    quantperg = Number(document.querySelector(".quant-perguntas").value);
    quantniveis = Number(document.querySelector(".quant-niveis").value);

    const cond1 = (titquizz.length >= 20 && titquizz.length <= 65);
    const cond2 = verificarURL(urlimagem);
    const cond3 = (quantperg >= 3);
    const cond4 = (quantniveis >= 2);

    if (cond1 && cond2 && cond3 && cond4) {
        //trocar de tela e acionar a função de renderizar a tela de criar perguntas
        abrirTelaCriarPerguntas();
    } else {
        alert("Por favor, verifique se as informações estão preenchidas corretamente");
    }
}


function abrirTelaCriarPerguntas() {
    alert(`criando ${quantperg} perguntas`);
    document.querySelector(".telainfobasica").classList.toggle("oculto");
    document.querySelector(".telaperguntas").classList.toggle("oculto");
    renderizarListaPerguntas();
}

function constHtmlPergunta(i) {
    let templatePergunta =
        `<li class="item-lista-pergunta criapergunta${i}">
        <div class="div-pergunta" onclick="abrirInputsPergunta(this)">
            <p>Pergunta ${i}</p>
            <img src="./editar.svg" alt="Editar pergunta" onclick="abrirInputsPergunta()">  
        </div>
        <div class="inputs-lista-pergunta inputs${i} oculto">
            <div class="div-titulo-aberto" onclick="ocultarInputsPergunta(this)">Pergunta ${i}</div>
            <input type="text" class="caixaInput texto-pergunta" placeholder="Texto da pergunta">
            <input type="text" class="caixaInput cor-pergunta" placeholder="Cor de fundo da pergunta">
            <div class="div-titulo-aberto">Resposta correta</div>
            <input type="text" class="caixaInput texto-resp-correta" placeholder="Resposta correta">
            <input type="text" class="caixaInput img-resp-correta" placeholder="URL da imagem">
            <div class="div-titulo-aberto">Respostas incorretas</div>
            <input type="text" class="caixaInput texto-resp-incorreta1" placeholder="Resposta incorreta 1">
            <input type="text" class="caixaInput img-resp-incorreta1" placeholder="URL da imagem 1">
            <input type="text" class="caixaInput texto-resp-incorreta2" placeholder="Resposta incorreta 2">
            <input type="text" class="caixaInput img-resp-incorreta2" placeholder="URL da imagem 2">
            <input type="text" class="caixaInput texto-resp-incorreta3" placeholder="Resposta incorreta 3">
            <input type="text" class="caixaInput img-resp-incorreta3" placeholder="URL da imagem 3">
        </div>
    </li>`
    return (templatePergunta);
}

//essa função vai verificar os critérios de todos as perguntas geradas na tela
//se bem sucedida, ela vai avançar para a tela de criação de niveis - 3.3
//caso não, pedirá para a pessoa verificar as informações

function finalizarCriacaoPerguntas() {

    const arrayValid = [];
    let valid = true;

    let cond5 = true;
    let cond6 = true;

    for (let i = 1; i <= quantperg; i++) {
        const perguntali = document.querySelector(`.criapergunta${i}`)
        let cond;

        const textoperg = perguntali.querySelector(".texto-pergunta").value;
        const corperg = perguntali.querySelector(".cor-pergunta").value;
        const textorespcorreta = perguntali.querySelector(".texto-resp-correta").value;
        const imgrespcorreta = perguntali.querySelector(".img-resp-correta").value;
        const textorespincorreta1 = perguntali.querySelector(".texto-resp-incorreta1").value;
        const imgrespincorreta1 = perguntali.querySelector(".img-resp-incorreta1").value;
        const textorespincorreta2 = perguntali.querySelector(".texto-resp-incorreta2").value;
        const imgrespincorreta2 = perguntali.querySelector(".img-resp-incorreta2").value;
        const textorespincorreta3 = perguntali.querySelector(".texto-resp-incorreta3").value;
        const imgrespincorreta3 = perguntali.querySelector(".img-resp-incorreta3").value;

        const cond1 = (textoperg.length > 20);
        const cond2 = (verificarCor(corperg));
        const cond3 = (textorespcorreta !== "" && textorespincorreta1 !== "");
        const cond4 = (verificarURL(imgrespcorreta) && verificarURL(imgrespincorreta1));

        if (textorespincorreta2 !== "") {
            cond5 = (verificarURL(imgrespincorreta2));
        }

        if (textorespincorreta3 !== "") {
            cond6 = (verificarURL(imgrespincorreta3));
        }

        if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6) {
            cond = true;
        } else {
            cond = false;
        }
        arrayValid.push(cond);
    }

    for (let i = 0; i < arrayValid.length; i++) {
        if (arrayValid[i]) {
            continue;
        } else {
            valid = false;
            break;
        }
    }

    if (valid) {
        abrirTelaNiveis();
    } else {
        alert("Por favor, verifique se as informações estão preenchidas corretamente");
    }
}


function renderizarListaPerguntas() {
    const ul = document.querySelector(".ul-lista-perguntas");
    for (let i = 1; i <= quantperg; i++) {
        let pergunta = constHtmlPergunta(i);
        ul.innerHTML = ul.innerHTML + pergunta;
    }
}

function abrirInputsPergunta(pergunta) {
    let paiPerg = pergunta.parentNode;
    paiPerg.querySelector(".inputs-lista-pergunta").classList.toggle("oculto");
    paiPerg.querySelector(".div-pergunta").classList.toggle("oculto");
}

function ocultarInputsPergunta(pergunta) {
    let paiPerg = pergunta.parentNode;
    let avoPerg = paiPerg.parentNode;
    paiPerg.classList.toggle("oculto");
    avoPerg.querySelector(".div-pergunta").classList.toggle("oculto");
}

//funções para a tela 3.3 niveis

function abrirTelaNiveis() {
    document.querySelector(".telaperguntas").classList.toggle("oculto");
    document.querySelector(".telaniveis").classList.toggle("oculto");
    renderizarListaNiveis();
}

function abrirInputsNivel(nivel) {
    let paiNivel = nivel.parentNode;
    paiNivel.querySelector(".inputs-lista-nivel").classList.toggle("oculto");
    paiNivel.querySelector(".div-nivel").classList.toggle("oculto");
}

function ocultarInputsNivel(nivel) {
    let paiNivel = nivel.parentNode;
    let avoNivel = paiNivel.parentNode;
    paiNivel.classList.toggle("oculto");
    avoNivel.querySelector(".div-nivel").classList.toggle("oculto");
}

function constHtmlNivel(i) {
    let templateNivel =
        `<li class="item-lista-nivel crianivel${i}">
        <div class="div-nivel" onclick="abrirInputsNivel(this)">
            <p>Nivel ${i}</p>
            <img src="./editar.svg" alt="Editar nível" onclick="abrirInputsNivel()">
        </div>
        <div class="inputs-lista-nivel inputs${i} oculto">
            <div class="div-titulo-aberto" onclick="ocultarInputsNivel(this)">Nivel ${i}</div>
            <input type="text" class="caixaInput titulo-nivel" placeholder="Título do nível">
            <input type="text" class="caixaInput porcent-acerto-min" placeholder="% de acerto mínima">
            <input type="text" class="caixaInput url-imagem-nivel" placeholder="URL da imagem do nível">
            <input type="text" class="caixaInput descricao-nivel" placeholder="Descrição do nível">
        </div>
    </li>`;
    return (templateNivel);
}

function renderizarListaNiveis() {
    const ul = document.querySelector(".ul-lista-niveis");
    for (let i = 1; i <= quantniveis; i++) {
        let nivel = constHtmlNivel(i);
        ul.innerHTML = ul.innerHTML + nivel;
    }
}

//essa função vai verificar os critérios de todos os níveis gerados na tela
//se bem sucedida, ela vai avançar para a tela de sucesso do quizz - 3.4
//caso não, pedirá para a pessoa verificar as informações

function finalizarCriacaoNiveis() {
    const arrayValid = [];
    let valid = true;

    for (let i = 1; i <= quantniveis; i++) {
        const niveli = document.querySelector(`.crianivel${i}`);
        let cond;

        const titulonivel = niveli.querySelector(".titulo-nivel").value;
        const porcentacertmin = niveli.querySelector(".porcent-acerto-min").value;
        const urlimagem = niveli.querySelector(".url-imagem-nivel").value;
        const descnivel = niveli.querySelector(".descricao-nivel").value;

        const cond1 = (titulonivel.length >= 10);
        const cond2 = (porcentacertmin > 0 && porcentacertmin < 100);
        const cond3 = (verificarURL(urlimagem));
        const cond4 = (descnivel.length > 30);

        if (cond1 && cond2 && cond3 && cond4) {
            cond = true;
        } else {
            cond = false;
        }
        arrayValid.push(cond);
    }

    for (let i = 0; i < arrayValid.length; i++) {
        if (arrayValid[i]) {
            continue;
        } else {
            valid = false;
            alert(`Problema no preenchimento do nível ${i + 1}`)
            break;
        }
    }

    if (valid) {
        //trocar para a tela de sucesso na criação do quizz
        alert("pode proseguir");
    } else {
        alert("Por favor, verifique se as informações estão preenchidas corretamente");
    }

    mudarTelaSucesso(urlimagem, titulonivel);
}

function mudarTelaSucesso(img, titulo) {
    let telaNiveis = document.querySelector(".telaniveis");
    let telaSucesso = document.querySelector(".telasucesso");

    telaNiveis.classList.toggle("oculto");
    telaSucesso.classList.toggle("oculto");

}


quantniveis = 2;
renderizarListaNiveis()

