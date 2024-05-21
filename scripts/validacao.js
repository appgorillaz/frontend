

/*------------------------------------ */
/*validação cadastro */

document.getElementById('registerButton').addEventListener('click', function(event) {
    event.preventDefault();

    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const senha = document.querySelector('input[name="senha"]').value;
    const senhaCon = document.querySelector('input[name="senha-con"]').value;
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = '';

    if (!nome || !email || !senha || !senhaCon) {
        errorMessage.textContent = 'Todos os campos são obrigatórios.';
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.textContent = 'E-mail inválido.';
        return;
    }

    if (senha.length < 6) {
        errorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        return;
    }

    if (senha !== senhaCon) {
        errorMessage.textContent = 'As senhas não coincidem.';
        return;
    }

    alert('Cadastro realizado com sucesso!');
    // Aqui você pode adicionar o código para enviar os dados para o servidor
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


/*------------------------------------ */
/*------------------------------------ */
/*------------------------------------ */