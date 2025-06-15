document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;


const eventsUrl = "data/events.json";

async function getEvents() {
  try {
    const response = await fetch(eventsUrl);
    if (!response.ok) throw new Error("Loading Error");
    const data = await response.json();
    displayEvents(data.events);
  } catch (error) {
    console.error("Error on fetch:", error);
  }
}

function displayEvents(events) {
  const eventsContainer = document.querySelector('#events');
  eventsContainer.innerHTML = '';

  events.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="images/${event.icon}" alt="Image for ${event.name} event" loading="lazy">
      <h3>${event.name}</h3>
      <p><strong>Date:</strong> ${event.startingdate}</p>
      <p><strong>Dungeon Master:</strong> ${event.dungeonmaster}</p>
      <p><strong>System:</strong> ${event.system}</p>
      <p><strong>Membership:</strong> ${event.membership.charAt(0).toUpperCase() + event.membership.slice(1)}</p>
      <p> ${event.about} <p>
    `;

    eventsContainer.appendChild(card);
  });
}

const gridButton = document.querySelector('#gridView');
const listButton = document.querySelector('#listView');
const eventsContainer = document.querySelector('#events');
gridButton.addEventListener('click', () => {
  eventsContainer.classList.add('course-grid');
  eventsContainer.classList.remove('course-list');
});
listButton.addEventListener('click', () => {
  eventsContainer.classList.add('course-list');
  eventsContainer.classList.remove('course-grid');
});


getEvents();
