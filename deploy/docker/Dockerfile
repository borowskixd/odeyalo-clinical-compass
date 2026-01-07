FROM public.ecr.aws/docker/library/node:24.12.0-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN addgroup -S app && adduser -S app -G app

RUN chown -R app:app /app/.next

USER app
