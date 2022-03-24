FROM node:14.15.4
RUN npm install -g serve
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]