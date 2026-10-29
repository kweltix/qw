'use strict';
const search=document.querySelector('#search');
const clear=document.querySelector('#clear');
const cards=[...document.querySelectorAll('.product')];
const sections=[...document.querySelectorAll('.format')];
document.querySelector('.search').hidden=false;
function filter(){
 const terms=search.value.trim().toLocaleLowerCase('ru').split(/\s+/).filter(Boolean);
 let count=0;
 for(const card of cards){card.hidden=!terms.every(term=>card.dataset.search.includes(term));if(!card.hidden)count++;}
 for(const section of sections){const n=[...section.querySelectorAll('.product')].filter(x=>!x.hidden).length;section.hidden=n===0;section.querySelector('.section-heading>span').textContent=n+' позиций';}
 document.querySelector('#results').textContent=terms.length?'Найдено позиций: '+count+' из '+cards.length:'';
 document.querySelector('#empty').hidden=count!==0;
 clear.hidden=!search.value;
}
search.addEventListener('input',filter);
clear.addEventListener('click',()=>{search.value='';filter();search.focus();});
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{if(search.value){search.value='';filter();}}));
