document.addEventListener("DOMContentLoaded", () => {
  const eventsContainer = document.getElementById("events-container");

  fetch("data/events.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar o arquivo JSON.");
      }
      return response.json();
    })
    .then(data => {
      if (!data.events || !Array.isArray(data.events)) {
        throw new Error("Invalid Data.");
      }

      const goldEvents = data.events.filter(event => event.membership === "Gold");
      const limitedEvents = goldEvents.slice(0, 4);
      limitedEvents.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <h3>${event.name}</h3>
          <p><strong>Dungeon Master:</strong> ${event.dungeonmaster}</p>
          <p><strong>System:</strong> <a href="${event.system}" target="_blank">${event.system}</a></p>
          <p>${event.about || "Without Information."}</p>
        `;

        eventsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erro ao processar eventos:", error);
      eventsContainer.innerHTML = `<p>Error on loading. Try Again.</p>`;
    });
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "thankyou.html";
    });
  }
});
