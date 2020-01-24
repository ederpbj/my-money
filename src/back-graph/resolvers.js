/* eslint-disable node/no-unsupported-features */
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const listaBrokers = [
  {
    id: '11',
    name: 'Toro'
  },
  {
    id: '12',
    name: 'XP'
  }
];

const listaInvestments = [
  {
    id: '21',
    name: 'CAML3'
  },
  {
    id: '22',
    name: 'CIA3'
  }
];

const resolvers = {
  //T1
  Query: {
    broker: function(root, args) {
      var id = args.id;
      return listaBrokers.filter(broker => {
        return broker.id == id;
      })[0];
    },
    brokers: function() {
      return listaBrokers;
    },
	
	investment: function(root, args) {
      var id = args.id;
      return listaInvestments.filter(investment => {
        return investment.id == id;
      })[0];
    },
    investments: function() {
      return listaInvestments;
    },
  },

  Mutation: {
	  //Broker
    createBroker: function(root, args) {
      const novoBroker = args.data;
      novoBroker.id = Date.now();

      listaBrokers.push(novoBroker);

      pubsub.publish('broker_CREATED', {
        broker: {
          mutation: 'CREATED',
          node: novoBroker,
          previousValues: null
        }
      });
      return novoBroker;
	},

	//investment
    createInvestment: function(root, args) {
      const novoInvestment = args.data;
      novoInvestment.id = Date.now();

      listaInvestments.push(novoInvestment);

      pubsub.publish('investment_CREATED', {
        investment: {
          mutation: 'CREATED',
          node: novoInvestment,
          previousValues: null
        }
      });
      return novoInvestment;
	},
	
	//Broker
    deleteBroker: function(root, args) {
      const indice = listaBrokers.findIndex(
        broker => broker.id == args.where.id
      );
      if (indice >= 0) {
        const brokerDeletado = listaBrokers.splice(indice, 1)[0];
        pubsub.publish('broker_DELETED', {
          broker: {
            mutation: 'DELETED',
            node: null,
            previousValues: brokerDeletado
          }
        });
        return brokerDeletado;
      }
      return null;
	},

	//Investment
    deleteInvestment: function(root, args) {
      const indice = listaInvestments.findIndex(
        investment => investment.id == args.where.id
      );
      if (indice >= 0) {
        const investmentDeletado = listaInvestments.splice(indice, 1)[0];
        pubsub.publish('investment_DELETED', {
			investment: {
            mutation: 'DELETED',
            node: null,
            previousValues: investmentDeletado
          }
        });
        return investmentDeletado;
      }
      return null;
	}
	

  },
  Subscription: {
	  //Broker
    broker: {
      subscribe: (root, args) => {
        const eventNames = args.where.mutation_in.map(
          eventName => `broker_${eventName}`
        );
        return pubsub.asyncIterator(eventNames);
      }
	},

	//investment
    investment: {
      subscribe: (root, args) => {
        const eventNames = args.where.mutation_in.map(
          eventName => `investment_${eventName}`
        );
        return pubsub.asyncIterator(eventNames);
      }
	},
	
  }
};

module.exports = resolvers;
