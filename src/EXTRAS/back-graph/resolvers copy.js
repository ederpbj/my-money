/* eslint-disable node/no-unsupported-features */
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();


 const listaBrockers = [
	{
		"id": "11",
		"name": "Toro",
		"created at": "2020-01-12",
		"updated at": "2020-01-12",
	},
	{
		"id": "12",
		"name": "XP",
		"created at": "2020-01-12",
		"updated at": "2020-01-12",
	},
]; 
 
const listaInvestments = [
	{
		"id": "21",
		"broker": "11",
		"name": "USIM5",
		"created at": "2020-01-12",
		"updated at": "2020-01-12",
	},
	{
		"id": "22",
		"broker": "12",
		"name": "CIEL3",
		"created at": "2020-01-12",
		"updated at": "2020-01-12",
	},
]; 

const resolvers = {

	//T1
	Query: {
		broker: function(root, args) {  
			var id = args.id;
			return listaBrockers.filter(broker => {
				return broker.id == id;
			})[0];
		},
		brokers: function() {
			return listaBrockers;
		},

		investment: function(root, args) {  
			var id = args.id;
			return listaInvestments.filter(investment => {
				return investment.id == id;
			})[0];
		},
		investments: function() {
			return listaInvestments;
		}
	},

	Mutation: {
		createBroker: function(root, args){
			const novoBrocker = args.data;
			novoBrocker.id = Date.now();
			
			listaBrockers.push(novoBrocker);

			pubsub.publish('broker_CREATED', {
				broker: {
					mutation: 'CREATED',
					node: novoBrocker,
					previousValues: null
			
				}
			});
			return novoBrocker;
		},
		deleteBrocker: function(root, args){
			const indice = listaBrockers.findIndex(brocker => brocker.id == args.where.id);
			if(indice >= 0){
				const brockerDeletado =  listaBrockers.splice(indice, 1)[0];
				pubsub.publish('brocker_DELETED', {
					brocker: {
						mutation: 'DELETED',
						node: null,
						previousValues: brockerDeletado
					}
				});
				return brockerDeletado;
			}
			return null;
		}
	},
	Subscription: {
		brocker: {
		  subscribe: (root, args) => {
			  const eventNames = args.where.mutation_in.map(eventName => `brocker_${eventName}`);
			  return pubsub.asyncIterator(eventNames);
		  }
		},
	},
	//T2
/* 	Query: {
		brokers: (obj, args) => Broker.all(args),
		broker: (obj, { id }) => Broker.findById(id),
		investments: (obj, args) => Investment.all(args),
		investment: (obj, { id }) => Investment.findById(id)
	  },
	  Investment: {
		broker: obj => Broker.findOne({ where: { id: obj.BrokerId } }),
		balanceUpdates: (obj, args) =>
		  BalanceUpdate.all({ where: { InvestmentId: obj.id }, ...args }),
		transactions: obj => Transaction.all({ where: { InvestmentId: obj.id } })
	  },
	  Broker: {
		investments: obj => Investment.findAll({ where: { BrokerId: obj.id } })
	  },
	  Date: String */
};

module.exports = resolvers;