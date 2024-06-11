

document.addEventListener('DOMContentLoaded', function() {
    const btnMaisAdm = document.querySelector('.btn-mais-adm');
    const sectionContainer = document.querySelector('.adm-section-container');

    btnMaisAdm.addEventListener('click', function() {
        const existingMenu = document.querySelector('.menu-adm-container');
        
        if (existingMenu) {
            existingMenu.classList.remove('show');
            setTimeout(() => {
                existingMenu.remove();
            }, 300);
        } else {
            const menuAdmContainer = document.createElement('div');
            menuAdmContainer.classList.add('menu-adm-container');
            
            const novoEventoLink = document.createElement('a');
            novoEventoLink.href = 'pages/novoEvento.html';
            novoEventoLink.textContent = 'Novo evento';

            const novoPostLink = document.createElement('a');
            novoPostLink.href = 'pages/novoPost.html';
            novoPostLink.textContent = 'Novo post';

            menuAdmContainer.appendChild(novoEventoLink);
            menuAdmContainer.appendChild(novoPostLink);

            sectionContainer.appendChild(menuAdmContainer);

            setTimeout(() => {
                menuAdmContainer.classList.add('show');
            }, 10);
        }
    });
});