function Controller() {
   let myGame = null;
   let myView = null;
   let intervalId = null;
   let isPlaying = false;


   this.init = function (game, view) {
      myGame = game;//контейнер для игры
      myView = view;//отрисовка игры

      document.addEventListener("keydown", this.handleKeyDown.bind(this));//событие по нажатию клавиши
      document.addEventListener("keyup", this.handleKeyUp.bind(this));//событие по нажатию клавиши
      myView.renderStartScreen();//отрисовка canvas
      document.getElementById('btnExit').addEventListener('click', this.pause.bind(this));//клик на кнопку выход
      document.getElementById('btnCancel').addEventListener('click', this.play.bind(this));//клик на кнопку отмена в окне для сохранения
      document.getElementById('btnSave').addEventListener('click', myGame.reset);//обнуление данных игры при сохранении
   }

   this.update = function () {//обновление отрисовки
      myGame.movePieceDown();
      this.updateView();
   }
   this.play = function () {//запуск игры
      isPlaying = true;
      this.startTimer();
      this.updateView();

   }
   this.pause = function () {//игра на паузе
      isPlaying = false;
      this.stopTimer();
      this.updateView();

   }
   this.reset = function () {//перезагрузка игры
      myGame.reset();
      this.play();
   }
   
   this.updateView = function () {//отрисовка в зависимости от состоянии игры
      const state = myGame.getState();
      if (state.isGameOver) {//игра окончена
         myView.renderEndScreen(state);
      } else if (!isPlaying) {//если игра остановлена
         myView.renderPauseScreen();
      } else {
         myView.renderMainScreen(myGame.getState());//в игровом режиме
      }
   }
   this.startTimer = function () {//таймер движения/ускорения
      const speed = 500 - myGame.getState().level * 50;//задаем скорость в зависимости от уровня
      if (!intervalId) {//если таймер не запущен, запускаем
         intervalId = setInterval(
            () => {
               this.update();
            },
            speed > 0 ? speed : 50 //если скорость 0, то применяем минимальную
         );
      }
   }
   this.stopTimer = function () {//остановка таймера
      if (intervalId) {
         clearInterval(intervalId);
         intervalId = null;
      }
   }

   this.handleKeyDown = function (event) {//обработка кликов
      const state = myGame.getState();//в зависимости от состояниия игры
      switch (event.keyCode) {
         case 32://space
            if (state.isGameOver) {
               this.reset();
            } else if (isPlaying) {
               this.pause();
            } else {
               this.play();
            }
            break;
         case 37://arrowLeft
            if (isPlaying) {
               myGame.movePieceLeft();
               this.updateView();
            }
            break;
         case 38://arrowUp
            if (isPlaying) {
               myGame.rotatePiece();
               this.updateView();
            }

            break;
         case 39://arrowRight
            if (isPlaying) {
               myGame.movePieceRight();
               this.updateView();
            }
            break;
         case 40://arrowDown
            if (isPlaying) {
               this.stopTimer();
               myGame.movePieceDown();
               this.updateView();
            }
            break;
      }
   }
   this.handleKeyUp = function (event) {//отжатие клавиши
      if (isPlaying) {
         switch (event.keyCode) {
            case 40:
               this.startTimer();
               break;
         }
      }
   }
}