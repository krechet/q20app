FROM mhart/alpine-node:12
WORKDIR /app
COPY ./ /app
EXPOSE 1339
RUN npm i
RUN npm run build
CMD npm run app
