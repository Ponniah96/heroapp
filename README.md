# heroapp
#Open 2 Npm command Prompt windows.

#In first window, run below commands. after maping it into exact file location.

git init

git clone https://github.com/Ponniah96/heroapp.git

npm init -y

npm i express ejs socket.io

npm i uuid

npm i @google-cloud/storage

npm i --save-dev nodemon

npm run devStart


#In second window, Run below commands.

npm i -g peer

peerjs --port 3001

