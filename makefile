prod:
	docker compose -f ./deploy/docker/docker-compose.yml -p odeyalo up -d --build
