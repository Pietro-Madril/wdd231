
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Updated: ${lastModified}`;
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
});
async function fetchMembers() {
    const response = await fetch('members.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}
async function renderGridView() {
    try {
        const members = await fetchMembers();
        const membersContainer = document.getElementById('members');
        
        membersContainer.innerHTML = members.map(member => `
            <div class="card-box">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <p>Contact: ${member.contact}</p>
                <p>Address: ${member.address}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}
async function renderListView() {
    try {
        const members = await fetchMembers();
        const membersContainer = document.getElementById('members');

        membersContainer.innerHTML = `
            <ul>
                ${members.map(member => `
                    <li>
                        <h3>${member.name}</h3>
                        <p>${member.description}</p>
                        <p>Contact: ${member.contact}</p>
                        <p>Address: ${member.address}</p>
                    </li>
                `).join('')}
            </ul>
        `;
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}
document.getElementById('gridView').addEventListener('click', renderGridView);
document.getElementById('listView').addEventListener('click', renderListView);
renderGridView();

d