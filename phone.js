const loadData = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll)

}

const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // phone length
    // console.log('phone length',phones.length)

    // show all button add and remove
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 10 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    // is show all
    console.log('is show all' , isShowAll)

    // disply only first 10 phones
    if(!isShowAll){
        phones = phones.slice(0, 10);
    }



    // clear the phoneContainer data
    phoneContainer.textContent = '';
    phones.forEach(phone => {  //
        // console.log(phone)  //style= "display:block !important"
        const phoneCard = document.createElement('div');
        phoneCard.classList = (`card bg-gray-200 p-6 shadow-xl`)
        phoneCard.innerHTML = `
                  <figure>
                        <img src="${phone.image}"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>Sharafa Rohoman</p>
                        <div class="card-actions justify-center">
                            <button  onclick="handleShowDeatail('${phone.slug}')" class="btn btn-primary block">Show Details</button>
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpiner(false)
}
// handle show detail button
const handleShowDeatail = async (id) =>{
    console.log('handle show detail',id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDeaisl(phone);
}

const showPhoneDeaisl = (phone) =>{
    console.log(phone);
    // const images = document.getElementById('images');
    // images.innerText = phone.image;
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt=""> 
    <p><span>Storage : </span>${phone.mainFeatures.storage}</p>
    <p><span>Display Size : </span>${phone.mainFeatures.displaySize}</p>
    <p><span>Chipset : </span>${phone.mainFeatures.chipSet}</p>
    <p><span>Memory : </span>${phone.mainFeatures.memory}</p>
    <p><span>Slug : </span>${phone.slug}</p>
    <p><span>ReleaseDate : </span>${phone.mainFeatures.releaseDate}</p>
    <p><span>Brand : </span>${phone.brand}</p>
    <p><span>Brand : </span>${phone.others.GPS}</p>
    `;
    show_detail_modal.showModal();
}


// handle search
const handleSearch = (isShowAll) => {
    toggleLoadingSpiner(true)
    // console.log('handleSearch');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadData(searchText,isShowAll)
}


// const handleSearch2 = () => {
//     toggleLoadingSpiner(true);
//     const searchField2 = document.getElementById('search-field2');
//     const searchText2 = searchField2.value;
//     // console.log(searchText2);
//     loadData(searchText2)
// }


// loading spiner
const toggleLoadingSpiner = (isLoading) => {
    const loadingSpiner = document.getElementById('loading-spinner');
    // loadingSpiner.classList.remove('hidden')
    if (isLoading) {
        loadingSpiner.classList.remove('hidden')
    }
    else{
        loadingSpiner.classList.add('hidden')
    }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true)
}




// loadData();