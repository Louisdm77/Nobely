const button=document.querySelector('.menu-toggle');
const links=document.querySelector('.navlinks');
button?.addEventListener('click',()=>{const open=links.classList.toggle('open');button.setAttribute('aria-expanded',String(open));button.textContent=open?'✕':'☰';document.body.classList.toggle('menu-open',open)});
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{links?.classList.remove('open');document.body.classList.remove('menu-open');button?.setAttribute('aria-expanded','false')}));
if('IntersectionObserver' in window){const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.09});document.querySelectorAll('.reveal').forEach(e=>obs.observe(e))}else document.querySelectorAll('.reveal').forEach(e=>e.classList.add('visible'));

// Forms submit directly to FormSubmit from static Vercel hosting.
// Check attachment sizes before redirecting to the form provider.
document.querySelectorAll('form[data-contact]').forEach(form=>{
 form.addEventListener('submit',ev=>{
  const file=form.querySelector('input[type="file"]')?.files?.[0];
  if(file && file.size>5*1024*1024){
   ev.preventDefault();alert('Please upload a resume smaller than 5 MB.');return;
  }
  const submit=form.querySelector('button[type="submit"]');
  if(submit){submit.disabled=true;submit.textContent='Sending…';}
 });
});
