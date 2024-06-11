// const isTokenExpired = (token) => {
//   if (!token) return true;

//   const decoded = jwt_decode(token);
//   const currentTime = Date.now() / 1000;

//   // Verifica se o token já expirou
//   if (decoded.exp < currentTime) {
//     return true;
//   }

//   return false;
// };

// if (
//   !localStorage.getItem("token") ||
//   isTokenExpired(localStorage.getItem("token"))
// ) {
//   window.location.href = "./login.html";
// }

CKEDITOR.replace("texto-novoPost", {
  toolbar: [
    { name: "clipboard", items: ["Undo", "Redo"] },
    { name: "editing", items: ["Find", "Replace"] },
    {
      name: "basicstyles",
      items: [
        "Bold",
        "Italic",
        "Underline",
        "Strike",
        "Subscript",
        "Superscript",
        "RemoveFormat",
      ],
    },
    {
      name: "paragraph",
      items: ["NumberedList", "BulletedList", "Blockquote"],
    },
    { name: "links", items: ["Link", "Unlink"] },
    { name: "insert", items: ["HorizontalRule", "SpecialChar"] },
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
    { name: "colors", items: ["TextColor", "BGColor"] },
    { name: "tools", items: ["Maximize"] },
  ],
});

document
  .querySelector(".btn-novoPost-publicar")
  .addEventListener("click", () => {
    const title = document.getElementById("titulo-novoPost").value;
    const text = CKEDITOR.instances["texto-novoPost"].getData();

    const errorMessage = document.getElementById("error-message-post");

    if (!title || !text) {
      return (errorMessage.textContent = "Preencha todos os campos!");
    }

    const data = {
      title,
      text,
    };

    axios
      .post("http://localhost:8081/post", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        Toastify({
          text: "Post criado com sucesso!",

          duration: 2000,
        }).showToast();
        setTimeout(() => {
          window.location.href = "../feed.html";
        }, 2000);
      })
      .catch((err) => {
        Toastify({
          text: "Erro na criação de post!",

          duration: 2000,
        }).showToast();
        console.log(err);
      });
  });
