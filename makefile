fix_conflict:
	git fetch origin main:main
	git merge main

test_dev:
	cd source/frontend && npm run dev-test

test:
	cd source/frontend && npm run test
	
dep_ensure: 
	cd source/frontend && npm i 

deploy_frontend:
	git push https://git.heroku.com/cse110-23-web.git HEAD:master

deploy_server:
	git push https://git.heroku.com/cse110-23-api.git HEAD:master

