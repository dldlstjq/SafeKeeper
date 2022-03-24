FROM node:14.15.4
WORKDIR /fe
RUN npm install
RUN npm install -g serve
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]