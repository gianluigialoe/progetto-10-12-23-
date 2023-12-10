function openPasswordPrompt() {
   
    const password = prompt("Inserisci la password:");

    
    if (password === "0000") {
       
        window.location.href = "/intex.html";
    } else {
       
        alert("Password errata. Accesso negato.");
    }
}


const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/";


let cart = [];

async function fetcher() {
  try {
    const response = await fetch(endpointUrl, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZWQ1N2ZlMDMxZTAwMTliYTE0N2MiLCJpYXQiOjE3MDIwNDM1NTUsImV4cCI6MTcwMzI1MzE1NX0.VMBUaUF63nsmodcA1HEjml-X4I01izNv_0QICTmHm9Y"
      }
    });

    if (!response.ok) {
      throw new Error('Status code non nel range dei 200');
    }

    const data = await response.json();
    displayPhones(data);
  } catch (error) {
    console.log(error.message);
  }
}

function displayPhones(phones) {
  const booksWrapper = document.getElementById("books-wrapper");
  booksWrapper.innerHTML = ""; 

  phones.forEach(phone => {
    const card = document.createElement('div');
    card.classList.add('col','enlarge-on-hover');
    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${phone.imageUrl}" class="img-fluid card-img-top h-100" alt="${phone.name}" style="height: 200px;">
        <div class="card-body">
          <h5 class="card-title">${phone.name}</h5>
          <p class="card-text">${phone.description}</p>
          <p class="fs-4">${phone.price}€</p>
          <button class="btn btn-primary" onclick="addToCart('${phone.name}', '${phone.price}')">Aggiungi al carrello</button>
          <a class="btn btn-primary mt-2" href="/padettaglio.html">Scopri di più</a>
          <a class="btn btn-outline-dark btn-lg mt-2" href="#" onclick="openPasswordPrompt()" style="color: white;">modifica</a>

        </div>
      </div>
    `;

    booksWrapper.appendChild(card);
  });
}

function addToCart(name, price) {
  const item = { name, price };
  cart.push(item);
  updateCartView();
  console.log(`Oggetto aggiunto al carrello: ${name}, Prezzo: ${price}`);
}

function updateCartView() {
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  cartItemsElement.innerHTML = ""; 

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price}€`;
    cartItemsElement.appendChild(li);
  });

  const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);
  cartTotalElement.textContent = `Total: ${total}€`;
}

function clearCart() {
  cart = [];
  updateCartView();
}

function checkout() {
   
    console.log("Acquisto completato!");
    alert("Congratulazioni! Hai completato l'acquisto.");
    clearCart(); 
  }
// Chiamata API e creazione delle cards all'avvio della pagina
document.addEventListener("DOMContentLoaded", fetcher);


function toggleLoadingIndicator(show) {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = show ? "block" : "none";
}

