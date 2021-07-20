## Variables

Discord webhook url for debug logs in production

## React Native Config in github actions

Base 64 encode the `.env` file:

```shell
base64 -i .env.production
```

Add the output to an env variable in github action.

```shell
echo ${{ secrets.ENV_SECRET }} | base64 -d > .env
```
