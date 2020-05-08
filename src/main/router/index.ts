
import * as Router from 'koa-router';
import note from './note';

const router = new Router({});

[ note ].forEach((elem) => {
  elem.prefix('/api');
});

export default router.use(
  note.routes(),
);