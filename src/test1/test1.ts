/**
 * Webpack sẽ ko compile các function và variable nếu ta ko config Entry là library
 * ----
 * các function và Variable muôn gọi từ bên ngoài phải export thì webpack với hỗ trợ build
 */
export const title1 = 'dụng chính đương đầu, dụng kỳ thắng thủ';

console.log('See this in your browser console: Typescript Webpack Starter Launched');

/**
 * nếu compile với webpack thì cần export thì ở bên ngoài mới gọi đc
 */
export let sayHi = () => {
  console.log('Hello');
  alert('dùng webpack Entry library + export ở *.js');
};
