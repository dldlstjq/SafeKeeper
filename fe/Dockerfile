FROM node:alpine
COPY ./ ./
RUN npm install -g serve

RUN npm install -save react-scripts
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]