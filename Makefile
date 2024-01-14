run_mongo:
	docker run --rm -d --name mongodb -p 27027:27017 -v $(pwd)/db_data:/data/ mongodb/mongodb-community-server:latest

build_image:
	docker build -t oauth-proxy .

start: 
	docker-compose up -d

start: 
	docker-compose up -d --build



	
	 
