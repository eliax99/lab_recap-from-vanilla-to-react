const container = document.getElementById("user-list-container");
const button = document.getElementById("load-more-btn");

async function fetchUsers() {
  try {
    button.disabled = true;

    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();

    data.users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      card.innerHTML = `
        <img src="${user.image}" alt="${user.firstName}">
        <h3>${user.firstName} ${user.lastName}</h3>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
  } finally {
    button.disabled = false;
  }
}

button.addEventListener("click", fetchUsers);