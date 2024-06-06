/*------------------------------------ */
/*validação cadastro */

const representativeInput = document.getElementById("check-representative");
let is_representative = false;

representativeInput.addEventListener("change", () => {
  is_representative = !is_representative;
});

document
  .getElementById("registerButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const ra = document.querySelector('input[name="ra"]').value;
    const genero = document.querySelector('select[name="genero"]').value;
    const curso = document.querySelector('select[name="curso"]').value;
    const periodo = document.querySelector('select[name="periodo"]').value;
    const semestre = document.querySelector('select[name="semestre"]').value;
    const senha = document.querySelector('input[name="senha"]').value;
    const senhaCon = document.querySelector('input[name="senha-con"]').value;
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = "";

    if (
      !nome ||
      !email ||
      !ra ||
      !genero ||
      !curso ||
      !semestre ||
      !periodo ||
      !senha ||
      !senhaCon
    ) {
      errorMessage.textContent = "Todos os campos são obrigatórios.";
      return;
    }

    if (!validateEmail(email)) {
      errorMessage.textContent = "E-mail inválido.";
      return;
    }

    if (!validateRA(ra)) {
      errorMessage.textContent = "RA contem letras ou não tem 13 caracteres.";
      return;
    }

    if (senha.length < 6) {
      errorMessage.textContent = "A senha deve ter pelo menos 6 caracteres.";
      return;
    }

    if (senha !== senhaCon) {
      errorMessage.textContent = "As senhas não coincidem.";
      return;
    }

    const data = {
      name: nome,
      email,
      password: senha,
      ra,
      gender: genero,
      course: curso,
      period: periodo,
      semester: semestre,
      is_representative,
    };

    console.log(data);
    // Aqui você pode adicionar o código para enviar os dados para o servidor
  });

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateRA = (ra) => {
  const raRefex = /^[0-9]{13}$/;
  return raRefex.test(ra);
};

/*------------------------------------ */
/*------------------------------------ */
/*------------------------------------ */
