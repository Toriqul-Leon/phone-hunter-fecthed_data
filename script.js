const fetchData = () => {
  fetch("https://openapi.programming-hero.com/api/phones")
    .then((res) => res.json())
    .then((data) => loadData(data.data));
};
fetchData();

const loadData = (phones) => {
  for (const phone of phones) {
    console.log(phone);
  }
};
