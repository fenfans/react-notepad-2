import * as Router from 'koa-router';
const uuidv1 = require('uuid/v1');

const router = new Router();

router.post('/sync', async (context, next) => {
  const updates = context.request.body || [];
  const Note = context.db.Note;
  const Op = context.db.Sequelize.Op;
  try {
    updates.forEach(async u => {
      const {tag} = u
      switch(tag) {
        case 'add':
          const existedRecord = await Note.findOne({
            where: {
              [Op.and]: {
                id: u.id,
              }
            }
          });
          if (existedRecord) {
           break;
          } else {
            const result = await Note.create({
              id: u.id,
              title: u.title,
              content: u.content || ''
            })
          }
          break;
        case 'update':
          const uNote = await context.db.Note.findByPk(u.id);
          const result = await uNote.update({
              title: u.title,
              content: u.content || ''
          });
          break;
        case 'delete':
          const dNote = await context.db.Note.findByPk(u.id);
          dNote.destroy();
          break;
        default:
          break
      }
    })
    context.response.body = JSON.stringify({message: 'ok'});
  } catch(e) {
    console.log(e);
    context.throw(500, '失败');  
  }
  await next();
});

router.post('/queryDetail', async (context, next) => {
  try {
    const params = context.request.body;
    const result = await context.db.Note.findByPk(params.id);
    context.response.body = JSON.stringify(result);
  } catch(e) {
    console.log(e);
    context.throw(500, '查询失败');  
  }
  await next();
});

router.post('/note', async (context, next) => {
  try {
    const result = await context.db.Note.findAndCountAll();
    context.response.body = JSON.stringify(result);
  } catch(e) {
    console.log(e);
    context.throw(500, '查询失败');  
  }
  await next();
});

router.post('/queryDetail', async (context, next) => {
  try {
    const params = context.request.body;
    const result = await context.db.Note.findByPk(params.id);
    context.response.body = JSON.stringify(result);
  } catch(e) {
    console.log(e);
    context.throw(500, '查询失败');  
  }
  await next();
});

router.post('/addNote', async (context, next) => {
  const params = context.request.body;
  const Note = context.db.Note;
  const Op = context.db.Sequelize.Op;

  
  const existedRecord = await Note.findOne({
    where: {
      [Op.and]: {
        id: params.id,
      }
    }
  });
  if (existedRecord) {
    context.throw(400, "error");
  } else {
    const result = await Note.create({
      id: uuidv1(),
      title: params.title,
      content: params.content || ''
    })
    
    context.response.body = JSON.stringify(result);

    await next();
  }
});

// 修改note
router.post('/updateNote', async (context, next) => {
    const params = context.request.body;
    try {
      const note = await context.db.Note.findByPk(params.id);
      const result = await note.update({
          // id: params.id,
          title: params.title,
          content: params.content || ''
      });
      context.response.body = result;
    } catch(e) {
      context.throw(400, '数据查找异常')
    }

    await next();

})

// 删除
router.del('/deleteNote/:id', async (context, next) => {
  const note = await context.db.Note.findByPk(context.params.id);
  note.destroy();
  context.response.body = JSON.stringify({});
  await next();
});

export default router;