class Presentation {
  constructor(slides) {
    this.slides = slides
    this.currentIndex = 0
  }

  hide() {
    this.slides[this.currentIndex].classList.remove('visible')
  }

  show() {
    this.slides[this.currentIndex].classList.add('visible')
  }

  start() {
    this.currentIndex = parseInt(location.hash.substring(1)) || 0
    this.show()
  }

  next() {
    if (this.currentIndex < this.slides.length - 1) {
      this.hide()
      this.currentIndex++
      this.show()
      location.hash = this.currentIndex
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.hide()
      this.currentIndex--
      this.show()
      location.hash = this.currentIndex
    }
  }
}

const presentation = new Presentation([
  ...document.querySelectorAll('section.slide')
])
presentation.start()

document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 39:
    case 32:
    case 68:
      presentation.next()
      break
    case 37:
    case 65:
      presentation.prev()
      break
  }
})

document.addEventListener('click', function (event) {
  if (event.target instanceof HTMLElement && event.target.nodeName === 'A') {
    return
  }
  if (event.x < window.innerWidth * 0.2) {
    presentation.prev()
  } else if (event.x > window.innerWidth * 0.8) {
    presentation.next()
  }
})
