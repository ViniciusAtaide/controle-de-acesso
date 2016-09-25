/* eslint-disable object-shorthand, meteor/audit-argument-checks */

import { Meteor } from 'meteor/meteor';
import { Visitors, History } from '/imports/collections';

Meteor.methods({
  'visitors.insert'(visitor) {
    Visitors.insert(visitor);
  },
  'visitor.update'(id, gabinete, motivo) {
    const visitor = Visitors.findOne(id);
    const currentDate = new Date();

    Visitors.update(id, { $set: { noPredio: !visitor.noPredio } });

    History.insert({
      nome: visitor.nome,
      data: currentDate,
      motivo,
      gabinete,
      tipo: visitor.noPredio ? 'Saida' : 'Entrada',
    });
  },
});