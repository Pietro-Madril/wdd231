document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

const params = new URLSearchParams(window.location.search);

const fields = ["Name", "characterName", "characterClass", "campaing", "email", "phone", "timestamp"];
const summary = document.getElementById("summary");

fields.forEach(field => {
  const value = params.get(field);
  if (value) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${field}:</strong> ${value}`;
    summary.appendChild(li);
  }
});
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
