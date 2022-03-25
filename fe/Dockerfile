FROM node:14.19.1
COPY ./ ./
# RUN npm install
RUN npm install -g serve
RUN npm install -save react-scripts
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]