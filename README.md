# macguider-backend

Serverless functions for [Macguider](https://macguider.io)

- Provides serverless executions for modest jobs:

  - Periodic scraping product status and price from e-commerce site

  - Periodic email notification of new deal information to user

  - Periodic end-to-end server health check

  - Alert for server infrastrucutre variation from aws sns event

## Execution Guides

### Environment Configuration

Configuration by environment variable should be done before running the app.

- At:
  - `env.prod.json` or `.env.dev.json` file
- About:
  - `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`: Database configurations
  - `MAIL_HOST`, `MAIL_PORT`, `MAIL_AUTH_USER`, `MAIL_AUTH_PASS`: SMTP server configurations
  - `SG_ID`, `SUBNET_ID`, `ACCOUNT_ID` : AWS resource configurations
  - `SLACK_WEBHOOK_URL`: Webhook URL for slack notification

#### Example configuration

```
{
  "DB_HOST": "localhost",
  "DB_PORT": 5432,
  "DB_USERNAME": "postgres",
  "DB_PASSWORD": "postgres",
  "DB_DATABASE": "postgres",
  "SLACK_WEBHOOK_URL": "https://hooks.slack.com/services/xxxxxxxxxxxxxxxxx",
  "SG_ID": "sg-xxxxxxxxxxxxxxxxx",
  "SUBNET_ID": "subnet-xxxxxxxxxxxxxxxxx",
  "ACCOUNT_ID": "xxxxxxxxxxxxxxxxx",
  "MAIL_HOST": "smtp.xxxxx.com",
  "MAIL_PORT": 587,
  "MAIL_AUTH_USER": "xxxxxxxxxxxxxxxxx",
  "MAIL_AUTH_PASS": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### Installation

```bash
$ npm install
```

### Execution

#### Local Serve

```bash
$ npm run offline
```

#### Production Deployment

```bash
$ npm run deploy
```

## Contribution Rules

### Commit Convention

```
type(scope): Subject

body

footer
```

#### Commit Type

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Changes to documentation
- `style`: Formatting, missing semi colons, etc; no code change
- `refactor`: Refactoring production code
- `test`: Adding tests, refactoring test; no production code change
- `chore`: Updating build tasks, package manager configs, etc; no production code change

If you think a new commit type is needed, you can contribute by changing `commitlint.config.js` and this paragraph.

### Branching Strategy

- `master`: branch to manage only stable states deployed to product
- `develop`: branch to integrate features to be deployed (development is mainly based on this branch)
- `feature`: branch to develop new features
- `hotfix`: branch to correct urgent issues

#### Branch Flows

- branch `feature` from `develop` -> develop features in `feature` -> pull request to `develop` -> approve and merge to `develop`
- `develop` become distributable -> merge `develop` to `master`, deploy `master` to product, add a version tag to `master`
- branch `hotfix` from `master` -> fix issues in `hotfix` -> pull request to `master` -> approve and merge to `master` and `develop`

#### Branch Naming Convention

`feature/swm-issue#`

ex) `feature/swm-123`
