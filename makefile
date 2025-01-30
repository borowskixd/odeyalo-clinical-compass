lint:
	docker compose -f ./deploy/docker/docker-compose.yml run --rm frontend npm run lint

build:
	docker compose -f ./deploy/docker/docker-compose.yml run --rm frontend npm run build

start:
	OPERATION=deploy docker compose -f ./deploy/docker/docker-compose.yml -p odeyalo up -d --build
