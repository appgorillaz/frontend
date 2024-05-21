

//botoes nav bar
const btn_home = document.getElementById('btn-nav_home');
const btn_calendario = document.getElementById('btn-nav_calendario');

const btn_perfil = document.getElementById('btn-nav_perfil');





function mudarPagina(botao, pagina) {
    botao.addEventListener('click', function() {
      window.location.href = pagina;
    })
  }

mudarPagina(btn_home, "../feed.html");
mudarPagina(btn_calendario, "../pages/calendario.html")
mudarPagina(btn_perfil, "../pages/perfil.html")
