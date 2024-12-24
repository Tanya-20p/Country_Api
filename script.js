let flag;
let countriesData;
const region = document.querySelector(".filter-by-region");
console.log(region);
const cardsec = document.querySelector(".cardSection");
cardsec.innerHTML = `
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>
`;
let search = document.querySelector(".search-bar");
let mode = document.querySelector(".mode");
let themeChanger = document.querySelector(".theme-changer");


function flagContent(countryName) {
  flag = document.createElement("a");
  flag.setAttribute("href", `/m1.html?name=${countryName.name.common}`);
  flag.innerHTML = ` <div class="card1">
    <img src=${countryName.flags.svg} alt=${countryName.name.common} flag>
 <div class="cardContent">
<h4>${countryName.name.common}</h4>
<p><b>Population: </b>${countryName.population.toLocaleString('en-IN')}</p>
<p><b>Region: </b>${countryName.region}</p>
 <p><b>Capital: </b>${countryName.capital[0]}</p>
  </div>
  </div>`;
  cardsec.append(flag);
}



fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    countriesData =data;
    cardsec.innerHTML = '';
    data.forEach(country => {
      flagContent(country);
    });
  })
  .catch((err) => console.log(err))



region.addEventListener("change", (e) => {
  cardsec.innerHTML = " ";
  let reg = e.target.value;
  fetch(`https://restcountries.com/v3.1/region/${reg}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((elem) => {
        flagContent(elem);
      })
      
    });
    e.target.value=" ";
    e.target.value="default";
})






search.addEventListener("input",(e)=>{
cardsec.innerHTML=" ";
let filtered=  countriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
console.log(filtered);
filtered.forEach(element => {
flagContent(element);
});
})


themeChanger.addEventListener('click', () => {
  themeChanger.innerText = " ";
  themeChanger.innerHTML=` <p class="theme-changer"> <i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Light Mode</p>`
  document.body.classList.toggle('dark')
})





