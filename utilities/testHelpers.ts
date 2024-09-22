import type { JSX } from "preact";
import { renderToString } from "preact-render-to-string";

const renderComponent = (component: JSX.Element): string =>
  renderToString(component);

const renderRoute = async (routeModule: any, ctxAdd?: any) => {
  const { default: page, handler } = routeModule;
  let req;
  let res;
  const ctx = {
    render: (response: string) => {
      res = response;
    },
  };
  await handler.GET(req, {
    ...ctx,
    ...ctxAdd,
  });

  return renderComponent(page({ data: res || {} }));
};

export const render = async (input: any, ...rest: any[]) => {
  if (typeof input.handler !== "undefined") {
    return await renderRoute(...[input, ...rest]);
  } else {
    return renderComponent(input);
  }
};
