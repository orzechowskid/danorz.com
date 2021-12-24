import express from 'express';

const router = express.Router({
  mergeParams: true
});

router.post(
  `/event`,
  async function recordEvent(req, res, next) {
    // const event = JSON.parse(Buffer.from(ctx.request.body.event, `base64`).toString());

    // ctx.body = {
    //   data: [ event ],
    //   metadata: {
    //     count: 1
    //   }
    // };
    // ctx.status = 201;

    // await next();
    res.status(201).end();
  }
);

export default router;
