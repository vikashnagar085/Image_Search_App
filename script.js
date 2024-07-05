const accessKey = "leqJTXBC-mPOh7lp__j8DUi7tETn_G7M81VjP6IYn9Y";
const formEl = document.querySelector('form')
const inputEl = document.getElementById('search-input')
const searchResult = document.querySelector('.search-results')
const showMore = document.getElementById('show-more-button')

let inputData = "";
let page =1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url);
    const data = await response.json() ;
    console.log(data);
    const results = data.results;
    console.log(results);

    if(page === 1){
        searchResult.innerHTML = "";
    }

    results.forEach((results)=>{
    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add("search-result")
    const image = document.createElement('img')
    image.src = results.urls.small
    image.alt = results.alt_description
    const imageLink = document.createElement('a')
    imageLink.href = results.links.html
    imageLink.target = "_blank"
    imageLink.textContent = results.alt_description

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);

})

    page++
    if(page>1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    page =1;
    searchImages()
})
showMore.addEventListener("click",(event)=>{
    searchImages()
})
