# MyClient API
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![NGINX](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)


## How to run
Clone the repository:
```
git clone https://github.com/cxavier6/myclient-api.git
```
The environment variables are located in the `.env` file.

The commands below need to be executed inside the root directory which is `myclient-api`.

In the root directory where the docker-compose file is run the command below to check/validate the syntax:
```
docker-compose config
```

To run the docker-compose and build the images:
```
docker-compose up -d --build
```

Check if the docker-compose is running with 3 containers:
```
docker-compose ls
```
**Application is running on `port 80` through NGINX reverse proxy**.

To access the mysql database you need to access it through the database container which is `myclient-database`:
```
docker exec -it myclient-database mysql -uusercamila -p
```
`After you execute the command above you'll need to insert the database password for the user. The password is the DB_PASSWORD variable.`

Some example sql commands to verify the database, the tables and its records created in this project (run one command at a time):
```
SHOW DATABASES;
USE clientds;
SHOW tables;
SELECT * FROM clients LIMIT 100;
```

## API Routes

#### Get all clients

```http
  GET /clients
```

#### Get a client by id

```http
  GET /clients/:id
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. The ID of the client. |

#### Create a client

```http
  POST /clients
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `first_name`      | `string` | **Required**. The first name of the client. |
| `last_name`      | `string` | **Required**. The last name of the client. |
| `email`      | `string` | **Required**. The email of the client. It has to be **unique**. |
| `phone`      | `number` | **Required**. The phone number of the client. |
| `address`      | `string` | **Required**. The address of the client. |

#### Update a client

```http
  PUT /clients
```

For the `PUT` method you need to insert all the parameters needed to create a client and change only the parameters you want to update.

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `first_name`      | `string` | **Required**. The first name of the client. |
| `last_name`      | `string` | **Required**. The last name of the client. |
| `email`      | `string` | **Required**. The email of the client. It has to be **unique**. |
| `phone`      | `number` | **Required**. The phone number of the client. |
| `address`      | `string` | **Required**. The address of the client. |

#### Delete a client

```http
  DELETE /clients/:id
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. The ID of the client you want to delete. |

#### Example output for a GET request at the route `/clients/:id`. 
![image](https://github.com/cxavier6/myclient-api/assets/79461028/219c2447-ddaa-419c-9cb6-7c2c7c30c7b0)


## Troubleshooting

If you're having trouble to run the application you can check the logs to see what's happening:
```
docker-compose logs
```
The output is going to give you logs for the 3 containers created in this application.

To check the logs of a specific container:
```
docker logs <container-name>
```

