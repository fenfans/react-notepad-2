export default async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.response.body = {
      message: error.message
    }
    if (Number.isInteger(error.status)) {
      ctx.status = error.status;
    }
  }
}