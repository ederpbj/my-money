const path = require('path');  
const express = require('express');

const app = express();

// static files  
app.use(express.static('public'));

// start server  
app.listen(process.env.PORT || 5000);

const { Broker, Investment, Transaction, BalanceUpdate } = require('./models');

const test = async () => {
  // create broker
  const broker = await Broker.create({ name: 'Fooinvest' });
  // create investment
  const investment = await Investment.create({
    name: 'Tesouro Foo',
    BrokerId: broker.get('id')
  });
  // create transaction
  await Transaction.create({
    amount: 500,
    date: '2018-03-10',
    InvestmentId: investment.get('id')
  });
  // create balance update
  await BalanceUpdate.create({
    amount: 501,
    date: '2018-03-12',
    InvestmentId: investment.get('id')
  });
  // select all
  const brokerWithDetails = await Broker.findOne({
    include: [
      {
        model: Investment,
        include: [{ model: Transaction }, { model: BalanceUpdate }]
      }
    ]
  });
  console.log(JSON.stringify(brokerWithDetails));
};

test();