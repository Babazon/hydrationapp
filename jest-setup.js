
require('reflect-metadata');
require('react-native');
require('jest-enzyme');

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');


Enzyme.configure({adapter: new Adapter()});
