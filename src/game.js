function Game() {
   const points = {//счет игры
      "1": 40,
      "2": 100,
      "3": 300,
      "4": 1200
   };

   let score = 0;
   let lines = 0;
   let level = 0;
   this.topOut = false;//пересечение тетрамино с верхним краем

   this.init = function () {
      this.reset();
   }
   
   // состояние игрового поля
   this.getState = function () {
      const playField = this.createPlayField();//отрисовка игрового поля
      const { y: pieceY, x: pieceX, blocks } = this.activePiece;//деструкторизауия объекта для 
      for (let y = 0; y < this.playField.length; y++) {//получении координат, проходимся по всем рядам
         playField[y] = [];//создаем массив с рядами
         for (let x = 0; x < this.playField[y].length; x++) {//проходимся по столбцам в каждом ряду
            playField[y][x] = this.playField[y][x];//собираем в один массив
         }
      }
      for (let y = 0; y < blocks.length; y++) {//перебираем масив тетрамино
         for (let x = 0; x < blocks[y].length; x++) {
            if (blocks[y][x]) {
               playField[pieceY + y][pieceX + x] = blocks[y][x];//соотносим координаты тетрамино и игрового поля
            }
         }
      }
      return {//функция возвращает значения игры
         score: score,
         level: this.getlevel(),
         lines: lines,
         nextPiece: this.nextPiece,
         playField,
         nextLevel: this.nextLevel(),
         isGameOver: this.topOut
      };
   }
   this.reset = function () {//обнуление всех значений
      score = 0;
      lines = 0;
      level = 0;
      this.topOut = false;
      this.playField = this.createPlayField();
      this.activePiece = this.createPiece();
      this.nextPiece = this.createPiece();

   }

   // создание игрового поля
   this.createPlayField = function () {
      const playField = [];
      for (let y = 0; y < 20; y++) {//перебор массива поля
         playField[y] = [];
         for (let x = 0; x < 10; x++) {
            playField[y][x] = 0;
         }
      }
      return playField;
   }

   // создание тетрамино
   this.createPiece = function () {
      const index = Math.floor(Math.random() * 7);//рандомеый индекс тетрамино
      const type = "IJLOSTZ"[index];//тип фигуры тетрамино
      const piece = {};//объкет фигур

      switch (type) {
         case "I":
            piece.blocks = [
               [0, 0, 0, 0], 
               [1, 1, 1, 1], 
               [0, 0, 0, 0], 
               [0, 0, 0, 0]
            ];
            break;
         case "J":
            piece.blocks = [
               [0, 0, 0], 
               [2, 2, 2], 
               [0, 0, 2]
            ];
            break;
         case "L":
            piece.blocks = [
               [0, 0, 0], 
               [3, 3, 3], 
               [3, 0, 0]
            ];
            break;
         case "O":
            piece.blocks = [
               [0, 0, 0, 0], 
               [0, 4, 4, 0], 
               [0, 4, 4, 0], 
               [0, 0, 0, 0]
            ];
            break;
         case "S":
            piece.blocks = [
               [0, 0, 0], 
               [0, 5, 5], 
               [5, 5, 0]
            ];
            break;
         case "T":
            piece.blocks = [
               [0, 0, 0], 
               [6, 6, 6], 
               [0, 6, 0]
            ];
            break;
         case "Z":
            piece.blocks = [
               [0, 0, 0], 
               [7, 7, 0], 
               [0, 7, 7]
            ];
            break;
         default:
            throw new Error("Неизвестный тип фигуры");
      }
      piece.x = Math.floor((10 - piece.blocks[0].length) / 2);//появление тетрамино по центру 
      piece.y = -1;//верхнего края
      return piece;
   }

   this.movePieceLeft = function () {//движение влево
      this.activePiece.x -= 1;
      if (this.hasColision()) this.activePiece.x += 1;//проверка на столкновение
   }
   this.movePieceRight = function () {//движение вправо
      this.activePiece.x += 1;
      if (this.hasColision()) this.activePiece.x -= 1;//проверка на столкновение
   }
   this.movePieceDown = function () {//движение вниз
      if (this.topOut) return;//если пересикается с верхним краем
      this.activePiece.y += 1;
      if (this.hasColision()) {//проверка на столкновение
         this.activePiece.y -= 1;
         this.lockPiece();//фиксируем тетрамино на поле
         const clearedLines = this.clearLines();//проверяем заполненную строку
         this.updateScore(clearedLines);//очищаем заполненную строку
         this.updatePieces();
      }
      if (this.hasColision()) {//если пересикается с верхним краем
         this.topOut = true;
      }
   }

   // поворот тетрамино
   this.rotatePiece = function () {
      const blocks = this.activePiece.blocks;//массив активного тетрамино
      const length = blocks.length;

      const temp = [];
      for (let i = 0; i < length; i++) {
         temp[i] = new Array(length).fill(0);//новый масств заполняем 0
      }
      for (let y = 0; y < length; y++) {//перебираем масств по столбцам и строкам
         for (let x = 0; x < length; x++) {
            temp[x][y] = blocks[length - 1 - y][x];//меняем значение массива 0 на значение массива фигуры
         }
      }
      this.activePiece.blocks = temp;
      if (this.hasColision()) {//если тетрамино пересикается с краем, то положение не меняется
         this.activePiece.blocks = blocks;
      }
   }

   this.updatePieces = function () {//обновляем значение тетрамино
      this.activePiece = this.nextPiece;
      this.nextPiece = this.createPiece();
   }

   this.hasColision = function () {//пересечение с краями
      const { y: pieceY, x: pieceX, blocks } = this.activePiece;//деструкторизация объекта
      for (let y = 0; y < blocks.length; y++) {
         for (let x = 0; x < blocks[y].length; x++) {
            if (
               blocks[y][x] &&
               (this.playField[pieceY + y] === undefined ||
                  this.playField[pieceY + y][pieceX + x] === undefined ||
                  this.playField[pieceY + y][pieceX + x])
            ) {
               return true;
            }
         }
      }
      return false;
   }
   this.lockPiece = function () {//фиксирование тетрамино
      const { y: pieceY, x: pieceX, blocks } = this.activePiece;
      for (let y = 0; y < blocks.length; y++) {
         for (let x = 0; x < blocks[y].length; x++) {
            if (blocks[y][x]) {
               this.playField[pieceY + y][pieceX + x] = blocks[y][x];//соотношение кооржинат поля и тетрамино
            }
         }
      }
   }
   this.clearLines = function () {//удаление линии
      const rows = 20;
      const columns = 10;
      let lines = [];

      for (let y = rows - 1; y >= 0; y--) {
         let numberOfBlocks = 0;
         for (let x = 0; x < columns; x++) {
            if (this.playField[y][x]) {
               numberOfBlocks += 1; // количество заполненных ячеек
            }
         }

         if (numberOfBlocks === 0) {
            break;
         } else if (numberOfBlocks < columns) {
            continue;
         } else if (numberOfBlocks === columns) {//если количество ячеек в ряду = 10
            lines.unshift(y); //добовляем строку в начало массива
         }
      }
      for (let index of lines) {
         this.playField.splice(index, 1);//удаляем ряд из массива
         this.playField.unshift(new Array(columns).fill(0));//создаем новый ряд
      }
      return lines.length;
   }

   this.getlevel = function () {//получаем значение level
      return level = Math.floor(lines * 0.1);
   }

   this.nextLevel = function () {
      if ((+this.getlevel() % 10 != 0) && (+this.getlevel() != 0)) {
         console.log(this.getlevel(), 'next level!!!');
         return true;
      }
   }

   this.updateScore = function (clearedLines) {//обновляем очки

      if (clearedLines > 0) {//если есть заполненные линии
         score += points[clearedLines] * (level + 1);//выбираем значение из массива 
         lines += clearedLines;
      }
      this.saveDataScore();
   }

   this.saveDataScore = function () {//сохраняем данные в localstorage
      let progressData = {};
      progressData.level = level;
      progressData.score = score;
      progressData.lines = lines;

      localStorage.setItem('progress', JSON.stringify(progressData));

   }

   
}