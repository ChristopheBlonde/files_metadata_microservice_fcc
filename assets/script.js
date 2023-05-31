document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is loaded");
  document.getElementById("file-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const inputFile = document.getElementById("upfile");
    const data = new FormData();
    data.append("upfile", inputFile.files[0]);
    fetch(`${window.location.href}api/fileanalyse`, {
      method: "post",
      headers: new Headers(),
      mode: "cors",
      cache: "default",
      body: data,
    })
      .then((data) => {
        data
          .json()
          .then((response) => {
            console.log(response);
            document
              .getElementById("response-container")
              .classList.remove("hidden");
            document.getElementById("name").innerText = response.name;
            document.getElementById("type").innerText = response.type;
            document.getElementById("size").innerText = response.size;
            inputFile.value = null;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});
