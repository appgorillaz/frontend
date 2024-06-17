document.getElementById("loginButton").addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  const msgErroEmail = document.getElementById("error-message-email");
  const msgErroPassword = document.getElementById("error-message-password");

  const inputs = [
    {
      element: email,
      errorMessage: msgErroEmail,
      message: "Email é obrigatório.",
    },
    {
      element: password,
      errorMessage: msgErroPassword,
      message: "Senha é obrigatória.",
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

  const data = {
    email,
    password,
  };

  axios
    .post("http://localhost:8081/users/login", data)
    .then((res) => {
      console.log(res);
      Toastify({
        text: "Login realizado com sucesso!",

        duration: 2000,
      }).showToast();
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    })
    .catch((err) => {
      Toastify({
        text: "E-mail ou senha incorretos!",

        duration: 2000,
      }).showToast();
    });
});
