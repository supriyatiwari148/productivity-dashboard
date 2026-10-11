const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

/*
 * Generic CRUD controller so tasks, habits, goals and notes share one implementation.
 * Every query includes userId, so users only ever touch their own data.
 *   fields  - body fields a client is allowed to set
 *   prepare - optional hook to adjust a document before saving
 *   sort    - default sort order
 */
const createCrudController = (Model, { fields, prepare = () => {}, sort = { createdAt: -1 } }) => {
  const pickFields = (body) =>
    fields.reduce((data, field) => {
      if (body[field] !== undefined) data[field] = body[field];
      return data;
    }, {});

  const findOwned = async (req) => {
    const doc = await Model.findOne({ _id: req.params.id, userId: req.user._id });
    if (!doc) throw new AppError('Item not found', 404);
    return doc;
  };

  return {
    getAll: asyncHandler(async (req, res) => {
      res.json(await Model.find({ userId: req.user._id }).sort(sort));
    }),

    create: asyncHandler(async (req, res) => {
      const doc = new Model({ ...pickFields(req.body), userId: req.user._id });
      prepare(doc);
      await doc.save();
      res.status(201).json(doc);
    }),

    update: asyncHandler(async (req, res) => {
      const doc = await findOwned(req);
      doc.set(pickFields(req.body));
      prepare(doc);
      await doc.save(); // save() runs the schema validators
      res.json(doc);
    }),

    remove: asyncHandler(async (req, res) => {
      const doc = await findOwned(req);
      await doc.deleteOne();
      res.json({ message: 'Deleted successfully' });
    }),

    findOwned,
  };
};

module.exports = createCrudController;
