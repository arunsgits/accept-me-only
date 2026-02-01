// js/params.js - forward `porposal-by` query parameter to internal links and expose getter
(function(){
  function getProposalName(){
    try{
      const p = new URLSearchParams(window.location.search).get('porposal-by');
      return p ? decodeURIComponent(p) : null;
    }catch(e){return null}
  }

  function appendParamToHref(href, name){
    if(!name) return href;
    try{
      const url = new URL(href, window.location.origin);
      // only append for same-origin html files
      if(url.origin !== window.location.origin) return href;
      if(!/\.html$/.test(url.pathname)) return href;
      const params = new URLSearchParams(url.search);
      params.set('porposal-by', name);
      url.search = params.toString();
      return url.pathname + (url.search? ('?'+url.search.replace(/^\?/,'') ) : '') + (url.hash||'');
    }catch(e){return href}
  }

  function forward(){
    const name = getProposalName();
    if(!name) return;
    // update all internal anchors
    document.querySelectorAll('a[href]').forEach(a=>{
      const href = a.getAttribute('href');
      if(!href) return;
      if(href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;
      // compute new href
      const newHref = appendParamToHref(href, name);
      a.setAttribute('href', newHref);
    });
  }

  // run on DOM ready
  document.addEventListener('DOMContentLoaded', forward);

  // expose getter
  window.__proposal = window.__proposal || {};
  window.__proposal.getName = getProposalName;
})();
