
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// function uid() {
//   return Math.random().toString(36).slice(-10);   // andrew
// }

export default uid;