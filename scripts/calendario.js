const getEvents = async () => {
  let events = [];
  await axios
    .get("http://localhost:8081/events", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      events = res.data;
    })
    .catch((err) => console.log(err));

  const calendar = document.getElementById("calendar");
  const monthDisplay = document.getElementById("monthDisplay");
  const backButton = document.getElementById("backButton");
  const nextButton = document.getElementById("nextButton");

  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close-button");
  const eventDate = document.getElementById("eventDate");
  const eventsContainer = document.getElementById("events");
  const eventoMostrado = document.getElementsByClassName(
    "mostrar-eventos-container"
  );

  let currentDate = new Date();

  backButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  function renderCalendar() {
    calendar.innerHTML = "";
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDayIndex = lastDayOfMonth.getDay();
    const lastDayPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const daysInMonth = lastDayOfMonth.getDate();

    monthDisplay.innerText = currentDate.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    // Display days from previous month
    for (let i = firstDayIndex; i > 0; i--) {
      const day = document.createElement("div");
      day.classList.add("day", "other-month");
      day.innerText = lastDayPrevMonth - i + 1;
      calendar.appendChild(day);
    }

    // Display days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement("div");
      day.classList.add("day");

      // Verificar se há eventos no dia atual
      const eventDay = events.some((event) => {
        const eventStartDate = new Date(event.startDate);
        return (
          eventStartDate.getDate() === i &&
          eventStartDate.getMonth() === currentMonth &&
          eventStartDate.getFullYear() === currentYear
        );
      });

      if (eventDay) {
        day.classList.add("event-day");
      }

      day.innerText = i;
      day.addEventListener("click", () => openModal(i));
      calendar.appendChild(day);
    }

    // Display days from next month
    for (let i = 1; i < 7 - lastDayIndex; i++) {
      const day = document.createElement("div");
      day.classList.add("day", "other-month");
      day.innerText = i;
      calendar.appendChild(day);
    }
  }

  function openModal(day) {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    eventDate.innerText = selectedDate.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    eventsContainer.innerHTML = "";
    const dayEvents = events.filter((event) => {
      const eventStartDate = new Date(event.startDate);
      // Verifica se o evento ocorre no mesmo dia que o selectedDate
      return (
        eventStartDate.getDate() === selectedDate.getDate() &&
        eventStartDate.getMonth() === selectedDate.getMonth() &&
        eventStartDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    if (dayEvents.length > 0) {
      dayEvents.forEach((event) => {
        const eventElement = document.createElement("div");

        const h2 = document.createElement("h2");
        h2.innerText = event.title;
        eventElement.appendChild(h2);

        const inicio = document.createElement("p");
        inicio.innerText = `Início: ${formatDateTime(event.startDate)}`;
        eventElement.appendChild(inicio);

        const fim = document.createElement("p");
        fim.innerText = `Fim: ${formatDateTime(event.endDate)}`;
        eventElement.appendChild(fim);

        const local = document.createElement("p");
        local.innerText = `Local: ${event.location}`;
        eventElement.appendChild(local);

        const registerButton = document.createElement("button");
        registerButton.classList.add("btn-participar-modal");
        registerButton.innerText = "Participar";

        const buttonImage = document.createElement("img");
        buttonImage.src = "../img/icons/participar-icon.svg";
        registerButton.appendChild(buttonImage);
        eventElement.appendChild(registerButton);

        registerButton.addEventListener("click", () => {
          Toastify({
            text: "Presença confirmada com sucesso!",
            duration: 2000,
          }).showToast();
        });

        eventsContainer.appendChild(eventElement);
      });
    } else {
      eventsContainer.innerText = "Nenhum evento";
    }

    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  closeButton.addEventListener("click", closeModal);
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });

  renderCalendar();

  const constainerEvents = document.querySelector(".mostrar-eventos-container");
  events.forEach((event) => {
    const divEvent = document.createElement("div");
    divEvent.classList.add("mostrar-evento-div");

    const divEventDate = document.createElement("div");
    divEventDate.classList.add("mostrar-evento_data");

    const pEventDay = document.createElement("p");
    pEventDay.classList.add("mostrar-evento_dia");
    pEventDay.textContent = new Date(event.startDate).getDate();

    const pEventMonth = document.createElement("p");
    pEventMonth.classList.add("mostrar-evento_mes");
    pEventMonth.textContent = new Date(event.startDate).toLocaleDateString(
      "pt-BR",
      { month: "short" }
    );

    divEventDate.appendChild(pEventDay);
    divEventDate.appendChild(pEventMonth);

    const divEventInfo = document.createElement("div");
    divEventInfo.classList.add("mostrar-evento_conteudo");

    const pEventTitle = document.createElement("p");
    pEventTitle.classList.add("mostrar-evento_titulo");
    pEventTitle.textContent = event.title;

    const pEventLocation = document.createElement("p");
    pEventLocation.classList.add("mostrar-evento_conteudo");
    pEventLocation.textContent = event.location;

    divEventInfo.appendChild(pEventTitle);
    divEventInfo.appendChild(pEventLocation);

    divEvent.appendChild(divEventDate);
    divEvent.appendChild(divEventInfo);

    constainerEvents.appendChild(divEvent);
  });
};

getEvents();

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);

  const day = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `dia ${day} às ${hours}h${minutes}`;
};
