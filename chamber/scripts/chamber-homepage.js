document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

const memberUrl = "data/members.json";

async function loadSpotlights() {
  try {
    const response = await fetch(memberUrl);
    if (!response.ok) throw new Error("Error to load members");

    const data = await response.json();
    const members = data.members.filter(member => member.membership === "Gold" || member.membership === "Silver");

    const randomSpotlights = getRandomMembers(members, 3);
    displaySpotlights(randomSpotlights);
  } catch (error) {
    console.error("Error to load members:", error);
  }
}
function getRandomMembers(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
function displaySpotlights(members) {
  const container = document.getElementById("spotlightContainer");
  if (!container) return;

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.icon}" alt="Logo of ${member.name}" loading="lazy">
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership:</strong> ${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)}</p>
    `;

    container.appendChild(card);
  });
}
loadSpotlights();
