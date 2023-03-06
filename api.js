const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    // console.log(phones)
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText = '';
    // display 10 phones only 
    const showMore = document.getElementById('show-more');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);

        showMore.classList.remove('d-none');

    }
    else {
        showMore.classList.add('d-none');
    }

    // display no phone found
    const noPhone = document.getElementById('no-phone-massage');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display all phone 
    phones.forEach(phone => {

        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
    <div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    togglespinner(false);
}
const processSearch = (dataLimit) => {
    togglespinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

// handle shearch bottum 
document.getElementById('btn-search').addEventListener('click', function () {
    // star loader
    processSearch(10);
})
const togglespinner = isloading => {
    const loaderSection = document.getElementById('loder');
    if (isloading) {
        loaderSection.classList.remove('d-none')

    }
    else {
        loaderSection.classList.add('d-none')
    }


}


document.getElementById('btn-show-more').addEventListener('click', function () {
    processSearch();


})
// loadPhone(); 