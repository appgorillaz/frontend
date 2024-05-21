
/* editar imagem de perfil */

document.addEventListener('DOMContentLoaded', function() {
    const uploadFotoInput = document.getElementById('upload-foto');
    const editIcon = document.getElementById('edit-icon');

    // Adiciona um evento de clique ao ícone de edição
    editIcon.addEventListener('click', function() {
        // Aciona o clique no elemento de input de arquivo associado
        uploadFotoInput.click();
    });

    // Adiciona um evento de mudança ao input de arquivo
    uploadFotoInput.addEventListener('change', function() {
        // Verifica se um arquivo foi selecionado
        if (uploadFotoInput.files && uploadFotoInput.files[0]) {
            // Código para exibir a foto de perfil selecionada
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('foto-perfil-preview').src = e.target.result;
            };
            reader.readAsDataURL(uploadFotoInput.files[0]);
        }
    });
});

/*editar sobre mim */

document.addEventListener('DOMContentLoaded', function() {
    // Quem sou eu
    const editQuemSouEuIcon = document.getElementById('edit-quem-sou-eu');
    const quemSouEuTexto = document.getElementById('quem-sou-eu-texto');
    const quemSouEuInput = document.getElementById('quem-sou-eu-input');

    editQuemSouEuIcon.addEventListener('click', function() {
        quemSouEuInput.style.display = 'block';
        quemSouEuInput.value = quemSouEuTexto.textContent;
        quemSouEuTexto.style.display = 'none';
        editQuemSouEuIcon.classList.add('hidden');
        // Oculta o ícone de lápis
        editQuemSouEuIcon.classList.add('hidden');
        quemSouEuInput.focus();
    });

    quemSouEuInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            salvarQuemSouEu();
        }
    });

    function salvarQuemSouEu() {
        quemSouEuTexto.textContent = quemSouEuInput.value;
        quemSouEuInput.style.display = 'none';
        quemSouEuTexto.style.display = 'block';
        // Mostra o ícone de lápis
        editQuemSouEuIcon.classList.remove('hidden');
    }

    // Curso
    const editCursoIcon = document.getElementById('edit-curso');
    const cursoTexto = document.getElementById('curso-texto');
    const cursoInput = document.getElementById('curso-input');

    editCursoIcon.addEventListener('click', function() {
        cursoInput.style.display = 'block';
        cursoInput.value = cursoTexto.textContent;
        cursoTexto.style.display = 'none';
        // Oculta o ícone de lápis
        editCursoIcon.classList.add('hidden');
        cursoInput.focus();
    });

    cursoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            salvarCurso();
        }
    });

    function salvarCurso() {
        cursoTexto.textContent = cursoInput.value;
        cursoInput.style.display = 'none';
        cursoTexto.style.display = 'block';
        // Mostra o ícone de lápis
        editCursoIcon.classList.remove('hidden');
    }
});
