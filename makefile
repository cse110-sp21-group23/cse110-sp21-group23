fix_conflict:
	git fetch origin main:main
	git merge main

dev:
	cd source/frontend && npm run dev

test:
	cd source/frontend && npm run test

deploy_frontend:
	git push https://git.heroku.com/cse110-23-web.git HEAD:master

deploy_server:
	git push https://git.heroku.com/cse110-23-api.git HEAD:master
