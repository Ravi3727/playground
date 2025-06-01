FROM node:20-slim as build

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_BACKENDURL

ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_BACKENDURL=$VITE_BACKENDURL

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
