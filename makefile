fix_conflict:
	git fetch origin main:main
	git merge main

deploy_frontend:
	git push https://git.heroku.com/cse110-23-web.git HEAD:master

deploy_server:
	git push https://git.heroku.com/cse110-23-api.git HEAD:master