document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const rangeSlider = document.getElementById('myRange');
    const currentTimeElem = document.getElementById('current-time');
    const totalTimeElem = document.getElementById('total-time');
    const songTitleElem = document.querySelector('.song-title');
    const artistElem = document.querySelector('.artist');
    
    const songs = [
        { title: "Song1", artist: "Unknown artist", src: "song1.mp3" },
        { title: "Song2", artist: "unknown artist", src: "song2.mp3" },
    ];

    let currentSongIndex = 0;
    let audio = new Audio(songs[currentSongIndex].src);
    let isPlaying = false;

    function loadSong(song) {
        songTitleElem.textContent = song.title;
        artistElem.textContent = song.artist;
        audio.src = song.src;
        rangeSlider.value = 0;
        currentTimeElem.textContent = "0:00";
        totalTimeElem.textContent = formatTime(audio.duration);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function playPauseSong() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex === 0) ? songs.length - 1 : currentSongIndex - 1;
        loadSong(songs[currentSongIndex]);
        playPauseSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex === songs.length - 1) ? 0 : currentSongIndex + 1;
        loadSong(songs[currentSongIndex]);
        playPauseSong();
    }

    playPauseBtn.addEventListener('click', playPauseSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    audio.addEventListener('loadedmetadata', () => {
        totalTimeElem.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        rangeSlider.value = (audio.currentTime / audio.duration) * 100;
        currentTimeElem.textContent = formatTime(audio.currentTime);
    });

    rangeSlider.addEventListener('input', () => {
        audio.currentTime = (rangeSlider.value / 100) * audio.duration;
    });

 
    loadSong(songs[currentSongIndex]);
});
