//variables
let songs = [
    {
        title: "PASSO BEM SOLTO (Super Slowed)",
        imgpath: "covers/1.jpg",
        filepath: "songs/1.mp3"
    },
    {
        title: "Maxicon AVANGARD",
        imgpath: "covers/2.jpg",
        filepath: "songs/2.mp3"
    },
    {
        title: "Lut le Gaya - Dhurandhar",
        imgpath: "covers/3.jpg",
        filepath: "songs/3.mp3"
    },
    {
        title: "ODNOGO ULTRAFUNK (Tiktok Remix)",
        imgpath: "covers/4.jpg",
        filepath: "songs/4.mp3"
    },
    {
        title: "2 Phut Hon Funk (Slowed)",
        imgpath: "covers/5.webp",
        filepath: "songs/5.mp3"
    },
    {
        title: "ODNOGO ULTRAFUNK SUPER SLOWED",
        imgpath: "covers/6.webp",
        filepath: "songs/6.mp3"
    },
    {
        title: "MONTAGEM LADRAO",
        imgpath: "covers/7.webp",
        filepath: "songs/7.mp3"
    },
    {
        title: "FUNK DE BELEZA",
        imgpath: "covers/8.webp",
        filepath: "songs/8.mp3"
    },
    {
        title: "MATUSHKA ULTRAFUNK",
        imgpath: "covers/9.webp",
        filepath: "songs/9.mp3"
    }

]

let container = document.getElementById("container")
let control_box = document.getElementById("control-box")

let songs_list = document.querySelector(".songs-list")
let previous = document.getElementById("previous")
let next = document.getElementById("next")
let volume = document.getElementById("volume")
let currentsongindex = 0
let cardsongtitle = document.querySelectorAll(".song-title")
let songtitle = document.querySelectorAll(".bar-song-title")
let songcover = document.querySelectorAll(".song-cover-main")
let cardsongcover = document.querySelectorAll(".song-cover")

let bar_current_duration = document.getElementById("bar-current-duration")
let seekbar = document.getElementById("seekbar")
let play_pause = document.getElementById("play/pause")
let currentsong = new Audio(songs[currentsongindex].filepath)

function laodcard() {

    for (let i = 0; i < songs.length; i++) {
        songs_list.innerHTML += `
        <div class="song flex">
        <div class="song2 flex">
            <img class="card-icon pp_icon" src="images/play.svg">
            <img class="song-cover" src="${songs[i].imgpath}">
            <span class="song-title">${songs[i].title}</span>
            </div>
            <span class="song-duration bar-song-duration">5:00</span>
        </div>
    `;
    }

}

laodcard()

let songlist = document.querySelectorAll(".song")


function playSong(index) {
    currentsongindex = index;

    currentsong.src = songs[index].filepath;

    songtitle.forEach((title) =>{

        title.innerText = songs[index].title;
    })

    songcover.forEach((cover) => {
        cover.src = songs[index].imgpath;
    });

    document.querySelectorAll(".pp_icon").forEach((icon) => {
        icon.src = "images/play.svg";
    });


    songlist[index].querySelector(".pp_icon").src = "images/pause.svg";

    currentsong.play();
    play_pause.src = "images/pause.svg";


}
// playSong(currentsongindex)


currentsong.addEventListener("ended", ()=>{
    currentsongindex++

    if (currentsongindex >= songs.length) {
        currentsongindex = 0
    }
    playSong(currentsongindex)
})


next.addEventListener("click", ()=>{
    currentsongindex++
    if (currentsongindex >= songs.length) {
        currentsongindex = 0
    }
    playSong(currentsongindex)
})

previous.addEventListener("click", ()=>{
    currentsongindex--
    if (currentsongindex < 0) {
        currentsongindex = songs.length - 1
    }
    playSong(currentsongindex)
})

function updateSongInfo() {

    songtitle.forEach((title) =>{

        title.innerText = songs[currentsongindex].title;
    })



    songcover.forEach((cover) => {
        cover.src = songs[currentsongindex].imgpath;
    });
}
updateSongInfo()


function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    let mins = Math.floor(seconds / 60);

    let secs = Math.floor(seconds % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    return `${mins}:${secs}`;
}

play_pause.addEventListener("click", () => {
    if (currentsong.paused) {
        currentsong.play();
        play_pause.src = "images/pause.svg";
    } else {
        currentsong.pause();
        play_pause.src = "images/play.svg";
    }
});

currentsong.addEventListener("timeupdate", () => {
    seekbar.value = (currentsong.currentTime / currentsong.duration) * 100
    bar_current_duration.innerText = `${formatTime(currentsong.duration)} / ${formatTime(currentsong.currentTime)}`
    if (currentsong.currentTime == currentsong.duration) {
        play_pause.src = "images/play.svg"
        
        
        let pp_icon = document.querySelectorAll(".pp_icon")
        pp_icon.forEach((icon) => {
            icon.src = "images/play.svg"
        })
        
        
    }
    




})
seekbar.addEventListener("input", () => {
    bar_current_duration.innerText = currentsong.currentTime
    currentsong.currentTime = (seekbar.value * currentsong.duration) / 100
})


songlist.forEach((song, index) => {

    song.addEventListener("click", (e) => {
        if (e.target.classList.contains("pp_icon")) {
            playSong(index)
        }
    });
});


volume.addEventListener("input",()=>{
    currentsong.volume = volume.value /100
})




  

    //     container.style.height =
    // `${window.innerHeight - (control_box.offsetHeight * 2)}px`;
        // container.style.height = window.innerHeight - control_box.offsetHeight+"px"
