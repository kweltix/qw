'use strict';
const search=document.querySelector('#search'),brand=document.querySelector('#brand'),format=document.querySelector('#format'),clear=document.querySelector('#clear');
const cards=[...document.querySelectorAll('.product')],sections=[...document.querySelectorAll('.format')],results=document.querySelector('#results');
document.querySelector('.catalog-tools').hidden=false;
function label(n){const a=n%10,b=n%100;return n+' '+(a===1&&b!==11?'позиция':a>=2&&a<=4&&(b<12||b>14)?'позиции':'позиций');}
function filter(){const terms=search.value.trim().toLocaleLowerCase('ru').split(/\s+/).filter(Boolean);let count=0;for(const section of sections){let n=0;for(const card of section.querySelectorAll('.product')){card.hidden=!!((format.value&&section.id!==format.value)||(brand.value&&card.dataset.brand!==brand.value)||!terms.every(term=>card.dataset.search.includes(term)));if(!card.hidden){n++;count++;}}section.hidden=n===0;section.querySelector('.section-heading>span:last-child').textContent=label(n);}results.textContent='Показано '+count+' из '+cards.length;document.querySelector('#empty').hidden=count!==0;clear.hidden=!search.value&&!brand.value&&!format.value;}
function reset(){search.value='';brand.value='';format.value='';filter();}
search.addEventListener('input',filter);brand.addEventListener('change',filter);format.addEventListener('change',filter);clear.addEventListener('click',()=>{reset();search.focus();});document.querySelector('#empty-reset').addEventListener('click',()=>{reset();search.focus();});document.querySelector('form').addEventListener('submit',event=>event.preventDefault());document.querySelectorAll('.format-nav a').forEach(link=>link.addEventListener('click',()=>reset()));filter();

const energySearch=document.querySelector('#energy-search');
const energyCards=[...document.querySelectorAll('.energy-product')];
document.querySelector('.energy-tools').hidden=false;
function filterEnergy(){const terms=energySearch.value.trim().toLocaleLowerCase('ru').split(/\s+/).filter(Boolean);let count=0;for(const card of energyCards){card.hidden=!terms.every(term=>card.dataset.energySearch.includes(term));if(!card.hidden)count++;}document.querySelector('#energy-results').textContent='Показано '+count+' из '+energyCards.length;document.querySelector('#energy-clear').hidden=!energySearch.value;document.querySelector('#energy-empty').hidden=count!==0;}
function resetEnergy(){energySearch.value='';filterEnergy();}
energySearch.addEventListener('input',filterEnergy);
document.querySelector('.energy-tools').addEventListener('submit',event=>event.preventDefault());
document.querySelectorAll('#energy-clear,#energy-empty-reset').forEach(button=>button.addEventListener('click',()=>{resetEnergy();energySearch.focus();}));
const cigarettePanel=document.querySelector('#cigarettes-panel'),energyPanel=document.querySelector('#energy-panel');
const hero=document.querySelector('#catalog-hero');
const tobaccoHero={title:hero.querySelector('h1').innerHTML,description:hero.querySelector('.hero-inner p').textContent,brands:hero.querySelector('.brand-line').innerHTML};
function renderSection(scroll=true){
 const hash=location.hash.slice(1).toLowerCase();
 const isEnergy=hash==='energy'||hash.startsWith('energy-');
 const section=isEnergy?'energy':'cigarettes';
 cigarettePanel.hidden=isEnergy;energyPanel.hidden=!isEnergy;document.documentElement.dataset.activeSection=section;
 document.querySelectorAll('[data-section-link]').forEach(link=>{if(link.dataset.sectionLink===section)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 hero.querySelector('h1').innerHTML=isEnergy?'Энергетические<br><em>напитки MILANO</em>':tobaccoHero.title;
 hero.querySelector('.hero-inner p').textContent=isEnergy?'Полная информация по предоставленным макетам упаковки':tobaccoHero.description;
 hero.querySelector('.hero-stats>div:first-child dd').textContent=isEnergy?'05':'60';hero.querySelector('.hero-stats>div:first-child dt').textContent=isEnergy?'вкусов':'позиций';
 hero.querySelector('.hero-stats>div:last-child dd').textContent=isEnergy?'0,45':'04';hero.querySelector('.hero-stats>div:last-child dt').textContent=isEnergy?'литра':'формата';
 hero.querySelector('.brand-line').innerHTML=isEnergy?'<span>MILANO ENERGY DRINK</span><span class="brand-line-note">СОСТАВ И ХАРАКТЕРИСТИКИ</span>':tobaccoHero.brands;
 document.querySelector('.tobacco-warning').hidden=isEnergy;document.querySelector('.energy-warning').hidden=!isEnergy;
 document.querySelector('.wordmark').href='#'+section;document.querySelector('.back-top').href='#'+section;document.querySelector('.header-meta>a').href=isEnergy?'#energy-list':'#catalog';
 document.querySelector('.skip').href=isEnergy?'#energy-list':'#catalog';
 document.title=isEnergy?'GALAXY — энергетические напитки MILANO':'GALAXY — каталог характеристик 2026';
 if(!isEnergy&&['super-slims','king-size','nano','compact'].includes(hash))reset();
 if(isEnergy&&hash.startsWith('energy-')&&hash!=='energy-list')resetEnergy();
 if(scroll){requestAnimationFrame(()=>{const target=(hash==='energy'||hash==='cigarettes')?document.querySelector('#top'):document.getElementById(hash);if(target)target.scrollIntoView({behavior:'instant',block:'start'});});}
}
window.addEventListener('hashchange',()=>renderSection(true));
document.querySelectorAll('[data-section-link],.wordmark,.back-top,.energy-nav a').forEach(link=>link.addEventListener('click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;if(location.hash===link.hash){event.preventDefault();renderSection(true);}}));
renderSection(!!location.hash);filterEnergy();
