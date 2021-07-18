/* -------------------------------- Functions ------------------------------- */
function showOrHide(element) {
  // Show
  if (element.classList.contains('box-hidden')) {
    element.classList.add('box-transition')
    element.clientWidth
    element.classList.remove('box-hidden')

  } else {
    // Hide
    element.classList.add('box-transition')
    element.classList.add('box-hidden')
  }

  element.addEventListener('transitionend', function () {
    element.classList.remove('box-transition')
  }, false)
}

// Animate and pick
function randomPick() {

  var list = ["paper", "scissors", "rock"]
  var list_2 = ["rock", "paper", "scissors"]
  var i = 0
  var j = 1

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  var random_iteration = getRandomInt(10, 15)

  setTimeout(() => {
    var my_var = setInterval(function () {

      // Iterate between buttons
      house_choice_element.classList.remove("btn--" + list_2[i])
      house_choice_element.classList.add("btn--" + list[i])
      i++
      j++

      // Reset list
      if (i == 3) {
        i = 0
      }

      // Exit condition
      if (j == random_iteration) {

        clearInterval(my_var)
        house_choice_var = list_2[i]
        step_3()
      }
    }, 100)
  }, 1000)
}


var user_choice_var
var house_choice_var

/* ------------------------------ Get Elements ------------------------------ */
// Root
var r = document.querySelector(':root')

// Choices
var user_choice_element = document.getElementById("js-user-choice")
var house_choice_element = document.getElementById("js-house-choice")

// Content
var content_step_1 = document.getElementById("js-content--step-1")

var content_step_2 = document.getElementById("js-content--step-2")

var yourPicked_element = document.getElementById("js-content--step-2__yourPicked")
var housePicked_element = document.getElementById("js-content--step-2__housePicked")


var content_step_3 = document.getElementById("js-result")
var content_step_3_container = document.getElementById("js-result-container")

var score = document.getElementById("score")
var result__title = document.getElementById("js-result__title")
var play_again_button = document.getElementById('js-play-again')

// Set or get start score
var score_var = 0
if (localStorage.getItem("score") != null) {
  score_var = parseInt(localStorage.getItem("score"))
  score.innerHTML = score_var
}

/* ---------------------------------- Reset --------------------------------- */
function reset() {
  // content_step_1.style = ""
  // content_step_1.style.display = "flex"

  // content_step_2.style.display = "none"

  // content_step_3_container.style.display = "none"
  // content_step_3.style = ""

  // yourPicked_element.style = ""
  // housePicked_element.style = ""


  // user_choice_element.classList.remove(user_choice_var)
  // house_choice_element.classList.remove(house_choice_var)
  // house_choice_element.classList.remove("btn")
  // house_choice_element.classList.add("btn--empty")

  showOrHide(content_step_2)
  showOrHide(content_step_3)
  content_step_3.style.opacity = '0'

  user_choice_element.classList = "btn-container"
  house_choice_element.classList = "btn-container"

  play_again_button.disabled = true

  setTimeout(() => {
    showOrHide(content_step_1)
  }, 1000)

  // Reset Lighting effect
  r.style.setProperty('--light_shadow_var', '0')
}

/* --------------------------------- Step 1 --------------------------------- */
function step_1(choice) {
  user_choice_var = choice
  user_choice_element.classList.add(choice)
  showOrHide(content_step_1)
  step_2()
}

/* --------------------------------- Step 2 --------------------------------- */
function step_2() {
  setTimeout(() => {

    showOrHide(content_step_2)
    showOrHide(content_step_3)
    content_step_3.style.opacity = "0"
    setTimeout(() => {

      randomPick()
    }, 1000)
  }, 1000)

}


/* --------------------------------- Step 3 --------------------------------- */
function step_3() {

  // Check screen width
  function myFunction(x) {
    if (x.matches) {
      yourPicked_element.style.transform = "translateX(-100%)"
      housePicked_element.style.transform = "translateX(100%)"
      setTimeout(() => {
        // Activate light effect
        r.style.setProperty('--light_shadow_var', '1')

      }, 0)

    } else {
      // Activate light effect
      r.style.setProperty('--light_shadow_var', '1')
    }
  }

  // Animation after 0.5s
  var x = window.matchMedia("(min-width: 1366px)")
  setTimeout(() => {
    myFunction(x)

  }, 500)

  // Score display and storage
  function win() {
    score_var++
    localStorage.setItem("score", score_var)
    score.textContent = parseInt(score.textContent) + 1
    result__title.innerHTML = "You win"
  }

  function lose() {
    score_var--
    localStorage.setItem("score", score_var)
    score.textContent = parseInt(score.textContent) - 1
    result__title.innerHTML = "You lose"
  }

  function draw() {
    result__title.innerHTML = "Draw"
  }

  // Get winner
  setTimeout(function () {
    switch (user_choice_var) {
      case "btn--scissors":
        if (house_choice_var == "paper") {
          win()
        } else if (house_choice_var == "rock") {
          lose()
        } else {
          draw()
        }
        break

      case "btn--paper":
        if (house_choice_var == "rock") {
          win()
        } else if (house_choice_var == "scissors") {
          lose()
        } else {
          draw()
        }
        break

      case "btn--rock":
        if (house_choice_var == "scissors") {
          win()
        } else if (house_choice_var == "paper") {
          lose()
        } else {
          draw()
        }
        break
    }

    // Reveal result
    setTimeout(() => {
      content_step_3.style.opacity = "1"
      play_again_button.disabled = false

    }, 500)

  }, 1000)
}


/* -------------------------------- Set audio ------------------------------- */
function playAudio(url) {
  new Audio(url).play()
}
