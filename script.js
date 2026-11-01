const menu=document.querySelector('.menu');
const drawer=document.querySelector('#mobile-drawer');
const backdrop=document.querySelector('#drawer-backdrop');
const closeButton=document.querySelector('.drawer-close');
const search=document.querySelector('#drawer-search');
const groups=[...document.querySelectorAll('.drawer-group')];
let previousFocus=null;
function closeMenu(){
 if(!drawer?.classList.contains('is-open'))return;
 drawer.classList.remove('is-open');drawer.setAttribute('aria-hidden','true');drawer.inert=true;
 backdrop.classList.remove('is-visible');backdrop.hidden=true;
 document.body.classList.remove('drawer-locked');
 menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Открыть меню');
 previousFocus?.focus();
}
function openMenu(){
 if(!drawer||!backdrop)return;
 previousFocus=document.activeElement;
 drawer.inert=false;drawer.setAttribute('aria-hidden','false');drawer.classList.add('is-open');
 backdrop.hidden=false;requestAnimationFrame(()=>backdrop.classList.add('is-visible'));
 document.body.classList.add('drawer-locked');
 menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','Закрыть меню');
 closeButton?.focus();
}
menu?.addEventListener('click',()=>drawer?.classList.contains('is-open')?closeMenu():openMenu());
closeButton?.addEventListener('click',closeMenu);
backdrop?.addEventListener('click',closeMenu);
drawer?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{
 if(!drawer?.classList.contains('is-open'))return;
 if(e.key==='Escape'){e.preventDefault();closeMenu();return}
 if(e.key==='Tab'){
  const focusables=[...drawer.querySelectorAll('button:not([disabled]),input:not([disabled]),summary,a[href]')].filter(el=>el.getClientRects().length);
  if(!focusables.length)return;
  const first=focusables[0],last=focusables[focusables.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }
});
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu()});
document.querySelectorAll('.avatar img').forEach(img=>{img.addEventListener('error',()=>{if(!img.dataset.triedOriginal){img.dataset.triedOriginal='1';img.src=img.dataset.original}else{img.classList.add('is-broken')}});if(img.complete&&img.naturalWidth===0){img.dispatchEvent(new Event('error'))}});

