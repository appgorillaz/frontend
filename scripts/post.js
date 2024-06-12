const urlParams = new URLSearchParams(window.location.search);

axios
  .get(`http://localhost:8081/posts/${urlParams.get("id")}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then((res) => {
    const divPost = document.querySelector(".div-post");

    const title = document.createElement("h2");
    title.textContent = res.data.title;
    title.classList.add("titulo_post");

    const data = document.createElement("p");
    const [ano, mes, dia] = res.data.postDate.split("-");
    data.textContent = `Publicado em ${dia}/${mes}/${ano}`;
    data.classList.add("data_post");

    const text = document.createElement("div");
    text.classList.add("conteudo_post");
    text.innerHTML = res.data.text;

    divPost.appendChild(title);
    divPost.appendChild(data);
    divPost.appendChild(text);
  })
  .catch((err) => console.log(err));
