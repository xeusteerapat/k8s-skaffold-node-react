##### Stage 1
FROM node:16.14.0 as node

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --no-optional 
COPY . .
RUN yarn build

##### Stage 2
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Run from project root
# docker build -t nginx-angular -f .docker/nginx.dockerfile .