window.onscroll = () => {
  const nav = document.querySelector('nav');
  const top = document.body.scrollTop || document.documentElement.scrollTop;
  if (top !== 0) {
    nav.classList.add('scrolled-nav');
  } else {
    nav.classList.remove('scrolled-nav');
  }
};
// header button mouse event--over and leave
$('.header-btn').mouseover(() => {
  setTimeout(() => {
    $('.header-btn')
      .css('background-color', ' #ffd344');
  }, 300);
});
$('.header-btn').mouseleave(() => {
  setTimeout(() => {
    $('.header-btn')
      .css('background-color', 'transparent');
  }, 300);
});
