FROM node:alpine
COPY ./ ./
RUN npm install -g serve
COPY ./ ./
RUN ls -al
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]