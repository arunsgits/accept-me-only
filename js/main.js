// js/main.js - moving 'No' button logic for q3.html
(function(){
  function randomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min}

  function attachRunner(){
    const btn = document.getElementById('noBtn');
    const playground = document.getElementById('playground');
    if(!btn || !playground) return;

    // make the button absolutely positioned inside playground
    btn.classList.add('move');

    // keep track of attempts to make a little more playful
    let tries = 0;

    function moveButton(){
      const rect = playground.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      const maxLeft = Math.max(8, rect.width - btnRect.width - 8);
      const maxTop = Math.max(8, rect.height - btnRect.height - 8);

      const left = randomInt(8, Math.floor(maxLeft));
      const top = randomInt(8, Math.floor(maxTop));

      btn.style.left = left + 'px';
      btn.style.top = top + 'px';
      tries++;

      // playful nudge every few tries
      if(tries % 4 === 0){
        btn.classList.add('blocked');
        setTimeout(()=>btn.classList.remove('blocked'), 450);
      }
    }

    // place the No button to the right side of the Yes button by default
    function placeRightOfYes(){
      const rect = playground.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const yes = playground.querySelector('.btn.yes');
      if(yes){
        const yesRect = yes.getBoundingClientRect();
        let left = Math.floor(yesRect.right - rect.left + 8); // place just right of Yes
        const top = Math.floor(yesRect.top - rect.top + (yesRect.height - btnRect.height)/2);
        const maxLeft = Math.max(8, rect.width - btnRect.width - 8);
        if(left > maxLeft) left = maxLeft;
        btn.style.left = left + 'px';
        btn.style.top = Math.max(6, top) + 'px';
      } else {
        // fallback to center
        const left = Math.max(8, Math.floor((rect.width - btnRect.width)/2));
        const top = Math.max(8, Math.floor((rect.height - btnRect.height)/2));
        btn.style.left = left + 'px';
        btn.style.top = top + 'px';
      }
    }

    // move on hover/focus attempts (desktop)
    btn.addEventListener('mouseover', moveButton);
    btn.addEventListener('focus', moveButton);

    // On touch devices the user can tap; intercept pointer/touch down to move before click
    btn.addEventListener('pointerdown', function(e){
      // only intercept touch pointers or very narrow screens
      if(e.pointerType === 'touch' || window.innerWidth <= 600){
        e.preventDefault();
        moveButton();
      }
    });
    // fallback for older mobile browsers
    btn.addEventListener('touchstart', function(e){
      e.preventDefault();
      moveButton();
    }, {passive:false});

    // prevent clicking "No" (so they can't choose it)
    btn.addEventListener('click', function(e){
      e.preventDefault();
      btn.classList.add('blocked');
      setTimeout(()=>btn.classList.remove('blocked'), 450);
    });

    // initialize placed to the right of Yes, then allow chase on hover
    window.addEventListener('load', placeRightOfYes);
    window.addEventListener('resize', function(){
      // reposition on resize
      placeRightOfYes();
    });
  }

  document.addEventListener('DOMContentLoaded', attachRunner);
})();