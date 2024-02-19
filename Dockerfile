FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN npm update
RUN npm install
RUN npm run build --prod

FROM nginx as runtime
COPY --from=build /app/dist/my-site /usr/share/nginx/html
