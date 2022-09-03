const loadCatagory = async () => {
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        newsCatagory(data.data.news_category);
    }
    catch (error){
        console.log(error)
    }
}
const newsCatagory = (catagories) => {
    const newsCatagory = document.getElementById('news-catagory')
    catagories.forEach(catagory => {
        const div = document.createElement('div')
        div.innerHTML =`
            <p onclick="riad('${catagory.category_id}')">${catagory.category_name}</p>
        `;
        newsCatagory.appendChild(div);
        
    });
}

const riad = (category_id) => {
    toggleSpinner(true)
    fetch(` https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res => res.json())
    .then(data => robiul(data.data))
}
const robiul = (datas) => {
    // vvview
        // const views = data.total_view ? data.total_view : 0 ;
        // views.sort(function(a, b){return a - b});
        // console.log(datas)

    const titleMenu = document.getElementById('title-menu')
    titleMenu.innerHTML = ``
    datas.forEach(data => {
        
        const div = document.createElement('div')
        div.classList.add("card", "mb-3")
        div.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${data.thumbnail_url}" class="img-fluid rounded-start">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h6 class="card-title">ok${data.title ? data.title : 'no news'}</h6>
                <p class="card-text">${data.details.slice(0,450)}...</p>
                <div class="d-flex justify-content-between pt-5">
                    <div class="d-none d-sm-block">
                    <img src="${data.author.img}" class="rounded-circle iimage me-2">
                    ${data.author.name ? data.author.name : 'no name'}
                    </div>
                    <div class="pt-2">view: ${data.total_view ? data.total_view : 'Do not Count'}</div>
                    <div>
                        <button onclick="details('${data._id}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Details
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `;
        titleMenu.appendChild(div) ;
    });
    toggleSpinner(false)
}
const details = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => modalMenu(data.data[0]))
}
const modalMenu = (datas) => {
    const modalTitle = document.getElementById('exampleModalLabel')
    const modalDate = document.getElementById('exampleModalDate')
    const modalWriter = document.getElementById('exampleModalWriter')
    const modalREview = document.getElementById('exampleReview') 
    const modalphoto = document.getElementById('photo') 

    modalTitle.innerHTML = `${datas.title}`;
    modalDate.innerHTML = `publish: ${datas.author.published_date}`;
    modalWriter.innerHTML = `
        Author: <img src="${datas.author.img}" class="iimage me-2">
        ${datas.author.name ? datas.author.name : 'No data'}
    `;
    modalREview.innerHTML = `Rating: ${datas.rating.number ? datas.rating.number : 'No data'}`
    modalphoto.innerHTML = `
        <img src="${datas.image_url}" class="w-100">
    `;

    // console.log(datas.rating.badge)
    console.log(datas)
}
const toggleSpinner = isSpning => {
    const spinnerSection = document.getElementById('spinner')
    if(isSpning) {
        spinnerSection.classList.remove('d-none')
    }
    else{
        spinnerSection.classList.add('d-none')
    }
}
riad('08')
loadCatagory() ;
