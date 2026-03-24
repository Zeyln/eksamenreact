# CryptoDash

### Welcome to CryptoDash!

**CryptoDash** is a real-time cryptocurrency dashboard that displays live price updates using the [Binance](https://www.binance.com/en) WebSocket.

Tested on Linux and macOS only.<br>
### With docker:
#### first, clone the repository <br>
```bash
# HTTPS clone
git clone https://github.com/Zeyln/eksamenreact.git

# SSH clone
git clone git@github.com:Zeyln/eksamenreact.git
```

#### then install dependencies: <br>
[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) <br>
[docker](https://www.docker.com/products/docker-desktop/) <br>
[nginx](https://www.npmjs.com/package/nginx) <br>


#### Navigate to project directory and build the docker image: <br>
```bash
# Replace "<image-name>" with the name of your image
docker build -t <image-name> .
```

#### Run the container <br>
```bash
# Replace "<image-name>" with the name of your container
docker run -p 8080:80 <image-name>
```
### Usage
Once running, open http://localhost:8080 in your browser

### Important notes:
The **CryptoDash** application utilizes a WebSocket to maintain a real-time and quick datastream. <br>
A delayed connection may affect the accuracy of this application negatively.

### Data Usage
[Privacy-Policy](privacy-policy.md)
