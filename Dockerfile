# build stage
FROM node:12-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:12-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app/package*.json /app/
COPY --from=build-stage /app/node_modules/ /app/node_modules/
COPY --from=build-stage /app/dist/ /app/dist/

EXPOSE 8000
EXPOSE 1992

CMD ["npm", "run", "start:prod"]
