const getHello = (): string => {
  return 'hello';
};

const showHello = (hello: string): boolean => {
  console.log(hello);
  return true;
};

export { getHello, showHello };

function myFunction() {
  showHello(getHello());
}
