FROM public.ecr.aws/docker/library/node:20.5.1-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN addgroup -S app && adduser -S app -G app

RUN chown -R app:app /app/.next

USER app
