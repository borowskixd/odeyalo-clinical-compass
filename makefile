lint:
  docker compose -f ./deploy/docker/docker-compose.yml run --rm -e OPERATION=lint frontend

build:
  docker compose -f ./deploy/docker/docker-compose.yml run --rm -e OPERATION=build frontend

deploy:
	docker compose -f ./deploy/docker/docker-compose.yml -p odeyalo-frontend up -d --build
