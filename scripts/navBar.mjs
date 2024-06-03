

//botoes nav bar
const btn_home = document.getElementById('btn-nav_home');
const btn_calendario = document.getElementById('btn-nav_calendario');
const btn_perfil = document.getElementById('btn-nav_perfil');

const btnDeskHome = document.getElementById('btn-nav-desk_home');
const btnDeskCalen = document.getElementById('btn-nav-desk_calendario');
const btnDeskPerfil = document.getElementById('btn-nav-desk_perfil');



function mudarPagina(botao, pagina) {
    botao.addEventListener('click', function() {
      window.location.href = pagina;
    })
  }

mudarPagina(btn_home, "../feed.html");
mudarPagina(btn_calendario, "../pages/calendario.html")
mudarPagina(btn_perfil, "../pages/perfil.html")

mudarPagina(btnDeskHome, "../feed.html");
mudarPagina(btnDeskCalen, "../pages/calendario.html")
mudarPagina(btnDeskPerfil, "../pages/perfil.html")