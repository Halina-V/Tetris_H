const Header = {
   render: (customClass = "") => {
      return `
       <header class="header ${customClass}" id="header">
         <a href="#menu" id="btnMenu">
         <div class="button_base b07_3d_double_roll" id="btnHomepage">
             <div>TETRIS</div>
             <div>HOMEPAGE</div>
             <div>TETRIS</div>
             <div>HOMEPAGE</div>
         </div>
     </a>
       </header>
     `;
   }
};

const NavBar = {
   render: (customClass = "") => {
      return `
       <nav class="mainmenu ${customClass} " id="mainmenu">
       <div class="line left">
      <div class="scanner"></div>
    </div>
         <ul class="mainmenu__list">
           <li><a class="mainmenu__link" href="#menu"></a></li>
           <li><a class="mainmenu__link btn b-green" href="#rules">GAMEPLAY INFO</a></li>
           <li><a class="mainmenu__link btn b-red" href="#records" id='btnRecords'>RECORDS BOARD</a></li>
           <li><a class="mainmenu__link btn b-orange" href="#play">PLAY</a></li>
         </ul>
         <div class="line right">
      <div class="scanner"></div>
       </nav>
     `;
   }
};

const Content = {
   render: (customClass = "") => {
      return `<div class="content ${customClass}" id="content"></div>`;
   }
};


