import GLC from '../GLComannder'

let r = 0;
const render = () => {
   GLC.clear(r, 0.0, 0.0, 1.0)
   r+=0.01
   window.requestAnimationFrame(render)
}


export default (id) => {
   const canvas = document.querySelector(`#${id}`)

   if(!canvas){
      return;
   }

   const gl = canvas.getContext('weblg');

   if(!gl){
      return
   }

   GLC.init(gl);

   window.requestAnimationFrame(render)
}