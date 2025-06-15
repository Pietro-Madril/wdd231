document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

const eventsUrl = "data/events.json";

async function loadSpotlights() {
  try {
    const response = await fetch(eventsUrl);
    if (!response.ok) throw new Error("Error to load events");

    const data = await response.json();
    const events = data.events.filter(event => event.membership === "Gold" || event.membership === "Silver");

    const randomSpotlights = getRandomEvents(events, 3);
    displaySpotlights(randomSpotlights);
  } catch (error) {
    console.error("Error to load members:", error);
  }
}
function getRandomEvents(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
function displaySpotlights(events) {
  const container = document.getElementById("spotlightContainer");
  if (!container) return;

  events.forEach(event => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${event.icon}" alt="Image for ${event.name} event" loading="lazy">
      <h3>${event.name}</h3>
      <p><strong>Date:</strong> ${event.startingdate}</p>
      <p><strong>Dungeon Master:</strong> ${event.dungeonmaster}</p>
      <p><strong>System:</strong> ${event.system}</p>
      <p><strong>Membership:</strong> ${event.membership.charAt(0).toUpperCase() + event.membership.slice(1)}</p>
    `;

    container.appendChild(card);
  });
}
loadSpotlights();
