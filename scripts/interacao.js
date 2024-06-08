if (!localStorage.getItem("token")) {
  window.location.href = "./pages/login.html";
}

const getPosts = async () => {
  let posts;
  await axios
    .get("http://localhost:8081/post", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => (posts = res.data))
    .catch((err) => console.log(err));

  //crie um h2 para receber o titulo do post, um p para receber o texto e um p para receber a dataadicione esses elementos ao containerPosts
  const containerPosts = document.querySelector(".container-cards");
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("card_post");

    const h2 = document.createElement("h2");
    h2.textContent = post.title;
    h2.classList.add("titulo_post");

    const pText = document.createElement("p");
    pText.textContent = post.text;
    pText.classList.add("conteudo_post");

    const pData = document.createElement("p");
    const [ano, mes, dia] = post.postDate.split("-");
    pData.textContent = `Publicado em ${dia}/${mes}/${ano}`;
    pData.classList.add("data_post");

    div.appendChild(h2);
    div.appendChild(pData);
    div.appendChild(pText);

    containerPosts.appendChild(div);
  });
  console.log(posts);
};

getPosts();
