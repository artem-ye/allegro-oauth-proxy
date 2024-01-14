run_mongo:
	docker run --rm -d --name mongodb -p 27027:27017 -v oauth-db-vol:/data/ mongodb/mongodb-community-server:latest

build_image:
	docker build -t oauth-proxy .

start: 
	docker-compose up -d

start: 
	docker-compose up -d --build



	
	 
