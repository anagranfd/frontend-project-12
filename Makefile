lint-frontend:
	make -C frontend lint

fix-frontend:
	make -C frontend fix

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend