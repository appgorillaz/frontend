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

    const msgErroNome = document.getElementById("error-message-name");
    const msgErroEmail = document.getElementById("error-message-email");
    const msgErroSenha = document.getElementById("error-message-password");
    const msgErroSenhaCon = document.getElementById(
      "error-message-passwordConfirm"
    );
    const msgErroRa = document.getElementById("error-message-ra");

    const inputs = [
      {
        element: nome,
        errorMessage: msgErroNome,
        message: "Nome é obrigatório.",
      },
      {
        element: email,
        errorMessage: msgErroEmail,
        message: "Email é obrigatório.",
      },
      {
        element: senha,
        errorMessage: msgErroSenha,
        message: "Senha é obrigatória.",
      },
      {
        element: senhaCon,
        errorMessage: msgErroSenhaCon,
        message: "Confirmação de senha é obrigatória.",
      },
    ];

    inputs.forEach(({ element, errorMessage, message }) => {
      if (!element) {
        errorMessage.textContent = message;
      } else {
        errorMessage.textContent = "";
      }
    });

    if (inputs.some(({ errorMessage }) => errorMessage.textContent !== "")) {
      return;
    }

    if (!validateEmail(email)) {
      return (msgErroEmail.textContent = "E-mail inválido.");
    }

    if (ra && !validateRA(ra)) {
      return (msgErroRa.textContent =
        "RA contem letras ou não tem 13 caracteres.");
    }

    if (senha.length < 6) {
      return (msgErroSenha.textContent =
        "A senha deve ter pelo menos 6 caracteres.");
    }

    if (senha !== senhaCon) {
      return (msgErroSenhaCon.textContent = "As senhas não coincidem.");
    }

    const data = {
      name: nome,
      email,
      password: senha,
      ra,
      gender: genero,
      course: curso,
      period: periodo,
      semester: Number(semestre),
      is_representative,
    };
    axios
      .post("http://localhost:8081/users/register", data)
      .then((res) => {
        Toastify({
          text: "Cadastro realizado com sucesso!",

          duration: 2000,
        }).showToast();
        setTimeout(() => {
          window.location.href = "./login.html";
        }, 2000);
      })
      .catch((err) => {
        Toastify({
          text: `Erro: ${err.response.data}`,

          duration: 2000,
        }).showToast();
      });
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
