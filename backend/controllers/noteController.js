const createCrudController = require('./crudFactory');
const Note = require('../models/Note');

module.exports = createCrudController(Note, {
  fields: ['title', 'content', 'tags', 'pinned'],
  sort: { pinned: -1, updatedAt: -1 },
});
