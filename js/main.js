import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'
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
searchCloserEl.addEventListener('click', function(event){
  event.stopPropagation();
  hideSearch();
})
searchShadowEl.addEventListener('click', hideSearch)
function showSearch(){
  headerEl.classList.add('searching');
  playScroll();
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
  stopScroll();
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  })
  searchDelayEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  })
  searchDelayEls.reverse();
  searchInputEl.value = '';
}
function playScroll(){
  document.documentElement.classList.remove('fixed');
}
function stopScroll(){
  document.documentElement.classList.add('fixed');
}
// 헤더 메뉴 토글 (모바일)
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click',function(){
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing');
    searchInputEl.value = '';
    playScroll();
    
  }else{
    headerEl.classList.add('menuing');
    stopScroll();
  }
  
})
// 헤더 검색
const searchTextfieldEl = document.querySelector('.search .textfield');
const searchCancelEl = document.querySelector('.search .search-canceler');

searchTextfieldEl.addEventListener('click', function(){
  headerEl.classList.add('searching--mobile');
  searchInputEl.focus();
})
searchCancelEl.addEventListener('click', function(){
  headerEl.classList.remove('searching--mobile');
})
//리사이즈로 남은 클래스 제거 
window.addEventListener('resize', function(){
  if(window.innerWidth <= 740){
    headerEl.classList.remove('searching');
  }else{
    headerEl.classList.remove('searching--mobile');
  }
})
//
const navEl = document.querySelector('nav');
const navMenuToggleEl = document.querySelector('nav .menu-toggler');
const navShadowEl = document.querySelector('nav .shadow');
navMenuToggleEl.addEventListener('click', function(){
  if(navEl.classList.contains('menuing')){
    hideNavMenu();
  }else{
    showNavMenu();
  }
})
navEl.addEventListener('click', function(event){
  event.stopPropagation();
})
navShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)
function showNavMenu(){
  navEl.classList.add('menuing');
}
function hideNavMenu(){
  navEl.classList.remove('menuing');
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

// ipad 렌더링
const itemsEl = document.querySelector('.compare .items');
// console.log(ipads);
ipads.forEach(function(ipad){
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');
  let colorList = '';
  ipad.colors.forEach(function(color){
    colorList += `<li style="background-color:${color}"></li>`
  });
  itemEl.innerHTML = /* HTML */`
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <a class="btn">구입하기</a>
    <a href="${ipad.url}" class="link">더 알아보기</a>
    `;

  itemsEl.append(itemEl);
})

//footer navigation
const navigationsEl = document.querySelector('footer .navigations');
console.log(navigations);
navigations.forEach(function(nav){
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');
  let mapList = '';
  nav.maps.forEach(function(map){
    mapList += /* HTML */`
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
    `;
  })

  mapEl.innerHTML = /* HTML */`
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
})

// 날짜
const thisYearEl = document.querySelector('.this-year');
thisYearEl.textContent = new Date().getFullYear();