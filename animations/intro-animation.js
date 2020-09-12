'use strict';
let isNormalIntroAnimation = true;
const rm_animation = document.querySelectorAll('.rm-animation');

rm_animation[0].addEventListener("animationend",() => {
   if(isNormalIntroAnimation){
      for (let i = 0; i < rm_animation.length; i++) {
         // console.log(rm_animation[i]);
         rm_animation[i].classList.remove('rm-animation');
      }
      isNormalIntroAnimation = false;
   }
});

let isOffenceIntroAnimation = true;
const offence_rm_animation = document.querySelector('.offence-rm-animation');
console.log(offence_rm_animation);

offence_rm_animation.addEventListener("animationend",() => {
   if(isOffenceIntroAnimation){
       console.log(offence_rm_animation);
      offence_rm_animation.classList.remove('offence-rm-animation');
      isOffenceIntroAnimation = false;
   }
});

let isDefenseIntroAnimation = true;
const defence_rm_animation = document.querySelector('.defence-rm-animation');
console.log(defence_rm_animation);

defence_rm_animation.addEventListener("animationend",() => {
   if(isDefenseIntroAnimation){
       console.log(defence_rm_animation);
      defence_rm_animation.classList.remove('defence-rm-animation');
      isDefenseIntroAnimation = false;
   }
});

let isResultIntroAnimation = true;
const result_rm_animation = document.querySelector('.result-rm-animation');
console.log(result_rm_animation);

result_rm_animation.addEventListener("animationend",() => {
   if(isResultIntroAnimation){
       console.log(result_rm_animation);
      result_rm_animation.classList.remove('result-rm-animation');
      isResultIntroAnimation = false;
   }
});
