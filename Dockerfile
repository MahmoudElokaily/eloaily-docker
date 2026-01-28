FROM node:25 as base



FROM base as development
WORKDIR /app
copy package.json .
ARG NODE_ENV
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm" , "run" , "start:dev"]

FROM base as production
WORKDIR /app
copy package.json .
ARG NODE_ENV
RUN npm install --omit=dev
COPY . .
EXPOSE 4000
CMD ["npm" , "start"]




