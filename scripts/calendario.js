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
let events = {}; // Object to store events

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
  const dayEvents = events[selectedDate.toDateString()] || [];
  if (dayEvents.length > 0) {
    dayEvents.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.innerText = event;
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

const getEvents = async () => {
  let events;
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
