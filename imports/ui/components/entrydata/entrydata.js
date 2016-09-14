import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Visitors } from '/imports/collections';
import { MeteorCamera } from 'meteor/mdg:camera';

import './entrydata.html';

Template.entryData.helpers({
  currentVisitor: () => {
    Visitors.findOne(Session.get('currentVisitor'));
  },
  newUser: () => typeof Session.get('currentVisitor') === 'boolean',
});



Template.entryData.events({
  'keyup #nome': (event) => {
    const visitor = Session.get('currentVisitor');
    if (!visitor) {
      Session.set('currentVisitor', Object.assign(visitor, { nome: event.target.value }));
    }
  },
  'keyup #documento': (event) => {
    const visitor = Session.get('currentVisitor');
    if (!visitor) {
      Session.set('currentVisitor', Object.assign(visitor, { nome: event.target.value }));
    }
  },
  'keyup #documento': (event) => {
    const visitor = Session.get('currentVisitor');
    if (visitor) {
      Session.set('currentvisitor', Object.assign(visitor, { nome: event.target.value }));
    }
  },
  'click #takePicture': (event) => {
    event.preventDefault();
    const visitor = Session.get('currentVisitor');
    
    MeteorCamera.getPicture((error, data) => Object.assign(visitor, { foto: data }));
  },
  'submit #entryDataForm': (event) => {
    event.preventDefault();

    Session.set('currentVisitor', null);
  },
});
