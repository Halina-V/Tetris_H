// Список компонент (from components.js)
const components = {
   header: Header,
   navbar: NavBar,
   content: Content,
};

// Список поддердживаемых роутов (from pages.js)
const routes = {
   menu: HomePage,
   rules: Rules,
   records: Records,
   play: Play,
   default: HomePage,
   error: ErrorPage,
};

/* ----- spa init module --- */
const mySPA = (function () {

   /* ------- begin view -------- */
   function ModuleView() {
      let myModuleContainer = null;
      let menu = null;
      let contentContainer = null;
      let routesObj = null;

      this.init = function (container, routes) {
         myModuleContainer = container;
         routesObj = routes;
         menu = myModuleContainer.querySelector("#mainmenu");
         contentContainer = myModuleContainer.querySelector("#content");
         btnSave = myModuleContainer.querySelector('#btnSave');

      }

      this.renderContent = function (hashPageName) {//отрисовка контента
         let routeName = "default";
         if (hashPageName.length > 0) {//проверяем имя страницы
            routeName = hashPageName in routes ? hashPageName : "error";
         }
         window.document.title = routesObj[routeName].title; //передаем имя документа странице
         contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`); //отрисовываем контент
         this.renderExit();
         this.updateButtons(routesObj[routeName].id);
      }

      this.renderExit = function (level = 0, score = 0, lines = 0) {//отрисовка окна сохранения/выхода
   
         if (document.getElementById('exitScreen') === null) {
            let exitScreen = document.createElement('div');
            exitScreen.id = 'exitScreen';
            exitScreen.classList.add('exit-screen');
            exitScreen.classList.add('hide');
            document.body.append(exitScreen);
            exitScreen.innerHTML = `<h3>Enter Your Name</h3> 
         <input id='gamerName' class="input-name" placeholder="anonymous">
         <p>Level:<span id='level'> ${level} </span></p>
         <p>Score:<span id='score'> ${score} </span></p>
         <p>Lines:<span id='lines'> ${lines} </span></p>
         <p><a id='btnSave' href="#menu" class="btn b-red" disabled>save</a>     <a id="btnCancel" class="btn b-orange">cancel</a></p>`
         }

         if (document.querySelector('footer') === null) {//отрисовка footer
            let footer = document.createElement('footer');
            footer.innerHTML = '<p>&copy; 2021 everything will be fine!</p>';
            document.body.append(footer);
         }
      }

      this.updateScore = function (level = 0, score = 0, lines = 0) {//обновление данных счета
         let levelText = document.getElementById('level');
         let scoreText = document.getElementById('score');
         let linesText = document.getElementById('lines');

         levelText.textContent = `${level}`;
         scoreText.textContent = `${score}`;
         linesText.textContent = `${lines}`;

      }


      this.updateButtons = function (currentPage) { //обновление состояния окна переключения страниц
         const menuLinks = menu.querySelectorAll(".mainmenu__link");
         const content = myModuleContainer.querySelector('.content');
         for (let link of menuLinks) {

            currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
            currentPage === 'menu' ? content.classList.add('hide') : content.classList.remove('hide');
            currentPage === 'menu' ? menu.classList.remove('hide') : menu.classList.add('hide');

         }
      }

      this.showScreen = function () {//показать окно выхода/сохранения
         this.updateScore();
         let exitScreen = document.querySelector('#exitScreen');
         exitScreen.classList.remove('hide');
         document.getElementById('game').classList.add('hide');

      }

      this.hideScreen = function () {//спрятать окно выхода/сохранения
         let exitScreen = document.querySelector('#exitScreen');
         exitScreen.classList.add('hide');
         document.getElementById('game').classList.remove('hide');

      }

      this.printRecords = function (userList) {//выводим доску рекодов
         let arr = [];
         let records = document.getElementById('recordsBoard');

         if (records) {
            for (let user in userList) {
               arr.push(userList[user]);
               arr.sort(function (a, b) {//сортируем игроков по счету
                  return a.score - b.score;
               }).reverse();
            }

            for (let index in arr) {
               createRow(index, arr);
            }
            function createRow(user, userList) {
               let row = document.createElement('div');
               row.classList.add('row');
               row.innerHTML = ` 
         <span>${userList[user].username}</span> 
         <span>${userList[user].level}</span> 
         <span>${userList[user].score}</span> 
         <span>${userList[user].lines}</span>`;
               records.append(row);
            }

         }
      }

      this.startGame = function (container) {//init игры в #root

         let divGame = container.querySelector('#game');
         console.log(divGame);

         let play = document.querySelector('.play-page');
         console.log(play);
         if (container.contains(divGame)) {
            divGame.remove();
            let div = document.createElement('div');
            div.id = "game";
            play.prepend(div);
            this.createBtn(div);

         } else {
            let div = document.createElement('div');
            div.id = "game";
            play.prepend(div);
            this.createBtn(div);
         }

         const game = new Game();
         const view = new View();
         const controller = new Controller();

         game.init();
         view.init(divGame, 480, 640);
         controller.init(game, view);

      };

      this.createBtn = function (div) {// создаем кнопки закрыть и вкл/выкл звук
         if (document.getElementById('btnExit') === null) {
            let btnExit = document.createElement('a');
            btnExit.id = 'btnExit';
            btnExit.innerHTML = `<span class="left">
               <span class="circle-left"></span>
               <span class="circle-right"></span>
             </span>
             <span class="right">
               <span class="circle-left"></span>
               <span class="circle-right"></span>
             </span>`;
            div.append(btnExit);
         }

         if (document.getElementById('btnSound') === null) {
            let btnSound = document.createElement('a');
            btnSound.id = 'btnSound';
            btnSound.innerHTML = `<p class=icon><i class="icon-volume-mute" id="btnIconSound"></p></i>
            `;
            div.append(btnSound);


         }

      }
   }
   /* -------- end view --------- */
   /* ------- begin model ------- */
   function ModuleModel() {
      let myModuleView = null;
      let progressData = {};


      this.init = function (view) {
         myModuleView = view;
      }

      this.updateState = function (pageName) {
         myModuleView.renderContent(pageName);
      }

      this.startGame = function (container) {
         myModuleView.startGame(container);
      }

      this.hideScreen = function () {
         myModuleView.hideScreen();
      }

      this.showScreen = function () {
         myModuleView.showScreen();
      }

      this.getData = function () {//получаем данные из localstorage
         progressData = JSON.parse(localStorage.getItem('progress'));
         myModuleView.updateScore(progressData.level, progressData.score, progressData.lines);
      }

      this.clearData = function () {//удаляем данные из localstorage
         localStorage.removeItem('progress');
      }

      this.addUser = function (username, level, score, lines) {//сохраняем данные на firebase
         if (!username) {
            username = `anonym`;
         }
         myAppDB.ref('users/' + `user_${username.replace(/\s/g, "").toLowerCase()}`).set({
            username: `${username}`,
            level: `${level}`,
            score: `${score}`,
            lines: `${lines}`
         })
            .then(function (username) {
               console.log("Пользователь добавлен в коллецию users");
            })
            .catch(function (error) {
               console.error("Ошибка добавления пользователя: ", error);
            });
      }

      this.getUsersList = function () {//получаем данные из faribase database
         myAppDB.ref("users/").once("value")
            .then(function (snapshot) {
               myModuleView.printRecords(snapshot.val());
            }).catch(function (error) {
               console.log("Error: " + error.code);
            });
      }
   }


   /* -------- end model -------- */
   /* ----- begin controller ---- */
   function ModuleController() {
      let myModuleContainer = null;
      let myModuleModel = null;
      let gamerName = null;
      let gamerLevel = null;
      let gamerScore = null;
      let gamerLines = null;
      let sound = null;

      this.init = function (container, model) {
         myModuleContainer = container;
         myModuleModel = model;

         // вешаем слушателей на событие hashchange и кликам по пунктам меню
         window.addEventListener("hashchange", this.updateState);
         this.updateState(); //первая отрисовка

         document.addEventListener('click', function (e) { //обработка клика
            gamerName = document.querySelector('#gamerName');//данные счета
            gamerLevel = document.querySelector('#level');//данные счета
            gamerScore = document.querySelector('#score');//данные счета
            gamerLines = document.querySelector('#lines');//данные счета
            sound = document.getElementById('playsound');

            console.log(e.target);

            if (e.target && e.target.id === 'btnExit') {
               e.preventDefault();
               myModuleModel.showScreen();
               myModuleModel.getData();
               sound.pause();
            }

            if (e.target && e.target.id === 'btnSave') {
               myModuleModel.addUser(
                  gamerName.value,
                  gamerLevel.textContent,
                  gamerScore.textContent,
                  gamerLines.textContent
               )
               gamerName.value = '';
               myModuleModel.hideScreen();
               myModuleModel.clearData();
               sound.pause();
            }

            if (e.target && e.target.id === 'btnCancel') {
               e.preventDefault();
               myModuleModel.hideScreen();
            }

            if (e.target && e.target.id === 'btnHomepage') {
               myModuleModel.hideScreen();
               myModuleModel.clearData();
               sound.pause();
            }

            if (e.target && e.target.id === 'btnIconSound') {

               if (!sound.paused) {
                  sound.pause();
               } else {
                  sound.play();
               }
               // sound.muted = !sound.muted;
            }
         })

         window.onload = function () {//очистка данных в localstorage 
            myModuleModel.clearData();// при обновлении страницы
         }
      }

      this.updateState = function () {
         const hashPageName = window.location.hash.slice(1).toLowerCase();
         console.log(hashPageName)
         if (hashPageName != 'play') {
            myModuleModel.updateState(hashPageName);
         } else {
            myModuleModel.updateState(hashPageName);
            myModuleModel.startGame(myModuleContainer);
         }
         // myModuleModel.getData();
         myModuleModel.getUsersList();
      }

   };
   /* ------ end controller ----- */

   return {
      init: function ({ container, routes, components }) {
         this.renderComponents(container, components);

         const view = new ModuleView();
         const model = new ModuleModel();
         const controller = new ModuleController();

         //связываем части модуля
         view.init(document.getElementById(container), routes);
         model.init(view);
         controller.init(document.getElementById(container), model);
      },

      renderComponents: function (container, components) {
         const root = document.getElementById(container);
         const componentsList = Object.keys(components);
         for (let item of componentsList) {
            root.innerHTML += components[item].render("component");
         }
      },
   };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/

      // window.onload = function () {
      //   document.body.classList.add('loaded_hiding');
      //   mySPA.init({
      //    container: "root",
      //    routes: routes,
      //    components: components
      // })
      //   window.setTimeout(function () {
      //     document.body.classList.add('loaded');
      //     document.body.classList.remove('loaded_hiding');
      //   }, 500);
      // }
document.addEventListener("DOMContentLoaded", mySPA.init({
   container: "root",
   routes: routes,
   components: components
}));
