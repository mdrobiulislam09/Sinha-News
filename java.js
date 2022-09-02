const loadCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => newsCatagory(data.data.news_category))
}
const newsCatagory = (catagories) => {
    const newsCatagory = document.getElementById('news-catagory')
    catagories.forEach(catagory => {
        const div = document.createElement('div')
        div.innerHTML =`
            <p onclick="riad('${catagory.category_id}')">${catagory.category_name}</p>
        `;
        newsCatagory.appendChild(div)
    });
}
const riad = (category_id) => {
    fetch(` https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res => res.json())
    .then(data => robiul(data.data))
}
const robiul = (datas) => {
    const titleMenu = document.getElementById('title-menu')
    titleMenu.innerHTML = ``
    datas.forEach(data => {
        const div = document.createElement('div')
        div.classList.add("card", "mb-3")
        div.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h6 class="card-title">ok${data.title ? data.title : 'no news'}</h6>
            <p class="card-text">${data.details.slice(0,450)}</p>
            <div class="d-flex justify-content-between pt-5">
                <div><img src="${data.author.img}" class="rounded-circle iimage">${data.author.name ? data.author.name : 'no name'}</div>
                <div>go</div>
                <div onclick="details(${data._id})">go</div>
            </div>
          </div>
        </div>
        </div>
        `;
        titleMenu.appendChild(div)

        console.log(data._id)
        // console.log(data._id)
    });
}
loadCatagory('')