
const btnVoltar = document.querySelector('.btn-voltar');
const btnDescartar = document.querySelector('.btn-novoPost-decartar');


function voltarpagina(botao){
    document.addEventListener('DOMContentLoaded', function() {
      
        botao.addEventListener('click', function() {
            window.history.back();
        });
        
    });
};

voltarpagina(btnVoltar);
voltarpagina(btnDescartar);