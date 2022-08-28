/**
 * Webpack sẽ ko compile các function và variable nếu ta ko config Entry là library
 * ----
 * các function và Variable muôn gọi từ bên ngoài phải export thì webpack với hỗ trợ build
 */
export var title2 = 'dụng chính đương đầu, dụng kỳ thắng thủ';
export var func2 = () => {
  return 'function pointer';
};
