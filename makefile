up:
	docker compose -f ./deploy/docker/docker-compose.yml -p odeyalo-frontend up -d

build:
	docker compose -f ./deploy/docker/docker-compose.yml -p odeyalo-frontend build --no-cache
	make up

stop:
	docker compose -f ./deploy/docker/docker-compose.yml -p odeyalo-frontend stop nginx app
