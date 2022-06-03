/* essa função vai receber uma cor como parametro e  vai criar uma div com a cor passada */
function createPalleteColor(color) {
  // essa recupera a palete de cores
  const palleteBox = document.querySelector('#color-palette');
  //cria o elemnto div
  const palleteColor = document.createElement('div');
  //estiliza a div criada com a cor de fundo passada
  palleteColor.style.backgroundColor = color;
  //adiciona a classe color na div
  palleteColor.className = 'color';
  //adiciona uma borda nela
  palleteColor.style.border = '1px solid black';
  //se a cor for preta ela ja recebe a classe selected
  if (color === 'black') {
      palleteColor.className = 'color selected';
  }
  //cria a div dentro da paleta de cores 
  palleteBox.appendChild(palleteColor);
};
  
  //essa function gera numeros rgb aleatorios
  function RGBRamdon() {
    //cada const vai gerar um numero aleatorio entre 0 e 255
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    //o return contateniza as constantes e retorna o numero rgb inteiro
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  //chama a função com o primeiro parametro com a cor preta
  createPalleteColor('black');
  //e as proximas cores são gerada aleatoriamente com o numero rgb
  createPalleteColor(RGBRamdon());
  createPalleteColor(RGBRamdon());
  createPalleteColor(RGBRamdon());
  createPalleteColor('white');

  //recupera o a div color q recebe as cores
const colorElements = document.querySelectorAll('.color');
//o forEach é para adicionar o eventListener em todos os elementos do array colorElements
colorElements.forEach((item) => {
  item.addEventListener('click', (event) => {
    //recupera o elemento que gerou o evento
    const selectedElement = event.target;
    //o for percore todo o array tirando a classe do elemento
    for (let index = 0; index < colorElements.length; index +=1) {
      colorElements[index].className = item.className.replace('selected' ,'');      
    }
    //e adiciona a classe no elemento q gerou o evento
    selectedElement.className = `${item.className} selected`;
  });
});

//recupera a caixa de pixel
const pixelBoard = document.querySelector('#pixel-board');
//recebe um parametro com o numero de linhas
function creatLine(line) {
  for (let i = 0; i < line; i += 1) {
    //cria um elento div
    const lineCreat = document.createElement('div');
    lineCreat.className = 'line-pixel';
    lineCreat.style.height = '40px';
    pixelBoard.appendChild(lineCreat);
    //adiciona o elemento no html
  }
}

//recebe um parametro com numero de pixel a ser criado
function creatPixel (colum) {
  //recupera a linha criada
  const line = document.querySelectorAll('.line-pixel');
  //para cada linha q criou na função vai empurar os pixels
  line.forEach((item) => {
    //o for vai executar até chegar no numero recebido no parametro q foi inputado
    for (let index = 0; index < colum; index += 1) {
      const pixelCreat = document.createElement('div');
      //cada pixel vai receber um classe
      pixelCreat.className = 'pixel';
      //e vai iniciar com o fundo branco
      pixelCreat.style.backgroundColor = 'white';
      pixelCreat.style.width = '40px';
      pixelCreat.style.height = '40px';
      //adiciona um escutador de evento click a cada pixel
      pixelCreat.addEventListener('click', (event) => {
        //quando o click gerar o evento o item q foi clicado recebera a mesma cor do item que esta selecionado na paleta
        const itemSelected = document.querySelector('.selected').style.backgroundColor;
        event.target.style.backgroundColor = itemSelected;
      });
      //recupera o botao que vai limpar a board
      const clear = document.querySelector('#clear-board');
      //adiciona um escutador de eventos
      clear.addEventListener('click', () => {
        //e deixa todos os pixels brancos
        pixelCreat.style.backgroundColor = 'white';
      });

      item.appendChild(pixelCreat);
    }
  });
}
//recupera o input
const inputSize = document.querySelector('#board-size');
//recupera o botao do input
const boardGeneretor = document.querySelector('#generate-board');

//função que vai receber o valor quando a pagina acaba de carregar e quando for inputado
function generateBoardSize(value) {
  creatLine(value);
  creatPixel(value);
}
//quando a pagina for carregada vai chamar a fução e passar o parametro 5
window.addEventListener('onload', generateBoardSize(5));
//adiciona um escutador de eventos no botão
boardGeneretor.addEventListener('click', () => {
  //recebe o valor do input
  const size = inputSize.value;
  //se o input estiver vazio ele vai retornar o alerta
  if (size <= 0) {
    return window.alert('Board inválido!');
  } else if (size <= 5) { // se for menor que 5 ele mantem o padrao menor 5
    pixelBoard.innerHTML = '';
    generateBoardSize(5);
  } else if (size > 50) { // se for maior que 50 mantem o padrao maior 50
    pixelBoard.innerHTML = '';
    generateBoardSize(50);
  } else { // caso esteja entre 5 e 50 autera o tamanho da board com o valor
    pixelBoard.innerHTML = '';
    generateBoardSize(size);
  }
});
