FROM node:10
WORKDIR /app
COPY ./ /app
EXPOSE 1339
RUN npm i
CMD npm run app
