import playList from './playList.js';
console.log(playList);

// let isPlay = false;


const time = document.querySelector('.time__oclock')
const date = document.querySelector('.time__date')


function showDate() {
    const nowDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = nowDate.toLocaleDateString('en-US', options);
    date.textContent = `${currentDate}`;
}
function showTime() {
    const nowDate = new Date();
    const currentTime = nowDate.toLocaleTimeString();
    time.textContent = `${currentTime}`;
    showDate();
    setTimeout(showTime, 1000);
}
showTime();

const greeting = document.querySelector('.greeting__text')

function getTimeOfDay() {
    const nowDate = new Date();
    const hours = nowDate.getHours()
    const listTimeOfDay = ['night', 'morning', 'afternoon', 'evening'];
    const grad = Math.floor(hours / 6);
    const timeOfDay = listTimeOfDay[grad];
    return timeOfDay;
}


function showGreeting() {
    getTimeOfDay()
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
}
showGreeting()

// _________________________________________________________
const greetingInput = document.querySelector('.greeting__input')

function setLocalStorage() {
    localStorage.setItem('name', greetingInput.value);
}
window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
    if (localStorage.getItem('name')) {
        greetingInput.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)
// _______________________________________________________________




function getRandomNum() {
    const randomNum = Math.ceil(Math.random() * 20);
    return randomNum;
}
let timeOfDay = getTimeOfDay();
let bgNum = String(getRandomNum()).padStart(2, 0);


function setBg() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        // const body = document.querySelector('body');
        document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
    };


}


setBg()


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const slideNext = document.querySelector('.next__bcg');
const slidePrev = document.querySelector('.last__bcg');

function getSlideNext() {
    if (Number(bgNum) === 20) {
        bgNum = '01';
    } else {
        bgNum = String(+bgNum + 1).padStart(2, 0);
    }
    setBg()
}

function getSlidePrev() {
    if (Number(bgNum) === 1) {
        bgNum = 20;
    } else {
        bgNum = String(+bgNum - 1).padStart(2, 0);
    }
    setBg()
}
slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)





// ____________________________________

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherDescription = document.querySelector('.weather-description');


const city = document.querySelector('.city')


async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
}
console.log(getWeather())
getWeather()
// _____________________________________________________-
const qouteText = document.querySelector('.quote__text')
const qouteAuthor = document.querySelector('.quote__author')
const qouteBtn = document.querySelector('.qoute__button')

function getRandomCitaty() {
    const randomNum1 = Math.ceil(Math.random() * 10);
    return randomNum1;
}
let t = getRandomCitaty();
function json() {
    fetch("test.json")
        .then(response => response.json())
        .then(data => showInfo(data));
    function showInfo(data) {
        qouteText.textContent = `${(data.citaty[t]).text}`;
        qouteAuthor.textContent = `${(data.citaty[t]).author}`;
    }
}
json()
qouteBtn.addEventListener('click', function () {
    if (t < 9) {
        t = t + 1;
        json()
    } else if (t === 9) {
        t = 0;
        json()
    }
});


// ___________________Player


// const playList = [
//     {      
//       title: 'Aqua Caelestis',
//       src: '../assets/sounds/Aqua Caelestis.mp3',
//       duration: '00:58'
//     },  
//     {      
//       title: 'River Flows In You',
//       src: '../assets/sounds/River Flows In You.mp3',
//       duration: '03:50'
//     }
//   ]


let isStatusAudio = false;

const btnStatus = document.querySelector('.btn__status')
const play = document.querySelector('.btn__play');
const pause = document.querySelector('.btn__pause');
const next = document.querySelector('.btn__next');
const last = document.querySelector('.btn__last');

const audio = document.querySelector('audio');
let numTreck = parseInt(0);
audio.src = playList[numTreck].src;

function playAudio() {
    audio.currentTime = 0;
    isStatusAudio = true;
    btnStatus.classList.add('btn__pause')
    document.querySelectorAll(`.play-item`).forEach(el => el.classList.remove('style__play'));
    document.querySelector(`.play-item${numTreck}`).classList.add('style__play');
    // playlist[numTreck]
    audio.play();
    // console.log(playList[numTreck].duration)
    document.querySelector(".length").textContent = `${playList[numTreck].duration}`;


}
function pauseAudio() {
    if (isStatusAudio) {
        audio.pause();
        isStatusAudio = false;
        btnStatus.classList.remove('btn__pause')
        document.querySelectorAll(`.play-item`).forEach(el => el.classList.remove('style__play'))
    }
}
btnStatus.addEventListener('click', el => {
    if (!isStatusAudio) {
        playAudio()
    } else if (isStatusAudio) {
        pauseAudio()
    }
})
const playlist = document.querySelector('.play__list')
playList.forEach((el, index) => {
    let li = document.createElement('li')
    li.classList.add(`play-item`);
    li.classList.add(`play-item${index}`);
    // li.classList.add(`${el.title}`);
    li.textContent = `${el.title}`
    playlist.append(li)

});

next.addEventListener('click', function (el) {
    if (numTreck < playList.length - 1) {
        numTreck = parseInt(numTreck) + 1;
    } else {
        numTreck = parseInt(0);
    }
    audio.src = playList[numTreck].src;
    playAudio()
})
last.addEventListener('click', function (el) {
    if (numTreck > 0) {
        numTreck = parseInt(numTreck) - 1;
    } else {
        numTreck = parseInt(playList.length - 1);
    }
    audio.src = playList[numTreck].src;
    playAudio()
})
// +++++++++++++++++++++++++++++++++

console.dir(audio);

// audio.addEventListener(
//   "loadeddata",
//   () => {
//     // document.querySelector(".length").textContent = playList[numTreck].duration;
//     // getTimeCodeFromNum(

//         // audio.duration
//     // );
//     audio.volume = .75;
//   },
//   false
// );
const current = document.querySelector('.current');
// current.textContent =  init()
setTimeout(() => {
    current.textContent = 11111
}, 1000);


const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);


function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}


// btnStatus.addEventListener('click', pauseAudio )
// const audio = new Audio();

// // play.addEventListener('click', audioPlayPause)
// play.addEventListener('click', function () {

//     audio.currentTime = 0;
//     if(!isStatusAudio) {
//         console.log(1111111)
//         // playAudio()
//     } else if(isStatusAudio)(
//         console.log(2222222)
//         // pauseAudio()
//     )
// })



// function audioPlayPause() {
//     // audio.src =
//     // url(/assets/sounds/Caelestis.mp3)
//     audio.currentTime = 0;
//     if(!isPlay){
//         console.log(1111111)
//         playAudio()
//     } else if (isPlay)(
//         console.log(2222222)
//         pauseAudio()
//     )

//   audio.play();
// }


// ____________________________________Image__API


// https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=GFulx5Nsu9TKmLHWOFnWVa20ESBIiXDfBg0JPQ-Z8yQ
// function getLinkToImage() {
//     const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=GFulx5Nsu9TKmLHWOFnWVa20ESBIiXDfBg0JPQ-Z8yQ';
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data.urls.regular)
//       });
//     }

// https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=30c312a66319bdb1e9d8f52682ead968&tags=nature&extras=url_h&format=json&nojsoncallback=1


    // async function getLinkToImage() {
    //     const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=30c312a66319bdb1e9d8f52682ead968&tags=nature&extras=url_l&format=json&nojsoncallback=1';
    //     // const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=GFulx5Nsu9TKmLHWOFnWVa20ESBIiXDfBg0JPQ-Z8yQ';
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     console.log(data.urls.regular)
    //    }
    //    getLinkToImage()
//     //    ______________________________Translate_________

// // 10 8 7 6 

