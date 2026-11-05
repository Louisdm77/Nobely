(() => {
 const jobs=window.NOBELY_JOBS||[];
 const get=id=>document.getElementById(id);
 const grid=get('job-results'); if(!grid)return;
 const search=get('job-query'),industry=get('job-industry'),location=get('job-location'),mode=get('job-mode'),level=get('job-level'),count=get('job-count'),reset=get('job-reset');
 function fill(sel,values){[...new Set(values)].sort().forEach(v=>{const opt=document.createElement('option');opt.value=v;opt.textContent=v;sel.append(opt)})}
 fill(industry,jobs.map(j=>j.industry));fill(location,jobs.map(j=>j.region));fill(level,jobs.map(j=>j.level));
 function el(tag,cls,content){const n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;return n}
 function render(){const q=search.value.toLowerCase().trim(),i=industry.value,l=location.value,m=mode.value,lev=level.value;const matches=jobs.filter(j=>(!q||[j.title,j.company,j.industry,j.location,j.summary].join(' ').toLowerCase().includes(q))&&(!i||j.industry===i)&&(!l||j.region===l)&&(!m||j.type===m)&&(!lev||j.level===lev));grid.replaceChildren();count.textContent=`${matches.length} opportunity${matches.length===1?'':'ies'} found · ${jobs.length} listings reviewed November 5, 2026`;
 if(!matches.length){grid.append(el('div','job-empty','No matching opportunities. Try a broader keyword or reset the filters.'));return}
 for(const job of matches){const card=el('article','job job-card reveal visible');const top=el('div','job-card-top');const symbol=el('div','job-monogram',job.company.slice(0,1));const comp=el('div');comp.append(el('div','job-company',job.company),el('div','job-source','External employer posting'));top.append(symbol,comp);card.append(top,el('h3','',job.title),el('p','job-description',job.summary));const meta=el('div','job-chips');[job.industry,job.location,job.type,job.level].forEach(t=>meta.append(el('span','tag',t)));card.append(meta);if(job.salary)card.append(el('p','job-salary',job.salary));const link=el('a','textlink','View official job posting ↗');link.href=job.url;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label',`View ${job.title} at ${job.company} on the employer website`);card.append(link);grid.append(card)}
 }
 for(const control of [search,industry,location,mode,level])control.addEventListener(control===search?'input':'change',render);
 reset.addEventListener('click',()=>{search.value='';industry.value='';location.value='';mode.value='';level.value='';render();search.focus()});render();
})();
