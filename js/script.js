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
      .css({ 'background-color': ' #fdcc52', 'border-color': ' #ffd344' });
  }, 300);
});
$('.header-btn').mouseleave(() => {
  setTimeout(() => {
    $('.header-btn')
      .css({ 'background-color': 'transparent', 'border-color': '#ffffff' });
  }, 300);
});

// TestImonial
const testImonial = {
  data: [],
  init() {
    this.findData();
  },
  findData() {
    $.getJSON('http://46.101.237.11/json/users.json', (result) => {
      this.data = result;
      console.log(this.data);
    });
    this.showAll();
  },
  showAll() {
    let div = '';
    for (let i = 0; i < this.data.length; i += 1) {
      div += this.divMaker(this.data[i], i);
    }
    document.querySelector('.test').innerHTML = div;
  },
  divMaker(person, index) {
    return `<div>
    ${person.name.first}
</div>`;
  },

};
testImonial.init();
