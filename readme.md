## Data storage application
Run 
1. Install npm packages
    `npm i`
2. Crete docker volume
    `docker volume create mongodbdata`
3. Run application locally
    `docker-compose -f app.docker-compose.yaml up -d`   

Stop the application
1. `docker-compose -f app.docker-compose.yaml down`     