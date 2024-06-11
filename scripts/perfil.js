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
