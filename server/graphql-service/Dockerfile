
FROM node:18

EXPOSE 4001

COPY ./server/graphql-service .
COPY ./.env.* .

CMD node ./dist/index.js
