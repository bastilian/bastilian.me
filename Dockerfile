FROM denoland/deno:latest as base

WORKDIR /app
COPY . ./
RUN rm -f deno.lock
RUN deno cache main.ts

CMD ["task", "serve"]

EXPOSE 8000
