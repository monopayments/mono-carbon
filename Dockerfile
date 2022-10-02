FROM node:12 as build
WORKDIR /app
COPY ./frontend/package-lock.json ./frontend/package.json ./
RUN npm install --legacy-peer-deps
COPY ./frontend .
RUN npm run build 

FROM nginx:1.19

COPY ./frontend/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html