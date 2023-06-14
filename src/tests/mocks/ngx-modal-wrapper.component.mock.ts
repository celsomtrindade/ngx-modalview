export const NgxModalWrapperComponentMock = () => ({
    clickOutsideCallback: null,
    addComponent: jest.fn(),
    onClickOutsideModalContent: jest.fn( ( contentClass: string | boolean, callback: () => void) => {
      this.clickOutsideCallback = callback;
    })
  });
