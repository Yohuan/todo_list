const wrapAsListObject = require('./wrapAsListObject');
const { Object } = require('@server/constants/resource');

const _creatTestingArray = () => [
  {
    type: 'myObject',
  },
  {
    type: 'myObject',
  },
];

describe('wrapAsListObject', () => {
  it('should wrap input array as list object', () => {
    const array = _creatTestingArray();
    const listObject = wrapAsListObject(array);
    expect(listObject.object).toBe(Object.LIST);
  });

  it('should wrap input array into "data" attribute', () => {
    const array = _creatTestingArray();
    const listObject = wrapAsListObject(array);
    expect(listObject.data).toBe(array);
  });
});
