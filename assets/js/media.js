const blogs = JSON.parse(sessionStorage.getItem("blogs"));
const container=document.querySelector(".blogs-card-container");
const paginationContainer=document.querySelector(".pagination-container");



let totalBlogs = [];

const totalItems = Math.floor(Math.random() * (60 - 30 + 1)) + 30;

for (let i = 0; i < totalItems; i++) {
    const rand = Math.floor(Math.random() * blogs.length);
    totalBlogs.push(blogs[rand]);
}

let currentPage=1;
const itemsPerPage=4;


function renderBlogs(currentPage){
    const startIndex=currentPage-1;
    const endIndex=startIndex+itemsPerPage;
    const blogPerPage=totalBlogs.slice(startIndex,endIndex);
    container.innerHTML="";
    blogPerPage.forEach(blog => {
        container.innerHTML+=`<div class="blogs-card" data-index=${blog.selected}>
            <div class="card-img-wrapper">
              <img src="./assets/images/media/${blog.img}.jpg" alt="beautiful places" class="card-img">
            </div>
            <div class="content">
              <h3 class="card-title">${blog.title}</h3>
              <p class="card-subtitle"> <img src="./assets/images/media/ic_date.png" alt="date"> ${blog.date}</p>

              <div class="text-container">
                <p class="text">How you write your advertising copy will be based on where you will place your ad. If it's a billboard ad, you'll need a super catchy headline.</p>
                </div>
            </div>
          </div>
        `
    });
    const blogCards=container.querySelectorAll(".blogs-card")
    cardClickHandler(blogCards)
   
}

function createPagination(currentPage) {
    const totalPages = Math.ceil(totalBlogs.length / itemsPerPage);

    let pageHtml = "";


    if (currentPage > 2) {
        pageHtml += `<button class="prev-btn double" type="button" onclick="updatePage(${currentPage - 2})">&lt;&lt;</button>`;
    }


    if (currentPage > 1) {
        pageHtml += `<button class="prev-btn single" type="button" onclick="updatePage(${currentPage - 1})">&lt;</button>`;
    }


    for (let i = 1; i <= totalPages; i++) {
        pageHtml += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" type="button" onclick="updatePage(${i})">${i}</button>`;
    }

    if (currentPage < totalPages) {
        pageHtml += `<button class="next-btn single" type="button" onclick="updatePage(${currentPage + 1})">&gt;</button>`;
    }

    if (currentPage < totalPages - 1) {
        pageHtml += `<button class="next-btn double" type="button" onclick="updatePage(${currentPage + 2})">&gt;&gt;</button>`;
    }

    paginationContainer.innerHTML=pageHtml;
}

function updatePage(crntPage){
    createPagination(crntPage);
    renderBlogs(crntPage)
}

createPagination(currentPage)

renderBlogs(currentPage)


function cardClickHandler(cards){
    cards.forEach(card=>{
        const selected=card.dataset.index;
        const cardImg=card.querySelector(".card-img");
        cardImg.addEventListener("click",()=>{
            sessionStorage.setItem("selectedBlog",selected);
            window.location.href="./media-detail.html";
        })

    })
}