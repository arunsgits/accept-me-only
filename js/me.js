// js/me.js - generate a shareable proposal link
(function(){
  const input = document.getElementById('nameInput');
  const gen = document.getElementById('genBtn');
  const share = document.getElementById('shareLink');
  const copy = document.getElementById('copyBtn');

  function makeLink(name){
    const safe = encodeURIComponent(name.trim());
    return 'index.html?porposal-by=' + safe;
  }

  function update(){
    const name = input.value.trim();
    if(!name){
      share.textContent = 'index.html?porposal-by=YourName';
      share.href = '#';
      share.classList.remove('yes');
      return;
    }
    const link = makeLink(name);
    share.textContent = link;
    share.href = link;
    share.classList.add('yes');
  }

  gen.addEventListener('click', function(){ update(); share.focus(); });
  input.addEventListener('input', update);

  copy.addEventListener('click', function(){
    const href = share.href;
    if(!href || href === '#' ) return;
    navigator.clipboard && navigator.clipboard.writeText(href).then(()=>{
      copy.textContent = 'Copied ✓';
      setTimeout(()=>copy.textContent = 'Copy',1200);
    }).catch(()=>{
      // fallback
      const tmp = document.createElement('textarea'); tmp.value = href; document.body.appendChild(tmp); tmp.select();
      try{ document.execCommand('copy'); copy.textContent = 'Copied ✓'; setTimeout(()=>copy.textContent = 'Copy',1200);}catch(e){}
      tmp.remove();
    });
  });

  // initialize sample
  update();
})();
