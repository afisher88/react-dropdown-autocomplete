const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' }
];

const timeout = 800;

export const mockDataHandlerSuccess = function(value) {
  const sanitisedVal = value.toLowerCase();

  console.info('Mock handler is running');
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(items.filter(item => item.value.includes(sanitisedVal))),
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
