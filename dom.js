let questionCounter = 0
let correctanswerCounter = 0
let questionlist = document.getElementById("questionslist")

let startinfo = document.getElementById("startinfo")
let startbutton = document.getElementById("start")
startbutton.addEventListener("click", startGame)
let endinfo = document.getElementById("endinfo")


let firstOption = document.getElementById("medicina")
let secondOption = document.getElementById("pokemon")
firstOption.addEventListener("click", evaluateAnswer)
secondOption.addEventListener("click", evaluateAnswer)

let options = document.getElementById("opciones")
let results = document.getElementById("resultado")

let nextButton = document.getElementById("next")
nextButton.addEventListener("click", nextQuestion)


let questionbg = document.getElementById("questionbg")
let circle = document.getElementById("circle")
let titleQuestion = document.getElementById("circle").children[0]
let image = document.getElementById("circle").children[1]

let question 


function newQuestion () {

    let randomNumber = Math.floor(Math.random() * triviaOptions.length)
    question = triviaOptions[randomNumber]
    triviaOptions.splice(randomNumber,1)
    questionCounter++

    //Esto podría enviarlo a una función que actualizá DOM de nueva pregunta
    removeClasses() 
    titleQuestion.innerText = question.name
    questionbg.classList.add("bg-gray-200")
    

}

function evaluateAnswer (e) {


    let answer = e.target.innerText
    let correctanswer = question.type
    let veredict

    if (answer === correctanswer) {
        veredict = true
        correctanswerCounter++
    } else {
        veredict = false
    }

    questionResult(veredict)

}

function questionResult(veredict) {

    image.src = question.img
    let title = results.firstElementChild.children[0].children[0]
    let description = results.firstElementChild.children[0].children[1]
    
    removeClasses() 

    if(veredict) {
        title.textContent = "¡Correcto!" 
        results.classList.add("bg-blue-600")
        questionbg.classList.add("bg-blue-600")
        //MÁS COSAS
    } else {
        title.textContent = "¡Incorrecto!"
        results.classList.add("bg-red-600")
        questionbg.classList.add("bg-red-600")

    }

    description.textContent = `${question.name} es un ${question.type}`
    markQuestionlist() // esto va acá?
    toogleClasses()

}

function nextQuestion (){
console.log(questionCounter)
    if(questionCounter < 10) {
        toogleClasses()
        newQuestion ()
    } else {
        finalResults() 
    }
    
}

function toogleClasses() {
    titleQuestion.classList.toggle("hidden")
    titleQuestion.classList.toggle("bounceIn")
    image.classList.toggle("hidden")
    image.classList.toggle("bounceIn")
    options.classList.toggle("hidden")
    results.classList.toggle("hidden")    
}

function removeClasses() {
    results.classList.remove("bg-blue-600")
    results.classList.remove("bg-red-600")
    questionbg.classList.remove("bg-gray-200")
    questionbg.classList.remove("bg-red-600")
    questionbg.classList.remove("bg-blue-600")
    
}

function markQuestionlist() {
    questionlist.children[questionCounter-1].classList.add("text-gray-500")
}

//newQuestion()

function startGame(){
    startinfo.classList.add("hidden")
    questionlist.classList.remove("hidden")
    options.classList.toggle("hidden")
    titleQuestion.classList.toggle("hidden")
    image.classList.toggle("hidden")
    newQuestion()
 }


 function finalResults() {

    
    let flavorText 
    
    if (correctanswerCounter > 8) {
        flavorText = "¡Felicidades! Tu conocimiento médico y sobre Pokémon son impresionantes."
        image.src = "img/winner.png"
    } else if (correctanswerCounter > 4) {
        flavorText = "Tienes una condición estable. Sigue practicando y aprendiendo. ¡Vuelve pronto!"
        image.src = "img/draw.png"
    } else {
        flavorText = "Tus conocimientos médicos y sobre Pokémon están en estado crítico. Necesitan atención urgente."
        image.src = "img/lose.png"
    }

    let final_results = `
    <div class="h-64 text-5xl text-white flex">
                <div class=" m-auto">
                    <h1 class="font-black leading-none text-4xl md:text-5xl">Acertaste ${correctanswerCounter} de 10</h1>
                    <p class="text-sm p-3">${flavorText}</p>
                    <a target="_blank" href="https://twitter.com/intent/tweet?text=¿Puedes diferenciar entre Medicamentos y Pokémon? Yo acerté ${correctanswerCounter} de 10: https://eduardoequis.github.io/medicinaopokemon/ ">
                    <button class="bg-transparent hover:bg-black text-white font-semibold hover:text-white py-2 px-4 text-2xl border border-white hover:border-transparent rounded-full">
                        Compartir resultados
                      </button>
                    </a>
                      <button class="bg-transparent hover:bg-black text-white font-semibold hover:text-white py-2 px-4 text-2xl border border-white hover:border-transparent rounded-full" onClick="window.location.reload()">
                        Volver a jugar
                      </button>
                </div>  
    `
   
    endinfo.innerHTML = final_results
    endinfo.classList.toggle("hidden")
    results.classList.toggle("hidden")
    image.classList.toggle("bounceIn")
    image.classList.toggle("heartBeat")
    console.log(image.classList)  


}