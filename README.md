# CryptoDash

### Welcome to CryptoDash!

Applicable only to Unix, macOS, Linux systems.<br>
### With docker:
#### first, clone the repository <br>
```
https://github.com/Zeyln/eksamenreact.git
```

#### then install dependencies: <br>
``` npm ``` <br>
``` docker ``` <br>
``` nginx ``` <br>

I recommend you install Docker Desktop <a href="https://www.docker.com/products/docker-desktop/">Here</a>

#### Navigate to project directory and build the docker image: <br>
```
docker build -t <image-name> .
```

#### Run the container <br>
```
docker run -p 8080:80 <container-name>
```

### Important notes:
The **CryptoDash** application utilizes a WebSocket to maintain a real-time and quick datastream,<br> 
therefore it is required you have a strong internet connection while using this application.<br>
High ping may affect the accuracy of this application negatively.
