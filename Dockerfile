FROM denoland/deno:2.2.3 as base

WORKDIR /app
COPY . ./

RUN deno task build

CMD ["run", "serve"]

EXPOSE 8000
