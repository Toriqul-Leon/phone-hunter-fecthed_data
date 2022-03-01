// !Spinner
const toggleSpinner = (displayStyle) => {
  document.getElementById("loader").style.display = displayStyle;
};
// !Managing search-text
document.getElementById("search-btn").addEventListener("click", () => {
  const searchText = document.getElementById("search-text").value;
  // !Display Spinner
  toggleSpinner("block");
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((search) => searchResult(search.data));
});

// !Search Result
const searchResult = (results) => {
  const sectionContainer = document.getElementById("section-container");
  sectionContainer.textContent = "";
  const sliced = results.slice(0, 20);
  const searchText = (document.getElementById("search-text").value = "");
  searchText.value = "";
  for (const data of sliced) {
    const article = document.createElement("article");

    article.innerHTML = ` <article  class="phone-container">
    <div>
     <img class="main-image" src="${data.image}" alt="" width="150" height="200">
   </div>
       <div class="text-content"> 
         <div >
        <h3>${data.phone_name}</h3>
      </div>
      <p class="brand-name"> <i class="fa-solid fa-mobile-button"></i></i> ${data.brand}</p>
    
    <div class="line-view"></div>
    <div class="button-placement">  
      <button onclick="loadSingleData('${data.slug}')" id="modal-btn" class="main-btn">Details</button>
</div>
 </article>`;
    sectionContainer.appendChild(article);
    toggleSpinner("none");
  }
};

// !SEE MORE
const showMore = () => {};

// !Fetching Details
const loadSingleData = (phone_id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phone_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((singlePhone) => showDetails(singlePhone.data));
};

const showDetails = (details) => {
  const modalContainer = document.getElementById("modal-element");

  const div = document.createElement("div");
  div.classList.add("modal-content");

  div.innerHTML = `<span id="close-modal" class="close">&times;</span>
  <img src="${details.image}" alt="">
    <h1>${details.name}</h1>
    <h6>Release Date: ${details?.releaseDate || "No Release date Found"}.</h6>
    <h5>Main Features</h5>
    <p> <h6>Chipset:</h6> ${details.mainFeatures.chipSet},
   <h6>Display:</h6> ${details.mainFeatures.displaySize},
   <h6>Memory:</h6> ${details.mainFeatures.memory},
    <h6>Storage:</h6> ${details.mainFeatures.storage}.
     </p>
    <h5>Sensors</h5>
    <p> ${details.mainFeatures.sensors.join(",\n")}. </p>
      <h5>Others</h5>
      <h6>WLAN:</h6>${details.others?.WLAN || "No Info"}.
      <h6>GPS:</h6>${details.others?.GPS || "No Info"}.
      <h6>Bluetooth:</h6>${details.others?.Bluetooth || "No Info"}.
      <h6>NFC:</h6>${details.others?.NFC || "No Info"}
      <h6>Radio:</h6>${details.others?.Radio || "No Info"}
      <h6>USB:</h6>${details.others?.USB || "No Info"}.
    `;
  modalContainer.appendChild(div);
  modalDetails();
};

// !Modal
const modalDetails = () => {
  const modal = document.getElementById("modal-element");
  const closeModal = document.getElementById("close-modal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // !When click on close button
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modal.textContent = "";
  });
  // !When the user clicks anywhere outside of the modal
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      modal.textContent = "";
    }
  };
};
