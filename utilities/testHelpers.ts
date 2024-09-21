import { renderToString } from "preact-render-to-string";

export const render = async (routeModule) => {
  const { default: page, handler } = routeModule;
  let req;
  let res;
  const ctx = {
    render: (response) => {
      res = response;
    },
  };
  await handler.GET(req, ctx);

  return renderToString(page({ data: res || {} }));
};
