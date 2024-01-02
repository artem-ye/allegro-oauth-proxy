run:
	docker run --rm -p 27017:27017 -v  $(pwd)/db_data:/data/ mongodb/mongodb-community-server:latest

run_daemon:
	docker run --rm -d --name mongodb -p 27027:27017 -v /Users/ay/dev/git/redumbrella/allegro-auth-proxy/server/db_data:/data/ mongodb/mongodb-community-server:latest


	
	 
