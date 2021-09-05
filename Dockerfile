FROM alpine:latest as builder
ENV NODE_ENV=production

RUN apk add --no-cache nodejs npm
ADD package.json .
ADD src/ src/
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --production

FROM alpine:latest as runner
ENV NODE_ENV=production

RUN apk add --no-cache nodejs
ADD package.json .
COPY --from=builder . .

CMD [ "node", "src/index.mjs" ]
