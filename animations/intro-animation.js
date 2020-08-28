'use strict';
let flag = true;
const rm_animation = document.querySelectorAll('.rm-animation');

rm_animation[0].addEventListener("animationend",() => {
   if(flag){
      for (let i = 0; i < rm_animation.length; i++) {
         // console.log(rm_animation[i]);
         rm_animation[i].classList.remove('rm-animation');
      }
      flag = false;
   }
});

let flag_of = true;
const offence_rm_animation = document.querySelector('.offence-rm-animation');
console.log(offence_rm_animation);

offence_rm_animation.addEventListener("animationend",() => {
   if(flag_of){
       console.log(offence_rm_animation);
      offence_rm_animation.classList.remove('offence-rm-animation');
      flag_of = false;
   }
});

let flag_de = true;
const defence_rm_animation = document.querySelector('.defence-rm-animation');
console.log(defence_rm_animation);

defence_rm_animation.addEventListener("animationend",() => {
   if(flag_de){
       console.log(defence_rm_animation);
      defence_rm_animation.classList.remove('defence-rm-animation');
      flag_de = false;
   }
});

let flag_re = true;
const result_rm_animation = document.querySelector('.result-rm-animation');
console.log(result_rm_animation);

result_rm_animation.addEventListener("animationend",() => {
   if(flag_re){
       console.log(result_rm_animation);
      result_rm_animation.classList.remove('result-rm-animation');
      flag_re = false;
   }
});
