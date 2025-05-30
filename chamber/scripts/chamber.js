document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;


const memberUrl = "data/members.json";

async function getMembers() {
  try {
    const response = await fetch(memberUrl);
    if (!response.ok) throw new Error("Loading Error");
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Erro no fetch:", error);
  }
}

function displayMembers(members) {
  const membersContainer = document.querySelector('#members');
  membersContainer.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.icon}" alt="Logo of ${member.name}" loading="lazy">
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership:</strong> ${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)}</p>
    `;

    membersContainer.appendChild(card);
  });
}

const gridButton = document.querySelector('#gridView');
const listButton = document.querySelector('#listView');
const membersContainer = document.querySelector('#members');
gridButton.addEventListener('click', () => {
  membersContainer.classList.add('course-grid');
  membersContainer.classList.remove('course-list');
});
listButton.addEventListener('click', () => {
  membersContainer.classList.add('course-list');
  membersContainer.classList.remove('course-grid');
});


getMembers();
