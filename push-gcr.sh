docker build --platform amd64 . --target prod -t asia.gcr.io/run-app-341001/reactapp:latest -f docker/node/Dockerfile
docker push asia.gcr.io/run-app-341001/reactapp:latest