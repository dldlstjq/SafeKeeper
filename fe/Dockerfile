FROM node:alpine
COPY ./ ./
RUN npm install -g serve
RUN ls -al
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]