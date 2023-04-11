//장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function(event){
  event.stopPropagation();
  //show클래스 확인
  if(basketEl.classList.contains('show')){
    //있으면 제거
    hideBasket();
  } else{
    showBasket();
  }
})
basketEl.addEventListener('click', function(event){
  event.stopPropagation();
})
window.addEventListener('click', function(){
  hideBasket();
})
function showBasket(){
  basketEl.classList.add('show');
}
function hideBasket(){
  basketEl.classList.remove('show');
}

//검색
const headerEl =  document.querySelector('header');
//전개연산자
const headerMenuEls = [...headerEl.querySelectorAll('.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = headerEl.querySelector('.search-closer');
const searchShadowEl = headerEl.querySelector('.shadow');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];
const searchInputEl = searchWrapEl.querySelector('input');

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)
function showSearch(){
  headerEl.classList.add('searching');
  document.documentElement.classList.add('fixed');
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  })
  searchDelayEls.forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  })
  setTimeout(function(){
    searchInputEl.focus();
  }, 600)
}
function hideSearch(){
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  })
  searchDelayEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  })
  searchDelayEls.reverse();
  searchInputEl.value = '';
}

//요소의 가시성 관찰
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show');
  })
})
const infoEls =  document.querySelectorAll('.info');
infoEls.forEach(function(el){
  io.observe(el);
})

//비디오재생
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function(){
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', function(){
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});