// import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'all.scss';
// import 'about.js';
// 若使用 Html-Webpack-Plugin-template 就不需要 import html
// import 'index.html';
// 部分語法ie不支援，babel/polyfill套件可以解決相容性的問題
import '@babel/polyfill';
import item from 'Item'
console.log(item);


// async await是較新的js語法，需有@babel/polyfill才能執行，會等到回傳結果再繼續執行程式碼
// window.onload = async function () {
//   let data;
//   console.log('async: 1');
//   const url = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
//   await axios.get(url).then(response => {
//     data = response.data
//     console.log(data);
//   })
//   console.log('async: 2');
// }
