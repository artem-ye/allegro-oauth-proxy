run:
	docker run --user mongodb --rm -p 27017:27017 -v /Users/ay/dev/node.experements/mongo/db_data:/data/ mongodb/mongodb-community-server:6.0.11-ubuntu2204

run_daemon:
	docker run --rm -d --name mongodb -p 27017:27017 -v /Users/ay/dev/node.experements/mongo/db_data:/data/ mongodb/mongodb-community-server:6.0.11-ubuntu2204
