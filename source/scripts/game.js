document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.board');
  const shuffleButton = document.querySelector('.shuffle-button');
  const moveCounter = document.querySelector('.move-counter');

  const tiles = [];
  let emptyPosition = 15;
  let moves = 0;
  let gameStarted = false;

  // Инициализация игры
  function initGame() {
    // Создаем массив чисел от 1 до 15
    for (let i = 0; i < 15; i++) {
      tiles.push(i + 1);
    }
    tiles.push(0); // 0 представляет пустую клетку

    // Очищаем доску
    board.innerHTML = '';

    // Создаем клетки
    for (let i = 0; i <= 15; i++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.index = i;

      if (tiles[i] === 0) {
        tile.classList.add('empty');
        emptyPosition = i;
      } else {
        tile.textContent = tiles[i];
        tile.addEventListener('click', () => moveTile(i));
      }

      board.append(tile);
    }

    moves = 0;
    moveCounter.textContent = moves;
    gameStarted = false;
  }

  // Перемешиваем клетки
  function shuffleTiles() {
    // Используем алгоритм Фишера-Йетса для перемешивания
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    // Проверяем, можно ли решить эту комбинацию
    if (!isSolvable()) {
      // Если нельзя, меняем местами две непустые клетки
      let i = 0, j = 1;
      if (tiles[i] === 0) {
        i = 2;
      }
      if (tiles[j] === 0) {
        j = 2;
      }
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    // Обновляем доску
    updateBoard();

    moves = 0;
    moveCounter.textContent = moves;
    gameStarted = true;
  }

  // Проверяем, можно ли решить эту комбинацию
  function isSolvable() {
    let inversions = 0;
    const arr = tiles.filter((tile) => tile !== 0);

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          inversions++;
        }
      }
    }

    // Для доски 4x4 решение существует, если:
    // - количество инверсий четное, когда пустая клетка в нижнем ряду (позиции 12-15)
    // - количество инверсий нечетное, когда пустая клетка не в нижнем ряду
    const emptyRow = Math.floor(emptyPosition / 4) + 1;
    return (emptyRow % 2 === 0) ? (inversions % 2 === 0) : (inversions % 2 !== 0);
  }

  // Обновляем доску
  function updateBoard() {
    const tileElements = board.querySelectorAll('.tile');

    tileElements.forEach((tile, index) => {
      if (tiles[index] === 0) {
        tile.classList.add('empty');
        tile.textContent = '';
        emptyPosition = index;
      } else {
        tile.classList.remove('empty');
        tile.textContent = tiles[index];
      }

      // Удаляем все обработчики и добавляем снова
      tile.replaceWith(tile.cloneNode(true));
    });

    // Добавляем обработчики клика
    board.querySelectorAll('.tile:not(.empty)').forEach((tile) => {
      tile.addEventListener('click', () => moveTile(parseInt(tile.dataset.index)));
    });

    // Проверяем, решена ли головоломка
    if (isSolved() && gameStarted) {
      setTimeout(() => {
        alert(`Поздравляем! Вы решили головоломку за ${moves} ходов!`);
      }, 100);
    }
  }

  // Проверяем, решена ли головоломка
  function isSolved() {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] !== i + 1) {
        return false;
      }
    }
    return tiles[tiles.length - 1] === 0;
  }

  // Перемещаем клетку
  function moveTile(index) {
    // Проверяем, можно ли переместить клетку
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyPosition / 4);
    const emptyCol = emptyPosition % 4;

    // Клетку можно переместить, если она находится рядом с пустой клеткой
    if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
          (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {

      // Меняем местами клетки
      [tiles[index], tiles[emptyPosition]] = [tiles[emptyPosition], tiles[index]];

      // Обновляем доску
      updateBoard();

      // Увеличиваем счетчик ходов
      moves++;
      moveCounter.textContent = moves;
    }
  }

  // Инициализируем игру при загрузке
  initGame();

  // Обработчик кнопки перемешивания
  shuffleButton.addEventListener('click', shuffleTiles);
});
