let dataGame = document.querySelector("#data .row")



async function getGame(category) {
    try {
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category?category:"mmorpg"}`,
        {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '54e50ecd47msh1829716f866a5c5p1cf54cjsn77419ad50992',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
    );
	const result = await response.json();
        console.log(result);
        displayGame(result)
} catch (error) {
	console.error(error);
}
}




function displayGame(list) {
    let dataBox = ''
    for (let i = 0; i < list.length; i++){
        const element = list[i];
        dataBox += `
        <div class="col-md-3">
        <div id="card" class="card  bg-transparent text-white" data-id="${element.id}">
        <img src="${element.thumbnail}" class="card-img-top  " alt="...">
        <div class="card-body position-relative">
        <h3 class="card-title ">${element.title}</h3>
        <h5><span class="badge position-absolute">Free</span></h5>
        <p class="card-text">${element.short_description}</p>
        </div>
        <div class="card-footer bg-transparent d-flex justify-content-between">
        <span class="badge ">${element.genre}</span>
        <span class="badge ">${element.platform}</span>
        </div>
        </div>
        </div>
        
        `
    }
    
    dataGame.innerHTML = dataBox;

    dataGame.addEventListener('click', (event) => {
        let card = event.target.closest('.card')
        if (card) {
            detailsGame(card.getAttribute('data-id'))
            console.log(card.getAttribute('data-id'));
            
        }
    })

}
getGame()

let categories = document.querySelectorAll('.nav-cat')

categories.forEach(category => {
    let navLink = category.getAttribute('category')
    category.addEventListener('click', () => {
        console.log(navLink);
        
        getGame(navLink)
        
    })   
})
// for (let i = 0; i < categories.length; i++){
//     let navLink = categories[i].getAttribute('category')
//     categories[i].addEventListener('click', () => {
//         console.log(navLink);
        
//         getGame(navLink)
        
//     })   
// }

const navLinks = document.querySelectorAll('.nav-item .nav-link')
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(nav=> nav.classList.remove("active"))
        link.classList.add("active")
    })
})


// for (let i = 0; i < navLinks.length; i++){
//     navLinks[i].addEventListener('click', () => {
//         for (let j = 0; j < navLinks.length; j++){
//             navLinks[j].classList.remove("active")
//         }
//         navLinks[i].classList.add("active")
//     })
// }





//Game Details


async function detailsGame(id) {
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '54e50ecd47msh1829716f866a5c5p1cf54cjsn77419ad50992',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
	const result = await response.json();
    console.log(result);
    displayDetails(result)
} catch (error) {
	console.error(error);
}
}

let details = document.querySelector('.details-content')
let gameList = document.querySelector('#gameList')
let detailsEle = document.querySelector('#Details')

function displayDetails(ele) {
    let detailsBox = `
     <div class="col-md-5 ">
    <img src="${ele.thumbnail}" alt="">
  </div>
  <div class="col-md-7 text-white">
    <h3>Title:${ele.title}</h3>
    <p>Category: <span class="badge bg-info text-black ">${ele.genre}</span></p>
    <p>Platform: <span class="badge bg-info text-black">${ele.platform}</span></p>
    <p>Status: <span class="badge bg-info text-black">${ele.status}</span></p>
    <p>${ele.description}</p>
    <button type="button" class="btn btn-outline-warning text-white"><a href="${ele.freetogame_profile_url}" class="text-decoration-none text-white">Show Game</a></button>
  </div>
  
    `
    details.innerHTML = detailsBox;
    gameList.classList.add("d-none")
    detailsEle.classList.remove("d-none")
    let btnClose = document.querySelector('.btn-close')
    btnClose.addEventListener('click', () => {
         gameList.classList.remove("d-none")
    detailsEle.classList.add("d-none")
        
    })
}