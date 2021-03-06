FROM node:16.10-alpine AS build
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /opt/site
COPY nginx.conf /etc/nginx/nginx.conf