axios
  .get("http://localhost:8081/users/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then((res) => {
    document.querySelector('input[name="nome"]').value = res.data.name;
    document.querySelector('input[name="email"]').value = res.data.email;
    document.querySelector('input[name="ra"]').value = res.data.ra;
    document.querySelector('select[name="genero"]').value = res.data.gender;
    document.querySelector('select[name="curso"]').value = res.data.course;
    document.querySelector('select[name="periodo"]').value = res.data.period;
    document.querySelector('select[name="semestre"]').value = res.data.semester;
  })
  .catch((err) => console.log(err));

document.querySelector(".btn-sair").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
});

document.querySelector(".btn-atualizar").addEventListener("click", () => {
  const name = document.querySelector('input[name="nome"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const ra = document.querySelector('input[name="ra"]').value;
  const gender = document.querySelector('select[name="genero"]').value;
  const course = document.querySelector('select[name="curso"]').value;
  const period = document.querySelector('select[name="periodo"]').value;
  const semester = document.querySelector('select[name="semestre"]').value;

  const msgErroNome = document.getElementById("error-message-name");
  const msgErroEmail = document.getElementById("error-message-email");
  const msgErroRa = document.getElementById("error-message-ra");

  const inputs = [
    {
      element: name,
      errorMessage: msgErroNome,
      message: "Nome é obrigatório.",
    },
    {
      element: email,
      errorMessage: msgErroEmail,
      message: "Email é obrigatório.",
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

  const data = {
    name,
    email,
    ra,
    gender,
    course,
    period,
    semester: Number(semester),
  };

  axios
    .put("http://localhost:8081/users/me", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      Toastify({
        text: "Perfil atualizado com sucesso!",

        duration: 2000,
      }).showToast();
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch((err) => {
      Toastify({
        text: `Erro na atualização!`,

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
