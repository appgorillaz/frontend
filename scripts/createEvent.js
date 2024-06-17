const isTokenExpired = (token) => {
  if (!token) return true;

  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;

  // Verifica se o token já expirou
  if (decoded.exp < currentTime) {
    return true;
  }

  return false;
};

if (
  !localStorage.getItem("token") ||
  isTokenExpired(localStorage.getItem("token"))
) {
  window.location.href = "./login.html";
}

const sportInput = document.getElementById("check-esportes");
const eventInput = document.getElementById("check-eventos");

const toggleCheckboxes = () => {
  if (sportInput.checked) {
    eventInput.disabled = true;
  } else {
    eventInput.disabled = false;
  }

  if (eventInput.checked) {
    sportInput.disabled = true;
  } else {
    sportInput.disabled = false;
  }
};

sportInput.addEventListener("change", toggleCheckboxes);
eventInput.addEventListener("change", toggleCheckboxes);

document
  .querySelector(".btn-novoPost-publicar")
  .addEventListener("click", () => {
    const title = document.getElementById("titulo-novoPost").value;
    const location = document.getElementById("local-NovoPost").value;
    const startDate = document.getElementById("start_date").value;
    const endDate = document.getElementById("end_date").value;

    const type = sportInput.checked
      ? "Esporte"
      : eventInput.checked
      ? "Evento"
      : null;

    const errorMessage = document.getElementById("error-message");

    if (!title || !location || !startDate || !endDate || !type) {
      return (errorMessage.textContent = "Preencha todos os campos!");
    }

    const data = {
      eventName: title,
      location,
      startDate,
      endDate,
      type,
    };

    axios
      .post("http://localhost:8081/events", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        Toastify({
          text: "Evento criado com sucesso!",

          duration: 2000,
        }).showToast();
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 2000);
      })
      .catch((err) => {
        Toastify({
          text: "Erro na criação de evento!",

          duration: 2000,
        }).showToast();
        console.log(err);
      });
  });
