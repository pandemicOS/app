import stackNavigator from './routingModule';

describe('routingModule', () => {
  // global.console.warn = () => { /** */ };
  it('should have the stack navigator', () => {
    expect(stackNavigator).toEqual(expect.any(Function));
  });
});
