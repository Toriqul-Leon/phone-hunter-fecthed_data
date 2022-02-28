// !Fetching Data
const fetchData = () => {
  fetch("https://openapi.programming-hero.com/api/phones")
    .then((res) => res.json())
    .then((phones) => loadData(phones.data));
};
fetchData();

const loadData = (phones) => {
  const sectionContainer = document.getElementById("section-container");
  for (const phone of phones) {
    // console.log(phone);

    const article = document.createElement("article");
    article.innerHTML = ` <article  class="phone-container">

    <div>
     <img class="main-image" src="${phone.image}" alt="" width="150" height="200">
   </div>
       <div class="text-content"> 
         <div >
        <h3>${phone.phone_name}</h3>
      </div>
      <p class="brand-name"> <i class="fa-solid fa-mobile-button"></i></i> ${phone.brand}</p>
    
    <div class="line-view"></div>
    <div class="button-placement">  
      <button onclick="loadSingleData('${phone.slug}')" class="main-btn">Details</button>
</div>
 </article>`;
    sectionContainer.appendChild(article);
  }
  sectionContainer.textContent = "";
};

// !Managing Search search-text
document.getElementById("search-btn").addEventListener("click", () => {
  const searchText = document.getElementById("search-text").value;

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
  //   console.log(results);
  for (const data of sliced) {
    console.log(data.phone_name);
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
      <button onclick="loadSingleData('${data.slug}')" class="main-btn">Details</button>
</div>
 </article>`;
    sectionContainer.appendChild(article);
  }
};

// !Details
const loadSingleData = (phone_id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phone_id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((singlePhone) => showDetails(singlePhone.data));
};

const showDetails = (details) => {
  console.log(details);
};
