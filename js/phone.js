const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phone)
    displayPhones(phones,isShowAll)
}

const displayPhones = (phones,isShowAll) => {
    // 1st step == set a container
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    const showAllButton = document.getElementById('show-all-btn');

    

     if(phones.length>12 && !isShowAll){
        showAllButton.classList.remove('hidden');
          // display only 1st 12 phones
          phones =  phones.slice(0,12);
     }
     else{
        showAllButton.classList.add('hidden')
     }
        

    
    phones.forEach(phone => {
        // console.log(phone)
        //2nd step == create a div
        
       const phoneCard = document.createElement('div');
       phoneCard.classList.add ="card  bg-gray-100 shadow-xl"
       phoneCard.innerHTML = `
      
       <figure class="px-10 pt-10 flex justify-center bg-gray-100 py-10 rounded-2xl">
         <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
       </figure>
       <div class="card-body items-center text-center">
         <h2 class="card-title">"${phone.phone_name}"</h2>
         <p>If a dog chews shoes whose shoes does he choose?</p>
         <div class="card-actions">
           <button onclick="showDetailsButton('${phone.slug}')" class="btn btn-primary">Show Details</button>
         </div>
       </div>
 
       
       `
       phoneContainer.appendChild(phoneCard)
    });
    spinner(false)
}

const search = (isShowAll) => {
    spinner(true);
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadPhone(searchText , isShowAll)

    
}

const spinner = (isLoading)=> {
    const spinnerContainer = document.getElementById('spinner-container');
    if(isLoading){
        spinnerContainer.classList.remove('hidden')
    }
    else{
        spinnerContainer.classList.add('hidden')
    }

}

const showAll =() => {
   search(true);
}

const showDetailsButton = async (id) => {
    console.log('clicked' , id)
    // display load data
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    modalPhoneDitalse(phone);
}

const modalPhoneDitalse = (phone) => {
    // console.log(phone)
    // show modal details
    const phoneName = document.getElementById('phone-details-name');
    phoneName.innerText = phone.name;
    const phoneDetailContainer = document.getElementById('show-detail-container');
    phoneDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="Shoes" class="rounded-xl text-center" /> <br>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p><br>

    <h3 class='text-xl'> storage : ${phone.mainFeatures?.storage}</h3> <br>
    <h3 class='text-xl'> Display Size : ${phone.mainFeatures?.displaySize}</h3> <br>
    <h3 class='text-xl'> chipset : ${phone.mainFeatures?.chipSet}</h3> <br>
    <h3 class='text-xl'> memory : ${phone.mainFeatures?.memory}</h3> <br>
    <h3 class='text-xl'> Slug : ${phone?.slug}</h3> <br>
    <h3 class='text-xl'> Brand : ${phone?.brand}</h3> <br>
    <h3 class='text-xl'> Gps : ${phone?.others.GPS}</h3> <br>
    
    
    `
    show_details_modal.showModal();
    console.log(phone)
   
}


loadPhone()