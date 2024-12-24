
const urlString = window.location.href;
const url = new URL(urlString);
const name = url.searchParams.get('name');
let countryDetailsCont = document.querySelector(".country-details-container");
let border = document.querySelector(".border-countries a");
let borderCount = document.querySelector(".border-countries");
let countryName;
let themeChanger = document.querySelector(".theme-changer");

fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
  .then((res) => res.json())
  .then(([countryData]) => {
    let native = (((Object.values(countryData.name.nativeName)).map((native) => native.common)).slice(0, 1)).join(",          ");
    let languages = (((Object.values(countryData.languages)).map((language) => language)).slice(0, 3)).join(",  ");
    console.log(languages);
    countryDetailsCont.innerHTML = `
             <span class="back-button" onclick="history.back()">
            <i class="fa-solid fa-arrow-left"></i>&nbsp; Back
            </span>  
            <div class="country-details">
             <img src="${countryData.flags.svg}" alt="" />
               <div class="details-text-container">
              <h1>${countryData.name.common}</h1>
              <div class="details-text">
              <p><b>Native Name:  </b><span class="native-name">${(countryData.name.nativeName) ? native : "  "}</span></p>
          <p><b>Population: </b><span class="population">${countryData.population.toLocaleString('en-IN')}</span></p>
          <p><b>Region: </b><span class="region">${(countryData.region) ? (countryData.region) : " "}</span></p>
          <p><b>Sub Region: </b><span class="sub-region">${(countryData.subregion) ? (countryData.subregion) : "  "}</span></p>
          <p><b>Capital: </b><span class="capital">${(countryData.capital) ? (countryData.capital) : "  "}</span></p>
          <p>
         <b>Top Level Domain: </b><span class="top-level-domain">${(countryData.tld) ? (countryData.tld.join(", ")) : "  "}</span>
          </p>
          <p><b>Currencies: </b><span class="currencies">${(countryData.currencies) ? ((Object.values(countryData.currencies)).map((curr) => curr.name).join(",          ")) : "  "}</span></p>
    <p><b>Languages: </b><span class="languages">${(countryData.languages) ? (languages) : "  "}</span></p>   
  </div>
</div>

</div>`
    let data = (countryData.borders)
    data.forEach(element => {
      fetch(`https://restcountries.com/v3.1/alpha/${element}`)
        .then((res) => res.json())
        .then(([data]) => {
          let a = document.createElement("a");
          a.setAttribute("href", `/m1.html?name=${data.name.common}`);
          a.innerText = data.name.common;
          borderCount.appendChild(a);
          console.log(a)
        })
    });
  })

  themeChanger.addEventListener('click', () => {
     themeChanger.innerText = " ";
  themeChanger.innerHTML=` <p class="theme-changer"> <i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Light Mode</p>`
    document.body.classList.toggle('dark')
  })





















