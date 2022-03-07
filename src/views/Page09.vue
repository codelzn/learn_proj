<template>
  <div class="root">
    <div class="layout">
      <!-- header -->
      <header class="header" id="header">
        <nav class="nav container">
          <a href="#" class="nav__logo">
            <i class="ri-leaf-line nav__logo-icon"></i> Plantex
          </a>
          <div class="nav__menu" id="nav-menu">
            <ul class="nav__list">
              <li class="nav__item">
                <a href="#home" class="nav__link active-link">Home</a>
              </li>
              <li class="nav__item">
                <a href="#about" class="nav__link">About</a>
              </li>
              <li class="nav__item">
                <a href="#products" class="nav__link">Products</a>
              </li>
              <li class="nav__item">
                <a href="#faqs" class="nav__link">FAQs</a>
              </li>
              <li class="nav__item">
                <a href="#contact" class="nav__link">Contact</a>
              </li>
            </ul>
            <div class="nav__close" id="nav-close">
              <i class="ri-close-line"></i>
            </div>
          </div>
          <div class="nav__btns">
            <i class="ri-moon-line" id="theme-button"></i>
            <div class="nav__toggle" id="nav-toggle">
              <i class="ri-menu-line change-theme"></i>
            </div>
          </div>
        </nav>
      </header>
      <main class="main">
        <section class="home section" id="home">
          <div class="home__container container grid">
            <img src="/img09/home.png" alt="" class="home__img" />
            <div class="home__data">
              <h1 class="home__title">
                Plants will make
                <br />your life better
              </h1>
              <p
                class="home__description"
              >Create incredible plant design for your offices or apastaments. Add fresness to your new ideas.</p>
              <a href="#about" class="button button--flex">
                Explore
                <i class="ri-arrow-right-down-line button__icon"></i>
              </a>
            </div>
            <div class="home__social">
              <span class="home__social-follow">Follow Us</span>
              <div class="home__social-links">
                <a target="_blank" href="javascript:;" class="home__social-link">
                  <i class="ri-facebook-fill"></i>
                </a>
                <a target="_blank" href="javascript:;" class="home__social-link">
                  <i class="ri-instagram-line"></i>
                </a>
                <a target="_blank" href="javascript:;" class="home__social-link">
                  <i class="ri-twitter-fill"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section class="about section container" id="about">
          <div class="about__container grid">
            <img src="/img09/about.png" alt="" class="about__img" />
            <div class="about__data">
              <h2 class="section__title about__title">
                Who we really are &
                <br />why choose us
              </h2>
              <p
                class="about__description"
              >We have over 4000+ unbiased reviews and our customers rust our plants process and delivery services every time.</p>
              <div class="about__details">
                <p class="about__details-description">
                  <i class="ri-checkbox-fill about__details-icon"></i>
                  We always deliver on time.
                </p>
                <p class="about__details-description">
                  <i class="ri-checkbox-fill about__details-icon"></i>
                  We give you guides to protect and care for your plants.
                </p>
                <p class="about__details-description">
                  <i class="ri-checkbox-fill about__details-icon"></i>
                  We always come over for a check-up after sale.
                </p>
                <p class="about__details-description">
                  <i class="ri-checkbox-fill about__details-icon"></i>
                  100% money back guaranteed.
                </p>
              </div>
              <a href="#" class="button--link button--flex">
                Shop Now
                <i class="ri-arrow-right-down-line button__icon"></i>
              </a>
            </div>
          </div>
        </section>
        <section class="steps section container">
          <div class="steps__bg">
            <h2 class="section__title-center steps__title">
              Steps to start your
              <br />plant off right
            </h2>
            <div class="steps__container grid">
              <div class="steps__card">
                <div class="steps__card-number">01</div>
                <h3 class="steps__card-title">Choose Plant</h3>
                <p
                  class="steps__card-description"
                >We have several varieties plants you can choose from.</p>
              </div>
              <div class="steps__card">
                <div class="steps__card-number">02</div>
                <h3 class="steps__card-title">Place an order</h3>
                <p
                  class="steps__card-description"
                >Once your order is set, we move to the next step which is the shopping.</p>
              </div>
              <div class="steps__card">
                <div class="steps__card-number">03</div>
                <h3 class="steps__card-title">Get plants delivered</h3>
                <p
                  class="steps__card-description"
                >Our delivery process is easy, you receive the plant direct to your door.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="product section container" id="products">
          <h2 class="section__title-center">
            Check out our
            <br />products
          </h2>
          <p
            class="product__description"
          >Here are some selected plants from our showroom, all are in excellent shape and has a long life span. Buy and enjoy best quality.</p>
          <div class="product__container grid">
            <article v-for="item in productList" :key="item.id" class="product__card">
              <div class="product__circle"></div>
              <img :src="item.url" alt="" class="product__img" />
              <h3 class="product__title">{{item.title}}</h3>
              <span class="product__price">{{item.price}}</span>
              <button class="button-flex product__button">
                <i class="ri-shopping-bag-line"></i>
              </button>
            </article>
          </div>
        </section>
        <section class="questions section" id="faqs">
          <h2 class="section__title-center question__title container">
            Some common questions <br> were often asked
          </h2>
          <div class="questions__container container grid">
            <div class="questions__group">
              <div v-for="item in questionList1" :key="item.id" class="questions__item">
                <header class="questions__header">
                  <i class="ri-add-line questions__icon"></i>
                  <h3 class="questions__item-title">
                    {{item.title}}
                  </h3>
                </header>
                <div class="questions__content">
                  <p class="questions__description">
                    {{item.description}}
                  </p>
                </div>
              </div>
            </div>
                        <div class="questions__group">
              <div v-for="item in questionList2" :key="item.id" class="questions__item">
                <header class="questions__header">
                  <i class="ri-add-line questions__icon"></i>
                  <h3 class="questions__item-title">
                    {{item.title}}
                  </h3>
                </header>
                <div class="questions__content">
                  <p class="questions__description">
                    {{item.description}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="contact section container" id="contact">
          <div class="contact__container grid">
            <div class="contact__box">
              <h2 class="section__title">
                Reach out to us today <br> via any of the given <br> information
              </h2>
              <div class="contact__data">
                <div class="contact__information">
                  <h3 class="contact__subtitle">
                    Call us for instant support
                  </h3>
                  <span class="contact__description">
                    <i class="ri-phone-line contact__icon"></i>
                    +81 666-6666-6666
                  </span>
                </div>
                <div class="contact__information">
                  <h3 class="contact__subtitle">
                    Write us by mail
                  </h3>
                  <span class="contact__description">
                    <i class="ri-mail-line contact__icon"></i>
                    user@email.com
                  </span>
                </div>
              </div>
            </div>
            <form action="" class="contact__form">
              <div class="contact__inputs">
                <div class="contact__content">
                  <input type="email" placeholder=" " class="contact__input">
                  <label for="" class="contact__label">Email</label>
                </div>
                <div class="contact__content">
                  <input type="text" placeholder=" " class="contact__input">
                  <label for="" class="contact__label">Subject</label>
                </div>
                <div class="contact__content contact__area">
                  <textarea name="message" placeholder=" " class="contact__input"></textarea>
                  <label for="" class="contact__label">Message</label>
                </div>
              </div>
              <button class="button button--flex">
                Send Message
                <i class="ri-arrow-right-up-line button__icon"></i>
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer class="footer section">
        <div class="footer__container container grid">
          <div class="footer__content">
            <a href="" class="footer__logo">
              <i class="ri-leaf-line footer__logo-icon"></i> Plantex
            </a>
            <h3 class="footer__title">
              Subscribe to our newsletter <br> to stay update
            </h3>
            <div class="footer__subscribe">
              <input type="email" placeholder="Enter your email" class="footer__input">
              <button class="button button--flex footer__button">
                Subscribe
                <i class="ri-arrow-right-up-line button__icon"></i>
              </button>
            </div>
          </div>
          <div class="footer__content">
            <h3 class="footer__title">Our Address</h3>
            <ul class="footer__data">
              <li class="footer__information">東京都</li>
              <li class="footer__information">新宿</li>
              <li class="footer__information">123-456-789</li>
            </ul>
          </div>
          <div class="footer__content">
            <h3 class="footer__title">Contact us</h3>
            <ul class="footer__data">
              <li class="footer__information">+81 123-4567-8902</li>
              <div class="footer__social">
                <a href="javascript:;" class="footer__social-link">
                  <i class="ri-facebook-fill"></i>
                </a>
                <a href="javascript:;" class="footer__social-link">
                  <i class="ri-instagram-line"></i>
                </a>
                <a href="javascript:;" class="footer__social-link">
                  <i class="ri-twitter-fill"></i>
                </a>
              </div>
            </ul>
          </div>
          <div class="footer__content">
            <h3 class="footer__title">
              We accept all credit cards
            </h3>
            <div class="footer__cards">
              <img src="/img09/card1.png" alt="" class="footer__card">
              <img src="/img09/card2.png" alt="" class="footer__card">
              <img src="/img09/card3.png" alt="" class="footer__card">
              <img src="/img09/card4.png" alt="" class="footer__card">
            </div>
          </div>
        </div>
        <p class="footer__copy">
          &#169; Plantex. All rights reserved.
        </p>
      </footer>
      <a href="javascript:;" class="scrollup" id="scroll-up">
        <i class="ri-arrow-up-fill scrollup__icon"></i>
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ScrollReveal from 'scrollreveal'
import 'remixicon/fonts/remixicon.css'
import { onMounted, reactive } from 'vue'
const productList = reactive([
  { id: 1, url: '/img09/product1.png', title: 'Cacti Plant', price: '$19.99' },
  { id: 2, url: '/img09/product2.png', title: 'Cactus Plant', price: '$29.99' },
  { id: 3, url: '/img09/product3.png', title: 'Aloe Vera Plant', price: '$5.99' },
  { id: 4, url: '/img09/product4.png', title: 'Succulent Plant', price: '$3.99' },
  { id: 5, url: '/img09/product5.png', title: 'Succulent Plant', price: '$59.99' },
  { id: 6, url: '/img09/product6.png', title: 'Green Plant', price: '$1.99' }
])
const questionList1 = reactive([
  { id: 1, title: 'My flowers are falling off or dying?', description: 'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.' },
  { id: 2, title: 'What causes leaves to become pale?', description: 'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.' },
  { id: 3, title: 'What causes brown crispy leaves?', description: 'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.' }
])
const questionList2 = reactive([
  { id: 4, title: 'How do i choose a plant?', description: 'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.' },
  { id: 5, title: 'How do i change the pots?', description: 'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.' },
  { id: 6, title: 'why are gnats flying around my plant?', description: 'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.' }
])
const showMenu = (): void => {
  const navMenu = document.getElementById('nav-menu') as HTMLElement
  const navToggle = document.getElementById('nav-toggle') as HTMLElement
  const navClose = document.getElementById('nav-close') as HTMLElement
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu')
    })
  }
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu')
    })
  }
}
const removeMenuMobile = (): void => {
  const navLink = document.querySelectorAll('.nav__link')
  const linkAction = () => {
    const navMenu = document.getElementById('nav-menu') as HTMLElement
    navMenu.classList.remove('show-menu')
  }
  navLink.forEach(n => n.addEventListener('click', linkAction))
}
const changeBgHeader = (): void => {
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header') as HTMLElement
    if (scrollY >= 80) {
      header.classList.add('scroll-header')
    } else {
      header.classList.remove('scroll-header')
    }
  })
}
const questionsController = ():void => {
  const accordionItems = document.querySelectorAll('.questions__item')
  accordionItems.forEach(item => {
    const accordionHeader = item.querySelector('.questions__header') as HTMLElement
    accordionHeader.addEventListener('click', () => {
      const openItem = document.querySelector('.accordion-open') as HTMLElement
      toggleItem(item as HTMLElement)
      if (openItem && openItem !== item) {
        toggleItem(openItem)
      }
    })
  })
  const toggleItem = (item: HTMLElement) => {
    const accordionContent = item.querySelector('.questions__content') as HTMLElement
    if (item.classList.contains('accordion-open')) {
      accordionContent.removeAttribute('style')
      item.classList.remove('accordion-open')
    } else {
      accordionContent.style.height = accordionContent.scrollHeight + 'px'
      item.classList.add('accordion-open')
    }
  }
}
const scrollSelectionActive = ():void => {
  const sections = document.querySelectorAll('.section[id]')
  const scrollActive = ():void => {
    const scrollY:number = window.pageYOffset
    sections.forEach((current) => {
      const sectionHeight:number = (current as HTMLElement).offsetHeight
      const sectionTop:number = (current as HTMLElement).offsetTop - 55
      const sectionId = current.getAttribute('id') as string
      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.nav__menu a[href*=' + sectionId + ']')!.classList.add('active-link')
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.nav__menu a[href*=' + sectionId + ']')!.classList.remove('active-link')
      }
    })
  }
  window.addEventListener('scroll', scrollActive)
}
const showScrollUp = ():void => {
  const scrollUp = document.getElementById('scroll-up') as HTMLElement
  const scrollUpAction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  window.addEventListener('scroll', () => {
    if (scrollY >= 200) {
      scrollUp.classList.add('show-scroll')
    } else {
      scrollUp.classList.remove('show-scroll')
    }
  })
  scrollUp.addEventListener('click', scrollUpAction)
}
const lazyLoad = () => {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
  })
  sr.reveal('.home__data')
  sr.reveal('.home__img', { delay: 500 })
  sr.reveal('.home__social', { delay: 600 })
  sr.reveal('.about__img, .contact__box', { origin: 'left' })
  sr.reveal('.about__data, .contact__form', { origin: 'right' })
  sr.reveal('.steps__card', { origin: 'right' })
  sr.reveal('.steps__card, .product__card, .questions__group, .footer', { interval: 100 })
}
onMounted(() => {
  showMenu()
  removeMenuMobile()
  changeBgHeader()
  questionsController()
  scrollSelectionActive()
  showScrollUp()
  lazyLoad()
})
</script>
<style lang="less" scoped>
// Google Font
@import (css)
  url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
// color
@header-height: 3.5rem;
@hue: 152;
@first-color: hsl(@hue, 24%, 32%);
@first-color-alt: hsl(@hue, 24%, 28%);
@first-color-light: hsl(@hue, 24%, 66%);
@first-color-lighten: hsl(@hue, 24%, 92%);
@title-color: hsl(@hue, 4%, 15%);
@text-color: hsl(@hue, 4%, 35%);
@text-color-light: hsl(@hue, 4%, 32%);
@body-color: hsl(@hue, 0%, 100%);
@container-color: #fff;
// font
@body-font: "Poppins", sans-serif;
@big-font-size: 2rem;
@h1-font-size: 1.5rem;
@h2-font-size: 1.25rem;
@h3-font-size: 1rem;
@normal-font-size: 0.938rem;
@small-font-size: 0.813rem;
@smaller-font-size: 0.75rem;
// font-weight
@font-medium: 500;
@font-semi-bold: 600;
// margen bottom
@mb-0-5: 0.5rem;
@mb-0-75: 0.75rem;
@mb-1: 1rem;
@mb-1-5: 1.5rem;
@mb-2: 2rem;
@mb-2-5: 2.5rem;
// z-index
@z-tooltip: 10;
@z-fixed: 100;
// media
@media screen and (min-width: 968px) {
  @big-font-size: 3.5rem;
  @h1-font-size: 2.25rem;
  @h2-font-size: 1.5rem;
  @h3-font-size: 1.25rem;
  @normal-font-size: 1rem;
  @small-font-size: 0.875rem;
  @smaller-font-size: 0.813rem;
}
// base
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.root {
  // 控制滚动条更圆滑
  scroll-behavior: smooth;
}
.layout,
button,
input,
textarea {
  font-family: @body-font;
  font-size: @normal-font-size;
}
.layout {
  margin: @header-height 0 0 0;
  background-color: @body-color;
  color: @text-color;
}
button {
  cursor: pointer;
  border: none;
  outline: none;
}
h1,
h2,
h3 {
  color: @title-color;
  font-weight: @font-semi-bold;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  max-width: 100%;
  height: auto;
}
// theme change
.change-theme {
  color: @title-color;
  font-size: 1.15rem;
  cursor: pointer;
}
.nav__btns {
  display: inline-flex;
  align-items: center;
  column-gap: 1rem;
}
.section {
  padding: 5.5rem 0 1rem;
}
.section__title,
.section__title-center {
  font-size: @h2-font-size;
  margin-bottom: @mb-2;
  line-height: 140%;
}
.section__title-center {
  text-align: center;
}
.container {
  max-width: 968px;
  margin-left: @mb-1-5;
  margin-right: @mb-1-5;
}
.grid {
  display: grid;
}
.main {
  overflow: hidden;
}
.scroll-header {
  box-shadow: 0 1px 4px hsla(@hue, 4%, 15%, 0.1);
}
// header
.header {
  width: 100%;
  background-color: @body-color;
  position: fixed;
  top: 0;
  left: 0;
  z-index: @z-fixed;
}
// nav
.nav {
  height: @header-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav__logo,
.nav__toggle,
.nav__close {
  color: @title-color;
}
.nav__logo {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: -1px;
  display: inline-flex;
  align-items: center;
  column-gap: 0.5rem;
  transition: 0.3s;
}
.nav__logo-icon {
  font-style: 1.15rem;
  color: @first-color;
}
.nav__logo:hover {
  color: @first-color;
}

.nav__toggle {
  display: inline-flex;
  font-style: 1.25rem;
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  .nav__menu {
    position: fixed;
    background-color: @container-color;
    width: 80%;
    height: 100%;
    top: 0;
    right: -100%;
    box-shadow: -2px 0 4px hsla(@hue, 24%, 15%, 0.1);
    padding: 4rem 0 0 3rem;
    border-radius: 1rem 0 0 1rem;
    transition: 0.3s;
    z-index: @z-fixed;
  }
}
.nav__close {
  font-style: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  cursor: pointer;
}

.nav__list {
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
}
.nav__link {
  color: @title-color;
  font-weight: @font-medium;
  transition: 0.3s;
}
.nav__link:hover {
  color: @first-color;
}
.show-menu {
  right: 0;
}
.active-link {
  position: relative;
  color: @first-color;
}
.active-link::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 50%;
  height: 2px;
  background-color: @first-color;
}
// home
.home {
  padding: 3.5rem 0 2rem;
}
.home__container {
  position: relative;
  row-gap: 2rem;
}
.home__img {
  width: 200px;
  justify-self: center;
}
.home__title {
  font-style: @big-font-size;
  line-height: 140%;
  margin-bottom: @mb-1;
}
.home__description {
  margin-bottom: @mb-2-5;
}
.home__social {
  position: absolute;
  top: 2rem;
  right: -1rem;
  display: grid;
  justify-items: center;
  row-gap: 3.5rem;
}
.home__social-follow {
  font-weight: @font-medium;
  font-style: @smaller-font-size;
  color: @first-color;
  position: relative;
  transform: rotate(90deg);
}
.home__social-follow::after {
  content: "";
  position: absolute;
  width: 1rem;
  height: 2px;
  background-color: @first-color;
  right: -45%;
  top: 50%;
}
.home__social-links {
  display: inline-flex;
  flex-direction: column;
  row-gap: 0.25rem;
}
.home__social-link {
  font-size: 1rem;
  color: @first-color;
  transition: 0.3s;
}
.home__social-link:hover {
  transform: translateX(0.25rem);
}
// button
.button {
  display: inline-block;
  background-color: @first-color;
  color: #fff;
  padding: 1rem 1.75rem;
  border-radius: 0.5rem;
  font-weight: @font-medium;
  transition: 0.3s;
}
.button:hover {
  background-color: @first-color-alt;
}

.button__icon {
  transition: 0.3s;
}
.button:hover .button__icon {
  transform: translateX(0.25rem);
}
.button--flex {
  display: inline-flex;
  align-items: center;
  column-gap: 0.5rem;
}
.button--link {
  color: @first-color;
  font-weight: @font-medium;
}
.button--link:hover .button__icon {
  transform: translateX(0.25rem);
}
// about
.about__container {
  row-gap: 2rem;
}
.about__img {
  width: 280px;
  justify-self: center;
}
.about__title {
  margin-bottom: @mb-1;
}
.about__description {
  margin-bottom: @mb-2;
}
.about__details {
  display: grid;
  row-gap: 1rem;
  margin-bottom: @mb-2-5;
}
.about__details-description {
  display: inline-flex;
  column-gap: 0.5rem;
  font-size: @small-font-size;
}
.about__details-icon {
  font-size: 1rem;
  color: @first-color;
  margin-top: 0.15rem;
}
// steps
.steps__bg {
  background-color: @first-color;
  padding: 3rem 2rem 2rem;
  border-radius: 1rem;
}
.steps__container {
  gap: 2rem;
  padding-top: 1rem;
}
.steps__title {
  color: #fff;
}
.steps__card {
  background-color: @container-color;
  padding: 2.5rem 3rem 2rem 1.5rem;
  border-radius: 1rem;
}
.steps__card-number {
  display: inline-block;
  background-color: @first-color;
  color: #fff;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: @h2-font-size;
  margin-bottom: @mb-1-5;
  transition: 0.3s;
}
.steps__card-title {
  font-size: @h3-font-size;
  margin-bottom: @mb-0-5;
}
.steps__card-description {
  font-size: @small-font-size;
}
.steps__card:hover .steps__card-number {
  transform: translateY(-0.25rem);
}
// products
.product__description {
  text-align: center;
}
.product__container {
  padding: 3rem 0;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem 3rem;
}
.product__card {
  display: grid;
  position: relative;
}
.product__img {
  position: relative;
  width: 120px;
  justify-self: center;
  margin-bottom: @mb-0-75;
  transition: 0.3s;
}
.product__title,
.product__price {
  font-size: @small-font-size;
  font-weight: @font-semi-bold;
  color: @title-color;
}
.product__title {
  margin-bottom: 0.25rem;
}
.product__button {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: @first-color;
  color: #fff;
  padding: 0.25rem 0.25rem 0 0.25rem;
  border-radius: 0.35rem;
  font-size: 1.15rem;
}
.product__button:hover {
  background-color: @first-color-alt;
}
.product__circle {
  width: 90px;
  height: 90px;
  background-color: @first-color-lighten;
  border-radius: 50%;
  position: absolute;
  top: 18%;
  left: 5%;
}
.product__card:hover .product__img {
  transform: translateY(-0.5rem);
}
// questions
.questions {
  background-color: @first-color-lighten;
}
.questions__container {
  gap: 1.5rem;
  padding: 1.5rem 0;
}
.questions__group{
  display: grid;
  row-gap: 1.5rem;
}
.questions__item {
  background-color: @container-color;
  border-radius: 0.25rem;
}
.questions__item-title {
  font-size: @small-font-size;
  font-weight: @font-medium;
}
.questions__icon {
  font-size: 1.25rem;
  color: @title-color;
}
.questions__description {
  font-size: @smaller-font-size;
  padding: 0 1.25rem 1.25rem 2.5rem;
}
.questions__header {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  padding: 0.75rem 0.5rem;
  cursor: pointer;
}
.questions__content {
  overflow: hidden;
  height: 0;
}
.questions__item,
.questions__header,
.questions__item-title,
.questions__icon,
.questions__description,
.questions__content {
  transition: 0.3s;
}
.questions__item:hover {
  box-shadow: 0 2px 8px hsla(@hue, 4%, 15%, 0.15);
}
.accordion-open .questions__header,
.accordion-open .questions__content {
  background-color: @first-color;
}
.accordion-open .questions__item-title,
.accordion-open .questions__description,
.accordion-open .questions__icon {
  color: #fff;
}
.accordion-open .questions__icon {
  transform: rotate(45deg);
}
// contact
.contact__container {
  row-gap: 3.5rem;
}
.contact__data {
  display: grid;
  row-gap: 2rem;
}
.contact__subtitle{
  font-size: @normal-font-size;
  font-weight: @font-medium;
  color: @text-color;
  margin-bottom: @mb-0-5;
}
.contact__description {
  display: inline-flex;
  align-items: center;
  column-gap: 0.5rem;
  color: @title-color;
  font-weight: @font-medium;
}
.contact__icon {
  font-size: 1.25rem;
}
.contact__inputs {
  display: grid;
  row-gap: 2rem;
  margin-bottom: @mb-2-5;
}
.contact__content {
  position: relative;
  height: 3rem;
  border-bottom: 1px solid @text-color-light;
}
.contact__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 1rem 0;
  background: none;
  border: none;
  outline: none;
  z-index: 1;
}
.contact__label {
  position: absolute;
  top: 0.75rem;
  width: 100%;
  font-size: @small-font-size;
  color: @text-color-light;
  transition: 0.3s;
}
.contact__area {
  height: 7rem;
  textarea {
    resize: none;
  }
}
.contact__input:focus + .contact__label {
  top: -0.75rem;
  left: 0;
  font-size: @smaller-font-size;
  z-index: 10;
}
.contact__input:not(:placeholder-shown).contact__input:not(:focus) + .contact__label {
  top: -0.75rem;
  font-size: @smaller-font-size;
  z-index: 10;
}
.footer__container {
  row-gap: 3rem;
}
.footer__logo {
  display: inline-flex;
  align-items: center;
  column-gap: 0.5rem;
  color: @title-color;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: @mb-2-5;
  transition: 0.3s;
}
.footer__logo-icon {
  font-size: 1.15rem;
  color: @first-color;
}
.footer__logo:hover {
  color: @first-color;
}
.footer__title {
  font-size: @h3-font-size;
  margin-bottom: @mb-1-5;
}
.footer__subscribe {
  background-color: @first-color-lighten;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  border-radius: 0.5rem;
}
.footer__input {
  width: 70%;
  padding: 0 0.5rem;
  background: none;
  border: none;
  outline: none;
}
.footer__button {
  padding: 1rem;
}
.footer__data {
  display: grid;
  row-gap: 0.75rem;
}
.footer__information {
  font-size: @small-font-size;
}
.footer__social {
  display: inline-flex;
  column-gap: 0.75rem;
}
.footer__social-link {
  font-size: 1rem;
  color: @text-color;
  transition: 0.3s;
}
.footer__social-link:hover {
  transform: translateY(-0.25rem);
}
.footer__cards {
  display: inline-flex;
  align-items: center;
  column-gap: 0.5rem;
}
.footer__card {
  width: 35px;
}
.footer__copy {
  text-align: center;
  font-size: @smaller-font-size;
  margin: 5rem 0 1rem;
}
.scrollup {
  position: fixed;
  background-color: @first-color;
  right: 1rem;
  bottom: -30%;
  display: inline-flex;
  padding: 0.5rem;
  border-radius: 0.25;
  z-index: @z-tooltip;
  opacity: 0.8;
  transition: 0.4s;
}
.scrollup__icon {
  font-size: 1rem;
  color: #fff;
}
.scrollup:hover {
  background-color: @first-color-alt;
  opacity: 1;
}
.show-scroll {
  bottom: 3rem;
}
//scroll bar
::-webkit-scrollbar {
  width: 0.6rem;
  background: hsl(@hue, 4%, 53%);
}
::-webkit-scrollbar-thumb {
  background: hsl(@hue, 4%, 29%);
  border-radius: 0.5rem;
}
@media screen and (max-width: 320px) {
  .container {
    margin-left: @mb-1;
    margin-right: @mb-1;
  }
  .home__img {
    width: 180px;
  }
  .home__title {
    font-size: @h1-font-size;
  }
  .steps__bg {
    padding: 2rem 1rem;
  }
  .steps__card {
    padding: 1.5rem;
  }
  .product__container {
    grid-template-columns: .6fr;
    justify-content: center;
  }
}
@media screen and (min-width: 576px) {
  .steps__container {
    grid-template-columns: repeat(2, 1fr);
  }
  .product__description {
    padding: 0 4rem;
  }
  .product__container {
    grid-template-columns: repeat(2, 170px);
    justify-content: center;
    column-gap: 5rem;
  }
  .footer__subscribe {
    width: 400px;
  }
}
@media screen and (min-width: 767px) {
  .layout {
    margin: 0;
  }
  .nav {
    height: calc(@header-height + 1.5rem);
  }
  .nav__toggle,
  .nav__close {
    display:none;
  }
  .nav__list {
    flex-direction: row;
    column-gap: 3rem;
  }
  .nav__menu {
    margin-left: auto;
  }
  .home__container,
  .about__container,
  .questions__container,
  .contact__container,
  .footer__container {
    grid-template-columns: repeat(2, 1fr);
  }
  .home {
    padding: 10rem 0 5rem;
  }
  .home__container {
    align-items: center;
  }
  .home__img {
    width: 280px;
    order: 1;
  }
  .home__social {
    top: 30%;
  }
  .questions__container {
    align-items: flex-start;
  }
  .footer__container {
    column-gap: 3rem;
  }
  .footer__subscribe {
    width: initial;
  }
}
@media screen and (min-width: 992px) {
  .container {
    margin-left: auto;
    margin-right: auto;
  }
  .section {
    padding: 8rem 0 1rem;
  }
  .section__title,
  .section__title-center {
    font-size: @h1-font-size;
  }
  .home {
    padding: 13rem 0 5rem;
  }
  .home__img {
    width: 350px;
  }
  .home__description {
    padding: 7rem;
  }
  .about__img {
    width: 380px;
  }
  .steps__container {
    grid-template-columns: repeat(3, 1fr);
  }
  .steps__bg {
    padding: 3.5rem 2.5rem;
  }
  .steps__card-title {
    font-size: @normal-font-size;
  }
  .product__description {
    padding: 0 16rem;
  }
  .product__container {
    padding: 4rem 0;
    grid-template-columns: repeat(3, 185px);
    gap: 4rem 6rem;
  }
  .product__img {
    width: 160px;
  }
  .product__circle {
    width: 110px;
    height: 110px;
  }
  .product__title,
  .product__circle{
    font-size: @normal-font-size;
  }
  .questions__container {
    padding: 1rem 0 4rem;
  }
  .questions__title {
    text-align: initial;
  }
  .questions__group {
    row-gap: 2rem;
  }
  .questions__header {
    padding: 1rem;
  }
  .questions__description {
    padding: 0 3.5rem 2.25rem 2.75rem;
  }
  .footer__logo {
    font-size: @h3-font-size;
  }
  .footer__container {
    grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr;
  }
  .footer__copy {
    margin: 7rem 0 2rem;
  }
}
@media screen and (min-width:1200px) {
  .home__social {
    right: -3rem;
    row-gap: 4.5rem;
  }
  .home__sccial-follow {
    font-size: @small-font-size;
  }
  .home__social-follow:hover {
    width: 1.5rem;
    right: -60%;
  }
  .home__social-link {
    font-size: 1.15rem;
  }
  .about__container {
    column-gap: 7rem;
  }
  .scrollup {
    right: 3rem;
  }
}
</style>
