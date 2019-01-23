const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' }
];

const timeout = 1000;

export const mockDataHandlerSuccess = function(value) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(items.filter(item => item.value.includes(value))),
      timeout
    );
  });
};

export const mockDataHandlerFail = function(value) {
  return new Promise(resolve, reject => {
    setTimeout(
      () =>
        reject({
          type: 'error',
          code: 1337,
          message: 'Something bad happened!'
        }),
      timeout
    );
  });
};
