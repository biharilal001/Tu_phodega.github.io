        // https://cdn.pixabay.com/download/audio/2020/09/17/audio_dd4ca043e0.mp3?filename=untamed-land-948.mp3


          //------------ SELECTING ELEMENTS ---------------//
          let buttons = document.querySelectorAll('.btn')
          let Level_buttons = document.querySelectorAll('.level_btn')
          let backArrow = document.querySelectorAll('.fas')
          let level_menu = document.getElementById('Choose_level')
          let audio_menu = document.getElementById('aduio_setting')
          let Main_menu = document.getElementById('main_menu')
          let timer_ = document.getElementById('timer')
          let Game_board = document.getElementById('game_board')
          let timer_audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-game-countdown-921.mp3')
          let game_sound = new Audio('https://cdn.pixabay.com/download/audio/2021/05/26/audio_4b423502a0.mp3?filename=centys-music-happy-7-4707.mp3')
          let baloon_pop = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-ballon-blows-up-3071.mp3')
          let game_over_sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-over-trombone-1940.mp3')
          game_sound.loop = true
          // SOME OBJECTS AND VARIABLES


          //--------------- MENU CONTROLS ---------------------//
          Array.from(buttons).forEach(function (item) {
               item.addEventListener('click', () => {
                    if (item.innerHTML == "Level" || item.innerText == "स्तर") {
                         level_menu.style.transform = 'translateX(0%)'
                         Level_buttons.forEach(function (item) {
                              item.addEventListener('click', () => {
                                   if (item) {
                                        console.log("level selected")
                                        resume.style.display = 'none'
                                   } else {
                                        console.log("no level selected")
                                   }
                              })
                             
                         })

                         // resume.style.display = 'none'
                    }
                    else if (item.innerHTML == "Setting" || item.innerText == "स्थापना") {
                         audio_menu.style.transform = 'translateX(0%)'
                    }
                    else if (item.innerHTML == 'New game' || item.innerText == 'नया खेल') {
                         reset()
                         Main_menu.style.transform = 'translateX(-110%)'
                         Game_board.classList.add('game_board_center')
                         let set_interval = setInterval(() => {
                              if (player.start == true) {
                                   player.time--
                                   if (player.audio == true) {
                                        timer_audio.pause()

                                   } else {
                                        timer_audio.play()
                                   }
                              }
                              if (player.time == 0) {
                                   timer_.innerHTML = `Play`
                                   if (player.audio == false) {
                                        game_sound.play()
                                   } else {
                                        game_sound.pause()
                                   }
                                   clearInterval(set_interval)
                                   setTimeout(() => {
                                        Gamestart()
                                        timer_audio.pause()
                                        timer_.innerHTML = ''
                                        Game_board.classList.remove('game_board_center')
                                   }, 500);
                              } else {
                                   timer_.innerHTML = `${player.time}`
                                   timer_.classList.add('animate_count')
                              }
                         }, 1000);
                    }
                    else if (item.innerHTML == 'Easy' || item.innerText == 'आसान') {
                         player.speed = item.value
                         player.chance = 20
                         player.level = "Easy"

                    }
                    else if (item.innerHTML == 'Medium' || item.innerText == 'मध्यम') {
                         player.speed = item.value
                         player.chance = 15
                         player.level = "Medium"

                    }
                    else if (item.innerHTML == 'Hard' || item.innerText == 'मुश्किल') {
                         player.speed = item.value
                         player.chance = 10
                         player.level = "Hard"

                    }
               })
          })

          

          //------- BACK BUTTON ------------//
          Array.from(backArrow).forEach(function (item, index) {
               item.addEventListener('click', () => {
                    if (index == 0) {
                         resume.style.display = 'block'
                         if (player.time == 0) {
                              baloon_menu.start = true
                              start()
                              player.resume = true
                              player.start = false
                              timer_audio.pause()
                              game_sound.pause()
                              let resume = document.getElementById('resume')
                              resume.innerHTML = `<button class="btn btn-primary">Resume</button>`
                              Main_menu.style.transform = 'translateX(0%)'
                         } else {
                              alert("Back after the Game is start")
                         }
                    } else if (index == 1) {
                         level_menu.style.transform = 'translateX(-110%)'
                    } else {
                         audio_menu.style.transform = 'translateX(-110%)'
                    }
               })
          })


          //--------- LISTENING RESUME BUTTON ------------//
          let rsm = document.createElement('li')
          rsm.setAttribute('id', "resume")
          menu_list.insertBefore(rsm, menu_list.firstElementChild)

          resume.addEventListener('click', () => {
               baloon_menu.start = false

               player.start = true
               player.resume = false
               Gamestart()
               if (player.audio == false) {
                    if (player.time == 0) {
                         game_sound.play()
                    }
                    else {
                         game_sound.pause()
                    }
                    // timer_audio.play()

               } else if (player.audio == true) {
                    // timer_audio.pause()
                    game_sound.pause()
               }

               Main_menu.style.transform = 'translateX(-110%)'
          })

          //----------- AUDIO OFF BUTTON ------------//
          slide_btn.addEventListener("click", () => {

               if (player.audio == false) {
                    on_off.innerHTML = ''
                    on_off.classList.remove('ON')
                    on_off.classList.add('OFF')
                    on_off.innerHTML = 'OFF'
                    slide_btn.style.transform = 'translateX(0%)'
                    slide_btn.style.backgroundColor = 'red'
                    player.audio = true
               }
               else if (player.audio == true) {
                    on_off.innerHTML = ''
                    on_off.classList.remove('OFF')
                    on_off.classList.add('ON')
                    on_off.innerHTML = 'ON'
                    slide_btn.style.transform = 'translateX(100%)'
                    slide_btn.style.backgroundColor = 'green'
                    player.audio = false
               }

          })

          //--------- SOME FUNCTIONS -----------//
          function reset() {
               baloon_menu.start = false
               player.start = true
               player.time = 4
               timer_audio.currentTime = 0
               game_sound.currentTime = 0
               timer_.classList.remove('animate_count')
               Game_board.classList.remove('game_board_center')
               reset_game()
          }


          //------ MAIN MENU BALOONS ---------//
          window.addEventListener('DOMContentLoaded', () => {
               start()
          })

          function start() {
               balun_move()
               if (baloon_menu.start == true) {
                    let animate1 = window.requestAnimationFrame(start)
               }
          }

          const baloon_menu = {
               x: 0,
               y: 0,
               dy: 1.5,
               start: true
          }

          for (i = 0; i < 8; i++) {
               // baloons for main menu
               let baloon_main_menu = document.createElement("div")
               baloon_main_menu.setAttribute('class', 'balun_menu')
               Main_menu.appendChild(baloon_main_menu)
          }

          let baluns = document.querySelectorAll('.balun_menu')
          for (i = 0; i < 8; i++) {
               // baloon thread for main menu
               let baloon_wire_main_menu = document.createElement("div")
               baloon_wire_main_menu.setAttribute('class', 'balun_wire_menu')
               baluns[i].appendChild(baloon_wire_main_menu)
          }

          baluns.forEach(function (item, index) {
               baloon_menu.y = Main_menu.getBoundingClientRect().height + index * 100
               baloon_menu.x = Math.floor(5 + (Main_menu.getBoundingClientRect().width - 50 - 5) * Math.random())
               item.style.top = baloon_menu.y + 'px'
               item.style.left = baloon_menu.x + 'px'
          })

          function balun_move() {
               baluns.forEach(function (item, index) {
                    if (item.offsetTop <= -140) {
                         baloon_menu.x = Math.floor(5 + ((Main_menu.getBoundingClientRect().width - 50) - 5) * Math.random())
                         item.style.top = `${Main_menu.clientHeight + 120}px`
                         item.style.left = `${baloon_menu.x}px`
                    }
                    item.style.top = item.offsetTop - baloon_menu.dy + 'px'
               })
          }
          //------------ MAIN MENU BALOONS END -----------------//

          //----------- BALOONS FOR GAME --------------//
          const game_balun = {
               x: 0,
               y: 0

          }
          const player = {
               start: false,
               time: 4,
               audio: false,
               chance: null,
               score: 0,
               resume: false,
               speed: 3,
               level: null
          }

          player_arr = []
          // player_arr2 = [...new Set(player_arr)]
          baloon_maker()
          baloon_position()
          function baloon_maker() {
               for (i = 0; i < 6; i++) {
                    // baloon for game
                    let game_baloon = document.createElement("div")
                    game_baloon.setAttribute('class', 'game_baloon')
                    Game_board.appendChild(game_baloon)
               }
               let game_baloon_ = document.querySelectorAll('.game_baloon')
               for (i = 0; i < 6; i++) {
                    // baloon thread for game
                    let game_baloon_wire = document.createElement("div")
                    game_baloon_wire.setAttribute('class', 'game_baloon_wire')
                    game_baloon_[i].appendChild(game_baloon_wire)


               }

          }

          let game_baloon_ = document.querySelectorAll('.game_baloon')
          let game_baloon_wire = document.querySelectorAll('.game_baloon_wire')

          function baloon_position() {
               let game_baloon_ = document.querySelectorAll('.game_baloon')
               game_baloon_.forEach(function (item, index) {
                    game_balun.y = Main_menu.getBoundingClientRect().height + index * 150

                    game_balun.x = Math.floor(5 + (Main_menu.getBoundingClientRect().width - 50 - 5) * Math.random())
                    item.style.top = game_balun.y + 'px'
                    item.style.left = game_balun.x + 'px'

               })
          }
          // BALOON POPPING 
          game_baloon_.forEach(function (item, index) {
               item.addEventListener('click', () => {
                    player.score++
                    if (player.audio == false) {
                         baloon_pop.play()
                    }
                    score.innerHTML = `Score : ${player.score}`
                    player_arr.push(index)
                    player_arr = [...new Set(player_arr)]
                    // console.log('player_arr : ', player_arr)
                    // item.style.backgroundColor = 'yellow'
                    item.classList.add('animate_count')
                    item.style.backgroundImage = `url('./images/baloonpop2.png')`
                    setTimeout(() => {
                         item.classList.remove('animate_count')
                         item.style.backgroundImage = `none`
                    }, 150);
                    // game_baloon_wire[index].style.backgroundColor = '#333'
                    game_baloon_wire[index].style.backgroundImage = 'none'
               })


          })
          function game_balun_move() {
               game_baloon_.forEach(function (item, index) {
                    if (item.offsetTop <= -100 && !player_arr.includes(index)) {
                         game_balun.x = Math.floor(5 + ((Main_menu.getBoundingClientRect().width - 50) - 5) * Math.random())
                         item.style.top = `${Main_menu.clientHeight + 100}px`
                         item.style.left = `${game_balun.x}px`
                         player.chance--
                         chance.innerHTML = `Chance : ${player.chance}`


                    } else if (item.offsetTop <= -100 && player_arr.includes(index)) {
                         game_balun.x = Math.floor(5 + ((Main_menu.getBoundingClientRect().width - 50) - 5) * Math.random())
                         item.style.top = `${Main_menu.clientHeight + 100}px`
                         item.style.left = `${game_balun.x}px`
                         // item.style.backgroundColor = 'red'
                         // game_baloon_wire[index].style.backgroundColor = '#333'
                         item.style.backgroundImage = `url('./images/baloon.png')`
                         game_baloon_wire[index].style.backgroundImage = `url('./images/curved-2-cutout.png')`
                         // player_arr.shift()
                         let arr_ele;
                         player_arr.forEach(function (item2, index2) {
                              if (index == item2) {
                                   arr_ele = index2
                              }
                         })

                         player_arr.splice(arr_ele, 1, null)
                         console.log('player_arr : ', player_arr)
                    }
                    item.style.top = item.offsetTop - player.speed + 'px'
               })
          }



          //---------- GAME OVER BACK TO MENU ---------------//


          gameOver.style.display = 'none'
          function bt_menu() {
               gameOver.style.display = 'flex'
               game_sound.pause()
               back_menu.style.display = 'none'

               let btmenu = document.getElementById('back_to_menu')
               btmenu.addEventListener('click', () => {
                    Main_menu.style.transform = 'translateX(0%)'
                    // menu_list.removeChild(menu_list.childNodes[0])
                    resume.style.display = 'none'
                    gameOver.style.display = 'none'
                    game_over_sound.pause()
                    game_over_sound.currentTime = 0
                    baloon_menu.start = true
                    start()

               })
          }

          // RESET GAME FUNCTION
          function reset_game() {
               player.score = 0
               if (player.level == null) {
                    player.chance = 15
               } else if (player.level == 'Hard') {
                    player.chance = 10
               } else if (player.level == 'Medium') {
                    player.chance = 15
               } else if (player.level == 'Easy') {
                    player.chance = 20
               }
               score.innerHTML = 'Score : 0'
               chance.innerHTML = `Chance : ${player.chance}`
               player.resume = false
               baloon_position()
               back_menu.style.display = 'block'
               resume.style.display = 'none'
          }

          // MAIN GAME
          function Gamestart() {
               game_balun_move()
               if (player.chance == 0) {
                    if (!player.audio) {
                         game_over_sound.play()
                    }
                    bt_menu()
                    cancelAnimationFrame(animate2)
               }
               if (player.resume == false) {
                    let animate2 = window.requestAnimationFrame(Gamestart)
               }
               if (player.level == 'Easy') {
                    if (player.score > 20 && player.score < 50) {
                         player.speed = 3

                    } else if (player.score > 50 && player.score < 100) {
                         player.speed = 4
                    } else {
                         player.speed = 5
                    }
               }
               else if (player.level == 'Medium') {
                    if (player.score > 30 && player.score < 60) {
                         player.speed = 5
                    } else if (player.score > 60 && player.score < 150) {
                         player.speed = 7
                    }
                    else {
                         player.speed 
                    }
               }
               else if (player.level == 'Hard') {
                    if (player.score > 50 && player.score < 150) {
                         player.speed = 7
                    } else if (player.score > 150) {
                         player.speed = 8
                    } else {
                         player.speed
                    }
               }
               else if (player.level == null) {
                    if (player.score > 30 && player.score < 70) {
                         player.speed = 5
                    } else if (player.score > 70 && player.score < 150) {
                         player.speed = 6
                    } else if (player.score > 150) {
                         player.speed = 8
                    } else {
                         player.speed
                    }
               }
          }
