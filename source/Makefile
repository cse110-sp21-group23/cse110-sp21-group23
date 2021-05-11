.PHONY: build_server run_server clean_server

build_server:
	sudo docker-compose up --build 

run_server:
	sudo docker-compose up server 

clean_server:
	sudo docker-compose down --v
	sudo docker-compose up server 

setup_docker:
	sudo apt-get update
	sudo apt-get install \ apt-transport-https \ ca-certificates \ curl \ gnupg \ lsb-release 
	sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
	sudo apt-get update
	echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	sudo apt-get install docker-ce docker-ce-cli containerd.io
	sudo docker run hello-world
	sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose
	docker-compose --version1000