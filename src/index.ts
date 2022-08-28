import moment from 'moment';
import { MyLibrary } from './lib/MyLibrary';

import { title, func1 } from './lib/test';
import './style.scss';

/**
 * phải import thì FileLoader mới làm việc
 * FileLoader sẽ ko add file vào webpack, mà lúc build nó sẽ đổi tên và add vào folder “/dist”.
 * file này đc javaScript load ajax ở runtime, chứ ko phải insert vào *.html
 */
// @ts-ignore
import image from './image.jpg';

console.log('See this in your browser console: Typescript Webpack Starter Launched');

//========================  test import TypeScript file
const myLibrary = new MyLibrary();
const result = myLibrary.executeDependency();

console.log(`A random number ${result} `);

//===================== test import JavaScript file =============
console.log(title);
console.log(func1());

//================= test import TypeScript from node_module =================
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

//================== Dynamic Load lib at run time with Webpack ===========
const getUserModule = () => import('./lib/usersAPI');

const btn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btn');
btn.addEventListener('click', () => {
  // load lib is a Promise (= asynchronous)
  getUserModule().then(({ getUsers }) => {
    console.log(getUsers());
  });
});

//================== webpack File-loader ===========================
const divImage = <HTMLDivElement>document.getElementById('div-image');

const myImage = new Image();
myImage.src = image;

divImage.appendChild(myImage);
