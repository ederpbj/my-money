const { collection } = require('forest-express-sequelize');
collection('Investments', {
  actions: [],
  fields: [
    {  
      field: 'fullName',  
      type: 'String',  
      get(object) {  
        return `${object.name} (${object.Broker.name})`;  
      }  
    } 
  ],
  segments: [],
});

//Original:
// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments

/* const { collection } = require('forest-express-sequelize');
collection('Investments', {
  actions: [],
  fields: [],
  segments: [],
});
 */

 /* 
const ForestAdmin = require('forest-express-sequelize');

ForestAdmin.collection('Investment', {  
  actions: [],
  fields: [  
    {  
      field: 'fullName',  
      type: 'String',  
      get(object) {  
        return `${object.name} (${object.Broker.name})`;  
      }  
    }  
  ],  
  segments: [],
}); 
*/