FROM node:14 as node
WORKDIR /app

COPY ./ /app/

RUN su node -c "npm install"
RUN "npm run-script build -- --prod"

FROM nginx:alpine
COPY --from=node /app/build/ /usr/share/nginx/html

EXPOSE 80
