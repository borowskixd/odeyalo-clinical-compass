lint:
	docker compose -f ./deploy/docker/docker-compose.yml run --rm frontend npm run lint

build:
	docker compose -f ./deploy/docker/docker-compose.yml run --rm frontend npm run build

deploy:
	OPERATION=deploy docker compose -f ./deploy/docker/docker-compose.yml -p odeyalo-frontend up -d --build
