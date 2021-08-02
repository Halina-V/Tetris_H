const HomePage = {
   id: "menu",
   title: "TETRIS",
   render: (className = "container", ...rest) => {
      return `
       <section class="${className}">
       </section>
     `;
   }
};

const Rules = {
   id: "rules",
   title: "GAMEPLAY INFO",
   render: (className = "container", ...rest) => {
      return `
       <section class="${className}">
       <a href="#menu"><span class="left">
       <span class="circle-left"></span>
       <span class="circle-right"></span>
     </span>
     <span class="right">
       <span class="circle-left"></span>
       <span class="circle-right"></span>
     </span></a>
         <h1>GENERAL GAMEPLAY INFO</h1>
         <p style="text-align:left">Goal – Put your organizational skills and endurance to the test by clearing as many lines as possible.<br>

         Clear lines – Maneuver the falling Tetriminos to fit them together within the Matrix. To clear a line, fill every square within a single row.<br>
         
         Score points – Earn points by clearing lines. Clear multiple lines at once to increase your scoring opportunities.<br>
                  
         Next queue – Preview the upcoming Tetrimino in the Next Queue to plan ahead and increase your scoring opportunities.<br>
                  
         Game over – Stack the Tetriminos too high and the game is over!<br>
         
         </p>
                  <h2>CONTROL OPTIONS & SCORES</h2> 
         <ul class="control">
        <li> <img class="iconIMG" src="https://img.icons8.com/fluency/48/000000/sort-down.png"/><span>move down</span>
         <img class="iconIMG" src="https://img.icons8.com/fluency/48/000000/sort-up.png"/>  <span>rotate piece</span></li>
         <li>  <img class="iconIMG" src="https://img.icons8.com/fluency/48/000000/sort-left.png"/> <span>move right</span>
           <img class="iconIMG" src="https://img.icons8.com/fluency/48/000000/sort-right.png"/> <span>move left</span></li>
         <li><img class="iconIMG" src="https://pngimage.net/wp-content/uploads/2018/06/space-button-png-1.png" /> <span>start/pause</span></li>
         </ul>
       </section>
     `;
   }
};

const Records = {
   id: "records",
   title: "RECORDS BOARD",
   render: (className = "container", ...rest) => {
      return `
       <section class="${className}">
       <a href="#menu" ><span class="left">
       <span class="circle-left"></span>
       <span class="circle-right"></span>
     </span>
     <span class="right">
       <span class="circle-left"></span>
       <span class="circle-right"></span>
     </span></a>
         <h1>RECORDS BOARD</h1>
         <div id='recordsBoard'>
         <div class="row">
         <span>Name</span>
         <span>Level</span>
         <span>Score</span>
         <span>Lines</span>
         </div>
         </div>
       </section>
     `;
   }
};

const Play = {
   id: "play",
   title: "Play",
   render: (className = "container", ...rest) => {
      return `
       <section class="${className}">
     
       </section>
     `;
   }
};

const ErrorPage = {
   id: "error",
   title: "Achtung, warning, kujdes, attenzione, pozornost...",
   render: (className = "container", ...rest) => {
      return `
       <section class="${className}">
         <h1 style="color: red">Ошибка 404</h1>
         <p style="color: red">Страница не найдена, попробуйте вернуться на <a href="#main">главную</a>.</p>
       </section>
     `;
   }
};
