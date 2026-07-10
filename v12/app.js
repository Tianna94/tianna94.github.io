(()=>{
'use strict';
const files=['01.txt','02.txt','03.txt','04.txt','05.txt','06.txt','07.txt'].map(x=>`./app-parts/${x}?v=1202`);
const enter=document.getElementById('enterTerminal');
let queued=false;
const queue=e=>{
 if(window.__ATLAS_V12_APP_READY)return;
 e.preventDefault();e.stopImmediatePropagation();queued=true;
 enter?.classList.add('loading');
 if(enter)enter.innerHTML='正在进入终端 <span>…</span>';
};
enter?.addEventListener('click',queue,true);
Promise.all(files.map(async src=>{const r=await fetch(src,{cache:'force-cache'});if(!r.ok)throw new Error(`${src} HTTP ${r.status}`);return r.text()}))
 .then(parts=>{
  const source=parts.join('');
  new Function(`${source}\n//# sourceURL=atlas-v12-app.js`)();
  window.__ATLAS_V12_APP_READY=true;
  enter?.removeEventListener('click',queue,true);
  enter?.classList.remove('loading');
  if(enter)enter.innerHTML='进入交易终端 <span>→</span>';
  if(queued)enter?.click();
 })
 .catch(error=>{
  console.error('ATLAS X V12 app load failed',error);
  enter?.classList.remove('loading');
  if(enter){enter.innerHTML='重新加载终端 <span>↻</span>';enter.onclick=()=>location.reload()}
  const note=document.querySelector('.presentation-note');
  if(note)note.innerHTML='终端模块加载失败，请检查网络后重新加载。欢迎封面仍可正常展示。';
 });
})();
