const gridBtnLeft = document.querySelector(".grid__btn-left")
const gridBtnRight = document.querySelector(".grid__btn-right")
const dots = document.querySelectorAll(".grid__dots")
const containerForGrids = document.querySelector(".stage__container")
const cards = document.querySelectorAll('.card__item')
const totalCards = cards.length
const cardBtnLeft = document.querySelector('.carousel__btn-left')
const cardBtnRight = document.querySelector('.carousel__btn-right')
const firstCounter = document.querySelector('.count-1')
const secondCounter = document.querySelector('.count-2')
const cardsContainer = document.querySelector('.participants__cards-wrapper')
let currentIndexCarousel = 0
let autoSlideInterval
let currentIndexGrids = 0

gridBtnLeft.addEventListener("click", () => {
    if (currentIndexGrids > 0) {
        currentIndexGrids--
        updateSlide()
        updateButtonStyles()
    }
})

gridBtnRight.addEventListener("click", () => {
    if (currentIndexGrids < dots.length - 1) {
        currentIndexGrids++
        updateSlide()
        updateButtonStyles()
    }

})

function updateSlide() {
    const translateValue = -currentIndexGrids * 100
    containerForGrids.style.transform = `translateX(${translateValue}%)`

    dots.forEach((dot, index) => {
        dot.classList.toggle("dots-active", index === currentIndexGrids)
    })
}

function updateButtonStyles() {
    gridBtnLeft.classList.toggle('disabled', currentIndexGrids === 0)
    gridBtnRight.classList.toggle('disabled', currentIndexGrids === dots.length - 1)
}

function updateCarousel() {
    const cardWidthPercent = getCardWidthPercent()
    const translateValue = -currentIndexCarousel * cardWidthPercent
    cardsContainer.style.transform = `translateX(${translateValue}%)`
    updateCounter()
}

function updateCounter() {
    firstCounter.textContent = currentIndexCarousel + 1
    secondCounter.textContent = totalCards
}

function prevCards() {
    currentIndexCarousel = (currentIndexCarousel - 1 + totalCards) % totalCards
    updateCarousel()
}

function nextCards() {
    currentIndexCarousel = (currentIndexCarousel + 1) % totalCards
    updateCarousel()
}
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextCards()
    }, 4000)
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval)
}

function getCardWidthPercent() {
    let res
    if (window.innerWidth < 375) {
        res = 100
    } else if (window.innerWidth < 768) {
        res = 50
    } else {
        res = 33.33
    }
    return res
}

cardBtnRight.addEventListener('click', () => {
    nextCards()
    stopAutoSlide()
})
cardBtnLeft.addEventListener('click', () => {
    prevCards()
    stopAutoSlide()
})

updateCarousel()
startAutoSlide()