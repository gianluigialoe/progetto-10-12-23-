
const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"


fetcher();

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
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function addProduct() {
  try {
   
    const brand = document.getElementById("brand").value;
    const createdAt = document.getElementById("createdAt").value;
    const description = document.getElementById("description").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    
    const formData = {
      brand,
      createdAt,
      description,
      imageUrl,
      name,
      price,
    };

    
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZWQ1N2ZlMDMxZTAwMTliYTE0N2MiLCJpYXQiOjE3MDIwNDM1NTUsImV4cCI6MTcwMzI1MzE1NX0.VMBUaUF63nsmodcA1HEjml-X4I01izNv_0QICTmHm9Y"
      },
      body: JSON.stringify(formData)
    });

    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Errore durante l'invio dei dati all'API: ${errorMessage}`);
    }

    const responseData = await response.json();
    console.log("Dati inviati con successo all'API:", responseData);

    
    document.getElementById("productForm").reset();
  } catch (error) {
    console.error(error.message);
  }
}

let currentProductId; 

async function editProduct() {
  try {
    
    currentProductId = prompt("Inserisci l'ID del prodotto che desideri modificare:");

   
    const response = await fetch(`${endpointUrl}${currentProductId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZWQ1N2ZlMDMxZTAwMTliYTE0N2MiLCJpYXQiOjE3MDIwNDM1NTUsImV4cCI6MTcwMzI1MzE1NX0.VMBUaUF63nsmodcA1HEjml-X4I01izNv_0QICTmHm9Y"
      }
    });

    if (!response.ok) {
      throw new Error('Errore durante il recupero del prodotto per la modifica');
    }

    const productData = await response.json();

    
    document.getElementById("brand").value = productData.brand;
    document.getElementById("createdAt").value = productData.createdAt;
    document.getElementById("description").value = productData.description;
    document.getElementById("imageUrl").value = productData.imageUrl;
    document.getElementById("name").value = productData.name;
    document.getElementById("price").value = productData.price;
  } catch (error) {
    console.error(error.message);
  }
}

async function updateProduct() {
  try {
    
    if (!currentProductId) {
      alert("ID del prodotto non valido. Utilizza la funzione 'Modifica Prodotto' prima di confermare le modifiche.");
      return;
    }

    
    const brand = document.getElementById("brand").value;
    const createdAt = document.getElementById("createdAt").value;
    const description = document.getElementById("description").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    
    if (!brand || !createdAt || !description || !imageUrl || !name || !price) {
      alert("Tutti i campi sono obbligatori. Compila tutti i campi prima di procedere.");
      return;
    }

    
    const formData = {
      brand,
      createdAt,
      description,
      imageUrl,
      name,
      price,
    };

    
    const response = await fetch(`${endpointUrl}${currentProductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZWQ1N2ZlMDMxZTAwMTliYTE0N2MiLCJpYXQiOjE3MDIwNDM1NTUsImV4cCI6MTcwMzI1MzE1NX0.VMBUaUF63nsmodcA1HEjml-X4I01izNv_0QICTmHm9Y"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Errore durante l'aggiornamento del prodotto: ${errorMessage}`);
    }

    const responseData = await response.json();
    console.log("Dati del prodotto aggiornati con successo:", responseData);

   
    document.getElementById("productForm").reset();
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteProduct() {
  try {
    // Chiedi all'utente di inserire l'ID del prodotto da eliminare
    const productId = prompt("Inserisci l'ID del prodotto che desideri eliminare:");

    
    const response = await fetch(`${endpointUrl}${productId}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZWQ1N2ZlMDMxZTAwMTliYTE0N2MiLCJpYXQiOjE3MDIwNDM1NTUsImV4cCI6MTcwMzI1MzE1NX0.VMBUaUF63nsmodcA1HEjml-X4I01izNv_0QICTmHm9Y"
      },
    });

   
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Errore durante l'eliminazione del prodotto: ${errorMessage}`);
    }

    console.log("Prodotto eliminato con successo.");

    
  } catch (error) {
    console.error(error.message);
  }
}

function resetForm() {
  
  const isConfirmed = confirm("Sei sicuro di voler resettare il form?");


  if (isConfirmed) {
    document.getElementById("productForm").reset();
    alert("Il form è stato resettato!");
  }
}

function toggleLoadingIndicator(show) {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = show ? "block" : "none";
}

