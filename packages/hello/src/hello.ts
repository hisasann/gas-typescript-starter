const getHello = (): string => {
  return 'hello';
};
export default getHello;

export const showHello = (hello: string): boolean => {
  console.log(hello);
  return true;
};