const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const player = $('.player')
const heading = $('header h2')
const thumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const playBtn = $('.btn-toggle-play')
const app = {
    currentIndex:0,
    isplaying:false,
    songs:[
        {
            name:'24H',
            singer:'Lyly',
            path:'./assets/music/24H.mp3',
            image:'./assets/img/jhin.jpg'
        },
        {
            name:'Ill Be There',
            singer:'Ill Be There',
            path:'./assets/music/Illbethere.mp3',
            image:'./assets/img/jhin.jpg'
        },
        {
            name:'Rock with you',
            singer:'Ill Be There',
            path:'./assets/music/Rockwithyou.mp3',
            image:'./assets/img/jhin.jpg'
        },
        {
            name:'Home',
            singer:'세븐틴',
            path:'./assets/music/home.mp3',
            image:'./assets/img/jhin.jpg'
        },
        {
            name:'OhMy',
            singer:'세븐틴',
            path:'./assets/music/OhMy.mp3',
            image:'./assets/img/jhin.jpg'
        },
        {
            name:'Thanks',
            singer:'세븐틴',
            path:'./assets/music/THANKS.mp3',
            image:'./assets/img/jhin.jpg'
        },
    ],
    handleEvent: function(){   
        const _this = this;   
        const cdWidth = cd.offsetWidth
        document.onscroll = function(){
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop           
                cd.style.width = newCdWidth>0?newCdWidth+'px':0
                cd.style.opacity = newCdWidth/cdWidth          
        }
        const cdThumbAnimate = thumb.animate([{transform:'rotate(360deg)'}],
        {
            duration:10000,
            iterations:Infinity
        })
        cdThumbAnimate.pause()
        playBtn.onclick = function(){ 
            if(_this.isplaying)
            {               
                audio.pause()                
            }
            else
            {
                audio.play()
            }
            audio.onpause = function(){
                 _this.isplaying=false
                 player.classList.remove('playing')
                 cdThumbAnimate.pause()
            }
            audio.onplay = function(){
                _this.isplaying=true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            audio.ontimeupdate = function(){
                if(audio.duration)
                {
                    const progressPercent = Math.floor((audio.currentTime/audio.duration)*100)
                    progress.value = progressPercent
                }
            }
            progress.onchange = function(e){
                const seek = audio.duration /100 * e.target.value
                audio.currentTime = seek
            }
        }
        nextBtn.onclick = function() {
            _this.nextSong()
            _this.isplaying=false
            player.classList.remove('playing')

        }


    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex>=this.songs.length)
        {
            this.currentIndex=0
        }
        this.loadCurrentSong()
    },
    defineProperties:function(){
        Object.defineProperty(this,'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            }
        })
    },  
    renderSongs: function(){      
        const html = this.songs.map(function(song){
            return `<div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div> `
        })
        $('.playlist').innerHTML = html.join('')
    },
    loadCurrentSong:function(){
        
        heading.textContent = this.currentSong.name
        thumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    start: function(){
        this.defineProperties()
        this.handleEvent()
        this.loadCurrentSong()

        this.renderSongs()
    }
}
app.start()

