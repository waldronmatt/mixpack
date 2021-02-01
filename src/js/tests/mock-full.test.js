import { BasicMath } from './BasicMath';
import { ComplexMath } from './ComplexMath';

jest.mock('./BasicMath'); // mock full class

describe('ComplexMath:class full mock', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    BasicMath.mockClear();
  });

  // implementation detail test
  test('should check the constructor has been called', () => {
    // eslint-disable-next-line no-new
    new ComplexMath();

    expect(BasicMath).toBeCalledTimes(1);
  });

  test('check that sum is called but no implementation is done', () => {
    const complexMath = new ComplexMath();

    const result = complexMath.avg(4, 2);

    // get the mocked instance
    const mockInstance = BasicMath.mock.instances[0];

    expect(mockInstance.sum).toBeCalledWith(4, 2);

    // because sum is mocked but not implemented
    expect(result).toBe(NaN);
  });

  test('check that sum is called and sum returns a value', () => {
    const complexMath = new ComplexMath();

    // get the mocked instance
    const mockInstance = BasicMath.mock.instances[0];

    mockInstance.sum.mockImplementation(() => 8);

    const result = complexMath.avg(4, 2);

    expect(mockInstance.sum).toBeCalledWith(4, 2);

    expect(result).toBe(4);
  });
});
