function View() {
   const colors = {//объект с цветом для тетрамино
      "1": "rgb(16, 153, 221)",
      "2": "rgb(29, 65, 205)",
      "3": "rgb(234, 104, 7)",
      "4": "rgb(247, 189, 36)",
      "5": "rgb(106, 198, 23)",
      "6": "rgb(186, 42, 159)",
      "7": "rgb(220, 68, 91)"
   };

   let myContainer = null;//где отрисовывается игра
   let width = 480;
   let height = 640;
   let columns = 10;
   let rows = 20;
   let canvas = null;
   let context = null;
   let playFieldBorderWidth = 4;//толщина bordera
   let playFieldX = playFieldBorderWidth;//начало отсчета игрового поля X
   let playFieldY = playFieldBorderWidth;//начало отсчета игрового поля Y
   let playFieldWidth = (width * 2) / 3;//ширина поля
   let playFieldHeight = height;//высота поля
   let playFieldInnerWidth =
      playFieldWidth - playFieldBorderWidth * 2;//ширина поля без border
   let playFieldInnerHeight =
      playFieldHeight - playFieldBorderWidth * 2;//высота поля без border

   let blockWidth = playFieldInnerWidth / columns; //ширина ячейки
   let blockHeight = playFieldInnerHeight / rows; //высота ячейки

   let panelX = playFieldWidth + 10;//координаты панели X
   let panelY = 0;//координаты панели Y
   

   this.init = function (element, width, height) {
      myContainer = element || document.querySelector('#game');
      canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      context = canvas.getContext("2d");
      myContainer.appendChild(canvas);
   }
   this.renderMainScreen = function (state) {//отрисовка главного окна
      this.clearScreen();//очистка окна
      this.renderPlayField(state);//отрисовка поля в зависимости от состояния игры
      this.renderPanel(state);//отрисовка панели
   }
   this.renderStartScreen = function () {//отрисовка окна Sart
      console.log(width)
      context.fillStyle = "white";
      context.font = '14px "Press start 2P"';
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
         "Press SPACE to start",
         width / 2,
         height / 2
      );
   }
   this.renderPauseScreen = function () {//отрисовка окна Pause
      context.fillStyle = "rgba(3,3,5,0.2)";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "white";
      context.font = '14px "Press start 2P"';
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
         "Press SPACE to resume",
         width / 2,
         height / 2
      );
   }

   this.renderNextLevelScreen = function () {//отрисовка окна переходв на след уровень
      context.fillStyle = "rgba(0,0,0,0.75)";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "white";
      context.font = '14px "Press start 2P"';
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("next level", width / 2, height / 2 - 48);
      context.fillText(`level ${level}`, width / 2, height / 2);
      context.fillText(
         "Press SPACE to resume",
         width / 2,
         height / 2 + 48
      );
   }

   this.renderEndScreen = function ({ score }) {//отрисовка окна Game over
      this.clearScreen();
      context.fillStyle = "white";
      context.font = '14px "Press start 2P"';
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("game over", width / 2, height / 2 - 48);
      context.fillText(`score ${score}`, width / 2, height / 2);
      context.fillText(
         "Press enter to restart",
         width / 2,
         height / 2 + 48
      );
   }
   this.clearScreen = function () {//очистка окна
      context.clearRect(0, 0, width, height);
   }
   this.renderPlayField = function ({ playField }) {//отрисовка панели
      for (let y = 0; y < playField.length; y++) {
         const line = playField[y];
         for (let x = 0; x < line.length; x++) {
            const block = line[x];
            if (block) {
               this.renderBlock(//отрисовка будушего тетрамино
                  playFieldX + x * blockWidth,
                  playFieldY + y * blockHeight,
                  blockWidth,
                  blockHeight,
                  colors[block]
               );
            }
         }
      }
      context.strokeStyle = "rgba(251, 251, 251, 1)";
      context.lineWidth = playFieldBorderWidth;
      context.strokeRect(0, 0, playFieldWidth, playFieldHeight);
      // shadow
      context.shadowColor = 'rgba(251, 251, 251, .5)';
      context.shadowBlur = 3;

   }
   this.renderPanel = function ({ level, score, lines, nextPiece }) { //отрисовка панели
      context.textAlign = "start";
      context.textBaseline = "top";
      context.fillStyle = "white";
      context.font = '14px "Press start 2P"';

      context.strokeStyle = "rgba(251, 251, 251, 1)";
      context.lineWidth = playFieldBorderWidth;
      context.strokeRect(panelX + 10, panelY, 100, 70);

      context.fillText(`level`, panelX + 24, panelY + 10);
      context.fillText(`${level}`, panelX + 55, panelY + 40);

      context.strokeStyle = "rgba(251, 251, 251, 1)";
      context.lineWidth = playFieldBorderWidth;
      context.strokeRect(panelX + 10, panelY + 80, 100, 70);

      context.fillText(`score`, panelX + 24, panelY + 90);
      context.fillText(`${score}`, panelX + 50, panelY + 120);

      context.strokeStyle = "rgba(251, 251, 251, 1)";
      context.lineWidth = playFieldBorderWidth;
      context.strokeRect(panelX + 10, panelY + 160, 100, 70);

      context.fillText(`lines`, panelX + 24, panelY + 170);
      context.fillText(`${lines}`, panelX + 50, panelY + 210);

      context.strokeStyle = "rgba(251, 251, 251, 1)";
      context.lineWidth = playFieldBorderWidth;
      context.strokeRect(panelX + 10, panelY + 240, 100, 100);

      context.fillText("next", panelX + 30, panelY + 250);

      for (let y = 0; y < nextPiece.blocks.length; y++) {
         for (let x = 0; x < nextPiece.blocks[y].length; x++) {
            const block = nextPiece.blocks[y][x];
            if (block) {
               this.renderBlock(
                  panelX + 30 + x * blockWidth * 0.5,
                  panelY + 270 + y * blockHeight * 0.5,
                  blockWidth * 0.5,
                  blockHeight * 0.5,
                  colors[block]
               );
            }
         }
      }
   }
   this.renderBlock = function (x, y, width_, height_, color) {//отрисовка тетрамино

      context.fillStyle = color;
      context.strokeStyle = "rgba(251, 251, 251, 1)";
      context.lineWidth = 2;

      context.fillRect(x, y, width_, height_);
      context.strokeRect(x, y, width_, height_);
   }

}