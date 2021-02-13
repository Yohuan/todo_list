const { customRandom, random } = require('nanoid');

const _CHARACTER_SET = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customRandom(_CHARACTER_SET, 6, random);

module.exports = () => `todo_${nanoid()}`;
