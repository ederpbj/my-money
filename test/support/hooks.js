//Já no test/support/hooks.js temos códigos que serão executados antes e depois dos testes.
const { sequelize } = require('../../src/models');

/*   
  antes de cada teste   
  usamos sync para limpar as tabelas  
*/  
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

/*   
  depois da execução de todos os testes  
  fechamos a conexão com o banco  
*/  
after(() => {  
  sequelize.close();  
});