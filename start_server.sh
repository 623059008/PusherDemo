#slanger --app_key 7123026cc4270572d5f9 --secret 622dd75cfea01f55dc1c
sudo docker run -it --name slanger_server -e APP_KEY=7123026cc4270572d5f9 -e SECRET=622dd75cfea01f55dc1c -e REDIS_URL=127.0.0.1:6379 -d -p 8080:8080 -p 4567:4567 stankec/slanger:latest
