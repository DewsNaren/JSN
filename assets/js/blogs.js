const months=["Jan","Feb","Mar","Apr","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const crntYear=new Date().getFullYear();
console.log(crntYear)
const blogs=[

    {
        img:"blog1",
        
        title:"The 10 most beautiful places you should visit on your life",
        date:`${months[Math.floor(Math.random()*months.length)]} ${padZero(Math.floor(Math.random()*30)+1)} ${Math.floor(Math.random()*(crntYear-(crntYear-10))+1)+crntYear-10}`,
    },
    {
        img:"blog2",
        title:"Where Can You Find a New Networking Resources",
        date:`${months[Math.floor(Math.random()*months.length)]} ${padZero(Math.floor(Math.random()*30)+1)} ${Math.floor(Math.random()*(crntYear-(crntYear-10))+1)+crntYear-10}`,
    },
    {
        img:"blog3",
        title:"Converting an enquiry into an Interior application design",
        date:`${months[Math.floor(Math.random()*months.length)]} ${padZero(Math.floor(Math.random()*30)+1)} ${Math.floor(Math.random()*(crntYear-(crntYear-10))+1)+crntYear-10}`,
    },
    {
        img:"rp3",
        detailImg:"rp3",
        title:"How to explain the ASIC inquiry to clients and new customers",
        date:`${months[Math.floor(Math.random()*months.length)]} ${padZero(Math.floor(Math.random()*30)+1)} ${Math.floor(Math.random()*(crntYear-(crntYear-10))+1)+crntYear-10}`,
    },
    {
        img:"rp4",
        detailImg:"rp4",
        title:"We found most beautiful Place for Nov Party",
        date:`${months[Math.floor(Math.random()*months.length)]} ${padZero(Math.floor(Math.random()*30)+1)} ${Math.floor(Math.random()*(crntYear-(crntYear-10))+1)+crntYear-10}`,
    }


];

function padZero(num){
    return num>9?num:"0"+num
}

console.log(blogs)