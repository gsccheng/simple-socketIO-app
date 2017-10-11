# simple-socketIO-app

```
$ docker build . -t socket-test
$ docker run -p 8000:8000 -c 1024 -m 4096M --privileged --ulimit nofile=9000:9000 -it test-socket:latest /bin/sh
#> DEBUG=* npm start
```
In new window:
```
$ artillery run load-test.yaml
```