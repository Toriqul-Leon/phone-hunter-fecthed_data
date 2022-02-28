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
    console.log(phone);
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
      <button class="main-btn">Details</button>
</div>

 </article>`;
    sectionContainer.appendChild(article);
  }
};
