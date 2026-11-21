/* CLIENT SETUP: Replace the Messenger username with the property's Facebook Page username.
   Example: https://m.me/yourPageUsername
   Also replace placeholder photos, prices, policies and property details in index.html. */
const MESSENGER_URL = 'https://m.me/';
const header=document.getElementById('header');
const nav=document.getElementById('nav');
const menu=document.getElementById('menu-toggle');
function syncHeader(){header.classList.toggle('scrolled',window.scrollY>40)}
window.addEventListener('scroll',syncHeader,{passive:true});syncHeader();
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
document.getElementById('year').textContent=new Date().getFullYear();
const photos=[...document.querySelectorAll('.gallery-photo')];const box=document.getElementById('lightbox');const boxImage=document.getElementById('lightbox-image');let active=0;let previousFocus=null;
function showPhoto(i){active=(i+photos.length)%photos.length;const img=photos[active].querySelector('img');boxImage.src=img.src.replace(/w=\d+/, 'w=1800');boxImage.alt=img.alt;document.getElementById('lightbox-counter').textContent=`${String(active+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`}
function openPhoto(i){previousFocus=document.activeElement;showPhoto(i);box.hidden=false;document.body.style.overflow='hidden';document.getElementById('lightbox-close').focus()}
function closePhoto(){box.hidden=true;document.body.style.overflow='';previousFocus?.focus()}
photos.forEach((photo,i)=>photo.addEventListener('click',()=>openPhoto(i)));
document.getElementById('lightbox-close').addEventListener('click',closePhoto);
document.getElementById('lightbox-prev').addEventListener('click',()=>showPhoto(active-1));
document.getElementById('lightbox-next').addEventListener('click',()=>showPhoto(active+1));
box.addEventListener('click',e=>{if(e.target===box)closePhoto()});
document.addEventListener('keydown',e=>{if(box.hidden)return;if(e.key==='Escape')closePhoto();if(e.key==='ArrowRight')showPhoto(active+1);if(e.key==='ArrowLeft')showPhoto(active-1);if(e.key==='Tab'){const controls=[document.getElementById('lightbox-close'),document.getElementById('lightbox-prev'),document.getElementById('lightbox-next')];const idx=controls.indexOf(document.activeElement);if(e.shiftKey&&idx===0){e.preventDefault();controls[2].focus()}else if(!e.shiftKey&&idx===2){e.preventDefault();controls[0].focus()}}});
const checkin=document.getElementById('checkin'),checkout=document.getElementById('checkout'),error=document.getElementById('booking-error');
const today=new Date();const localToday=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;checkin.min=localToday;checkout.min=localToday;
checkin.addEventListener('change',()=>{if(checkin.value){const d=new Date(checkin.value+'T12:00:00');d.setDate(d.getDate()+1);const min=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;checkout.min=min;if(checkout.value<min)checkout.value=''}error.textContent=''});
function prettyDate(value){return new Date(value+'T12:00:00').toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'})}
document.getElementById('booking-form').addEventListener('submit',e=>{e.preventDefault();if(!checkin.value||!checkout.value||checkout.value<=checkin.value){error.textContent='Please choose a valid check-in and later check-out date.';return}error.textContent='';const name=document.getElementById('guest-name').value.trim();const guests=document.getElementById('guests').value;const msg=`Hello! I'd like to inquire about The Haven Staycation Suite.\n\nName: ${name}\nCheck-in: ${prettyDate(checkin.value)}\nCheck-out: ${prettyDate(checkout.value)}\nGuests: ${guests}\n\nCould you please confirm availability, total price, and booking requirements? Thank you!`;document.getElementById('booking-message').value=msg;document.getElementById('messenger-link').href=MESSENGER_URL;document.getElementById('booking-result').hidden=false;document.getElementById('copy-status').textContent='';document.getElementById('booking-result').scrollIntoView({behavior:'smooth',block:'nearest'})});
document.getElementById('copy-message').addEventListener('click',async()=>{const val=document.getElementById('booking-message').value;try{await navigator.clipboard.writeText(val);document.getElementById('copy-status').textContent='Copied! Paste your inquiry into Messenger.'}catch{const ta=document.getElementById('booking-message');ta.focus();ta.select();document.getElementById('copy-status').textContent='Select and copy the message, then paste it into Messenger.'}});
