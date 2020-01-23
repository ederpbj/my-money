//No arquivo test/support/setup.js habilitamos a extensão chai-as-promised 
//para não precisarmos fazer em todos os testes.

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);