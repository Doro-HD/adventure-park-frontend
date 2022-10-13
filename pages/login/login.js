function handleSubmit(event) {
    event.preventDefault();
    console.log("Epic gamer moemnt pog")
    const data = new FormData(event.target);

    const value = data.get('username');

    console.log({ value });
}

  const form = document.querySelector("submit");
  form.addEventListener('submit', handleSubmit);