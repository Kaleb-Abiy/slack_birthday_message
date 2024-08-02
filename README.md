# Slack Birthday Message with Directus

## Features
- Add User information using directus admin dashboard including birth date
- Cron job that runs everyday to send birthday message to users via slack

**NOTE** : This is done assuming the user is also present in slack channel


## Development Setup

Clone this repository and access the repository root directory:

```
git clone git@github.com/Kaleb-Abiy/slack_birthday_message && \
cd slack_birthday_message
```


```
touch .env && \
cp .env.example .env
```

Create local data folder for database:

```
mkdir data/database
```


Startup `postgresql` and `directus` services:

```
docker compose up -d
```

Ensure server is running with:
```
docker-compose logs --tail 10 directus
```

that should show something smilar to this:
```
directus-1  | [11:38:07.302] INFO: Adding first admin user...
directus-1  | [11:38:07.305] INFO: Done
directus-1  | [11:38:12.514] INFO: Loaded extensions: send_slack_message
directus-1  | [11:38:07.555] INFO: Server started at http://0.0.0.0:8055
```

Then migrate user model schema to directus(database)

```
docker compose cp data/schema.yml directus:/directus/ && \
docker compose exec directus npx directus schema apply -y schema.yml
```

- After applying the migration user model will be 

- Then go to directus admin at [http://localhost:8055](http://localhost:8055) using default user and password (configurable in `.env` file before first startup):

```
username: admin@example.com
password: d1r3ctu5

- Create new users with birth_date
```

- Then the directus extension will send birthday message to slack when registred user have birthday

---

### Setup slack App

- First creat slack app use this [link](https://api.slack.com/quickstart#creating) and follow the webhook guidline to get webhook url

- Add the webhook url to extensions `index.js` file `SLACK_WEBHOOK_URL` variable

- Re build the extension with `npm run build`

- Restart docker compose