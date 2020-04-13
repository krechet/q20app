# q20 - 20 Questions game

The app consists of a vue client and a websocket-based server app. 
The design is a single service providing static data along with websocket-based API at the same TCP-port.

install.sh is a deployer executing three steps to run the container:

```
docker build -t q20app .
docker create -it -p 8080:1339 --name q20app q20app
docker start q20app
```

When started, http://localhost:8080 is serving the game. Initially, the game is asking to think a word, which is to be typed in, and starting the game session.
When the session is started, another player can join it at http://<instance ip>:8080. To avoid playing a wrong role, the second player is expected to join the session either from another device or from an incognito window.

The guessing process server response is automated, so that there is no need to answer yes or no to obvious questions.

# Cleanup

For convenience, there is a cleanup script cleanup.sh removing game containers and images.


