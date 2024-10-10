# wrangler-secret

Bulk send Secret from .env files to the server with Cloudflare Workers / Pages

## usage

npm install -D wrangler-secret

```text
USAGE
        wrangler-secret [options] <env_path>
ARGUMENTS
        <path> Path to the env file
OPTIONS
        -c, --config <path> Path to the wrangler config file(Default is wrangler.toml)
        -e, --env <environment> Environment
```

## example

- .env.environment

```env
abc = "123"
def = "456"
```

Internal calls to wrangler are processed sequentially.

```sh
npm run wrangler-secret .env.environment
```
