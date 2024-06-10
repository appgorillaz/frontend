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
    .then((res) => {
      posts = res.data;
    })
    .catch((err) => console.log(err));

  const containerPosts = document.querySelector(".container-cards");
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("card_post");

    const h2 = document.createElement("h2");
    h2.textContent = post.title;
    h2.classList.add("titulo_post");

    const pText = document.createElement("div");
    pText.innerHTML = post.text;

    const children = pText.children;

    for (let i = 0; i < children.length; i++) {
      children[i].classList.add("conteudo_post");
    }

    pText.classList.add("conteudo_post");

    const pData = document.createElement("p");
    const [ano, mes, dia] = post.postDate.split("-");
    pData.textContent = `Publicado em ${dia}/${mes}/${ano}`;
    pData.classList.add("data_post");

    //criando div para interações de like e comentario
    const divInteractions = document.createElement("div");
    divInteractions.classList.add("container-interacao");

    const likeButton = document.createElement("button");
    likeButton.id = "btn-interacao_like";
    likeButton.classList.add("botao_interacao");

    const likeImage = document.createElement("img");
    likeImage.src = "../img/icons/coracao.svg";
    likeImage.classList.add("icon-interacao");

    likeButton.appendChild(likeImage);

    const commentButton = document.createElement("button");
    commentButton.id = "btn-interacao_comentario";
    commentButton.classList.add("botao_interacao");

    const commentImage = document.createElement("img");
    commentImage.src = "../img/icons/comentar.svg";
    commentImage.classList.add("icon-interacao");

    commentButton.appendChild(commentImage);

    divInteractions.appendChild(likeButton);
    divInteractions.appendChild(commentButton);

    div.appendChild(h2);
    div.appendChild(pData);
    div.appendChild(pText);
    div.appendChild(divInteractions);

    containerPosts.appendChild(div);
  });
};

getPosts();
