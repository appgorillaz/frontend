document.addEventListener('DOMContentLoaded', function() {
    const btnMaisAdm = document.querySelector('.btn-mais-adm');
    const menuAdmContainer = document.querySelector('.menu-adm-container');

    btnMaisAdm.addEventListener('click', function() {
        if (menuAdmContainer.classList.contains('show')) {
            menuAdmContainer.classList.remove('show');
            setTimeout(() => {
                menuAdmContainer.style.display = 'none';
            }, 300); // Corresponde ao tempo da animação
        } else {
            menuAdmContainer.style.display = 'flex';
            setTimeout(() => {
                menuAdmContainer.classList.add('show');
            }, 10); // Pequeno delay para permitir a transição
        }
    });
});