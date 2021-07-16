// import $ from 'jquery'
// import { Modal } from 'bootstrap'

// module.exports 是 ES6 出現以前的模組化開發方式
var obj = require('./Obj.js') // 引入方式
console.log(obj);
obj('Obj.js: mike');

// export default 是 ES6 出現以後的模組化開發方式
import item from './Item.js' // 引入方式
console.log(item.fun);



// let modalButton = document.getElementById('modalButton');
// let exampleModal = new Modal(document.getElementById('exampleModal'));

// window.onload = function () {
//   const url = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
//   axios.get(url).then(response => {
//     console.log(response);
//   })
// }

// modalButton.addEventListener('click', function () {
//   exampleModal.show();
// })