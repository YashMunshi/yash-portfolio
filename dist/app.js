'use strict';
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];
const menu = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); mobileNav.hidden = !open;});
$$('a', mobileNav).forEach(a => a.addEventListener('click', () => { mobileNav.hidden = true; menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label','Open navigation'); }));
document.addEventListener('keydown', e => {if(e.key === 'Escape' && !mobileNav.hidden){mobileNav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.focus();}});
const profiles = {security:'At ACL Digital, I implemented authentication, entity-scoped access, and defense-in-depth controls for Forge.',systems:'I build in Python, Java, TypeScript, and C/C++. My systems work includes file synchronization and Linux kernel projects.',education:'B.S. Computer Science (Cybersecurity), Arizona State University. GPA: 3.91 / 4.0. Expected graduation: May 2027.'};
$$('[data-profile]').forEach(b => b.addEventListener('click', () => {$('#console-output').textContent = profiles[b.dataset.profile];$$('[data-profile]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
$$('[data-filter]').forEach(b => b.addEventListener('click', () => {const category = b.dataset.filter;$$('[data-filter]').forEach(x => {x.classList.toggle('active',x===b);x.setAttribute('aria-pressed', String(x===b));});let count=0;$$('.project').forEach(card => {card.hidden = category !== 'all' && card.dataset.category !== category;if(!card.hidden)count++;});$('#project-count').textContent = `${count} ${count===1?'project':'projects'}`;}));
const dialog=$('#command-dialog'), search=$('#command-search');
function openCommand(){search.value='';filterCommands();dialog.showModal();search.focus();}
function filterCommands(){const q=search.value.trim().toLowerCase();let count=0;$$('.command-links a').forEach(a=>{a.hidden=!a.textContent.toLowerCase().includes(q);if(!a.hidden)count++;});$('#command-empty').hidden=count>0;}
$('.command-trigger').addEventListener('click',openCommand);
$('#close-command').addEventListener('click',()=>dialog.close());
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dialog.open?dialog.close():openCommand();}});
search.addEventListener('input',filterCommands);
search.addEventListener('keydown',e=>{if(e.key==='Enter'){const a=$$('.command-links a').find(a=>!a.hidden);if(a){e.preventDefault();a.click();}}});
$$('.command-links a').forEach(a=>a.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('yashmunshi2@gmail.com');$('#copy-status').textContent='Email copied';}catch{$('#copy-status').textContent='Select the email address above to copy it.';}});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){$$('header nav a').forEach(a=>{if(a.hash===`#${entry.target.id}`)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}}},{rootMargin:'-15% 0px -55% 0px'});$$('main section[id], #experience').forEach(section=>observer.observe(section));}
let installPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#install-app').hidden=false;});
$('#install-app').addEventListener('click',async()=>{if(installPrompt){await installPrompt.prompt();installPrompt=null;$('#install-app').hidden=true;}});
window.addEventListener('appinstalled',()=>{$('#install-app').hidden=true;installPrompt=null;});
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});});}
