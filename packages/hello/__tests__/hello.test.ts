import getHello, { showHello } from "../src/hello";

test('hello - getHello', () => {
  const hello = getHello();
  expect(hello).toEqual('hello');
});

test('hello - getHello', () => {
  const isSucess: boolean = showHello('world');
  const hello = getHello();
  expect(isSucess).toEqual(true);
});
