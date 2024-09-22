import { renderToString } from "preact-render-to-string";

const renderComponent = (component) => renderToString(component);

const renderRoute = async (routeModule, ctxAdd) => {
  const { default: page, handler } = routeModule;
  let req;
  let res;
  const ctx = {
    render: (response) => {
      res = response;
    },
  };
  await handler.GET(req, {
    ...ctx,
    ...ctxAdd,
  });

  return renderComponent(page({ data: res || {} }));
};

export const render = async (input, ...rest) => {
  if (typeof input.handler !== "undefined") {
    return await renderRoute(...[input, ...rest]);
  } else {
    return renderComponent(...[input, ...rest]);
  }
};
