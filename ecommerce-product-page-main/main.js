document.addEventListener('DOMContentLoaded', () => {
  // Selecting Required Elements
  const menuBtn = document.querySelector('.menu-btn')
  const closeBtn = document.querySelector('.close-btn')
  const navLinks = document.querySelector('.nav-links')
  const imageEnabled = document.querySelector('.image-enabled')
  const lightboxEnabled = document.querySelectorAll('.lightbox-enabled')
  const lightboxContainer = document.querySelector('.lightbox-container')
  const lightboxCloseBtn = document.querySelector('.lightbox-close-btn')
  const lightboxImg = document.querySelector('.lightbox-img')
  const lightboxThumbnailContainer = document.querySelector(
    '.lightbox-thumbnail-container'
  )
  const lightBoxArray = [...document.querySelectorAll('.lb-img')]
  const lastImage = lightBoxArray.length - 1
  const lightboxBtns = document.querySelectorAll('.lightbox-btn')
  const lightboxLeftBtn = document.querySelector('#left')
  const lightboxRightBtn = document.querySelector('#right')
  const counterBtns = document.querySelectorAll('.counter-btn')
  const value = document.querySelector('.value')
  const minusBtn = document.querySelector('.minus')
  const cartBtn = document.querySelector('.cart-btn')
  const navCartBtn = document.querySelector('.nav-cart-btn')
  const cartBoxContainer = document.querySelector('.cart-box-container')
  const indicator = document.querySelector('.indicator')
  const deleteBtn = document.querySelector('.delete-btn')
  const checkoutBtn = document.querySelector('.checkout-btn')
  const cartContent = document.querySelector('.cart-content')
  const small = document.querySelector('small')
  const slides = document.querySelectorAll('.slide')
  const imageBoxBtns = document.querySelectorAll('.image-box-btn')
  const cartTimes = document.querySelector('.cart-times')
  const cartTotal = document.querySelector('.cart-total')
  let activeImage
  let count = 0
  let slideIndex = 0
  const productPrice = 125

  // functions
  const setActiveImage = (image) => {
    lightboxImg.src = image.getAttribute('src')
    activeImage = lightBoxArray.indexOf(image)
    removeBtnInactive()
    switch (activeImage) {
      case 0:
        lightboxLeftBtn.classList.add('inactive')
        break
      case lastImage:
        lightboxRightBtn.classList.add('inactive')
        break
      default:
        removeBtnInactive()
    }
  }

  const removeBtnInactive = () => {
    lightboxBtns.forEach((btn) => {
      btn.classList.remove('inactive')
    })
  }

  const slidesLeft = () => {
    lightboxLeftBtn.focus()
    activeImage === 0
      ? setActiveImage(lightBoxArray[lastImage])
      : setActiveImage(lightBoxArray[activeImage].previousElementSibling)
  }

  const slidesRight = () => {
    lightboxRightBtn.focus()
    activeImage === lastImage
      ? setActiveImage(lightBoxArray[0])
      : setActiveImage(lightBoxArray[activeImage].nextElementSibling)
  }

  const slider = (moveItems) => {
    moveItems.includes('left') ? slidesLeft() : slidesRight()
  }

  const counter = (result) => {
    const currentCount = result.classList
    if (currentCount.contains('plus')) {
      count++
    } else if (currentCount.contains('minus')) {
      count--
    } else {
      count = 0
    }
    if (count <= 0) {
      count = 0
      minusBtn.disabled = true
    } else {
      minusBtn.disabled = false
    }
    value.textContent = count
    indicator.textContent = count
    cartTimes.textContent = count
    cartTotal.textContent = addItemsToCart()
  }

  const showSlides = () => {
    slides.forEach((slide) => {
      slide.style.display = 'none'
    })
    slideIndex++
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    slides[slideIndex - 1].style.display = 'grid'
  }

  const addItemsToCart = () => {
    let times = cartTimes.innerText
    let finalAmount = parseInt(times) * productPrice
    return '$' + finalAmount.toFixed(2)
  }

  const removeCartItem = () => {
    if (value.textContent === '0') {
      cartContent.classList.add('hide')
      small.classList.add('empty')
      checkoutBtn.style.display = 'none'
    } else {
      cartContent.classList.remove('hide')
      small.classList.remove('empty')
      checkoutBtn.style.display = 'block'
    }
  }

  const indicatorOnPop = () => {
    if (value.textContent === '0') {
      indicator.classList.add('hidden')
    } else {
      indicator.classList.remove('hidden')
    }
  }

  // Event listeners
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active')
    cartBoxContainer.classList.remove('reveal')
  })

  closeBtn.addEventListener('click', () => {
    navLinks.classList.remove('active')
  })

  imageEnabled.addEventListener('click', () => {
    lightboxContainer.classList.add('show')
  })

  lightboxEnabled.forEach((image) => {
    image.addEventListener('click', (e) => {
      imageEnabled.src = e.target.getAttribute('src')
      lightboxEnabled.forEach((img) => img.classList.remove('image-active'))
      image.classList.add('image-active')
    })
  })

  lightboxCloseBtn.addEventListener('click', () => {
    lightboxContainer.classList.remove('show')
  })

  lightBoxArray.forEach((image) => {
    image.addEventListener('click', () => {
      lightBoxArray.forEach((img) => img.classList.remove('img-active'))
      image.classList.add('img-active')
    })
  })

  lightboxThumbnailContainer.addEventListener('click', (e) => {
    let img = e.target
    setActiveImage(img)
  })

  lightboxBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      slider(e.currentTarget.id)
    })
  })

  counterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      counter(e.currentTarget)
      cartBoxContainer.classList.remove('reveal')
    })
  })

  cartBtn.addEventListener('click', () => {
    indicatorOnPop()
    counter(result)
  })

  navCartBtn.addEventListener('click', () => {
    cartBoxContainer.classList.toggle('reveal')
    navLinks.classList.remove('active')
    cartTotal.textContent = addItemsToCart()
    removeCartItem()
  })

  minusBtn.addEventListener('click', () => {
    indicator.classList.add('hidden')
  })

  deleteBtn.addEventListener('click', () => {
    cartContent.classList.add('hide')
    checkoutBtn.style.display = 'none'
    small.classList.add('empty')
    small.textContent = 'Your cart is empty'
    indicator.classList.add('hidden')
  })

  checkoutBtn.addEventListener('click', () => {
    cartContent.classList.add('hide')
    checkoutBtn.style.display = 'none'
    small.classList.add('empty')
    small.textContent = 'Your order is placed'
    indicator.classList.add('hidden')
  })

  imageBoxBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      showSlides()
    })
  })
})
