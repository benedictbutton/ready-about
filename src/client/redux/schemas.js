import { schema } from 'normalizr';

const todoSchema = new schema.Entity('todos', undefined, {
  idAttribute: '_id',
});

export { todoSchema };
