## Use Followig steps to use visual-connect project.

- Load visual-connect.tar to your local docker image repository using following command
```shell
$ docker load -i visual-connect.tar 
```

- Add following service definition to docker-compose.yml
```yaml
visual-connect:
  container_name: visual-connect
  image: dursunkoc/visual-connect
  ports:
    - 3300:80
```

- Run newly added docker-compose ```visual-connect``` service using following command

```shell
docker-compose up --no-deps --no-build --detach visual-connect
```

- Whenever you want to stop a running service use the following command.

```shell
docker-compose stop [service-name here]
```

- Whenever you want to start an existing service use the following command.

```shell
docker-compose start [service-name here]
```
