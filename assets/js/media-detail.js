const blogTitle=document.querySelector(".blog-title");
const blogDate=document.querySelector(".blog-date").childNodes[1];

const selectedIndex=sessionStorage.getItem("selectedBlog");
const detailBannerImg=document.querySelector(".detail-banner-img");
const blogs = JSON.parse(sessionStorage.getItem("blogs"));
if(blogs && selectedIndex){


const selectedBlog=blogs[selectedIndex];

const postContainer=document.querySelector(".post-card-container");
blogTitle.textContent=selectedBlog.title;
blogDate.textContent=selectedBlog.date;
detailBannerImg.src=`./assets/images/media/${selectedBlog.detailBanner ||selectedBlog.img}.jpg`

function renderPosts(selectedIndex){
    postContainer.innerHTML="";
    for(let i=0;i<blogs.length;i++){
        if(i==selectedIndex){
            continue;
        }

         postContainer.innerHTML+=`<div class="post-card" data-index=${i}>
                    <div class="img-wrapper" >
                        <img src="./assets/images/media/${blogs[i].img}.jpg" class="card-img" alt="networking resources">
                    </div>
                    <h4>${ blogs[i].postTitle || blogs[i].title}</h4>
                    <p class="date-text"><img src="./assets/images/media/ic_date.png" alt="date"> ${blogs[i].date}</p>
                </div>`
    }

    const postCards=postContainer.querySelectorAll(".post-card")
    cardClickHandler(postCards)
}
renderPosts(selectedIndex)

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
}