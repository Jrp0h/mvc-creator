# mvc-creator

A quick and easy way to create Nodejs websites with MVC architecture.

## Project Structure

> Note: When going trough how it works we will use a Blog Application example.
> It will only be an API

The Websites entry point is main.ts
from there it adds all the routes to the app
which it gets from either API.ts or WEB.ts in the Routes directory
Inside the API.ts/WEB.ts it imports all routes from Routes/api or Routes/web
depending on if it's a web or api controller.

in the routes file it will have:

```javascript
routes.get("/", PostsController.Index);
routes.post("/", PostsController.Store);

routes.get("/:id", PostsController.Show);
routes.put("/:id", PostsController.Update);
routes.patch("/:id", PostsController.Update);
routes.delete("/:id", PostsController.Destroy);
```

### Folder Structure - TypeScript

```bash
.
├── src
│   ├── Controllers
│   │   └── PostsController.ts
│   ├── Models
│   │   └── Post.ts
│   ├── Routes
│   │   ├── API.ts
│   │   └── api
│   │       └── PostRoutes.ts
│   ├── Utils
│   │   ├── ErrorHandeling.ts
│   │   └── Str.ts
│   └── main.ts
├── package.json
└── tsconfig.json
```

## Usage

### Projects

Creating

```bash
mvc-creator create project <name>
```

### Controllers

Creating

```bash
mvc-creator create controller <name>
```

Flags:

* -e : --everything, Creates a Model, Controller and Routes
* -a : --api, Only creates API methods (Excluding: Edit and Create)

### Models

Creating

```bash
mvc-creator create model <name>
```

### Middleware

Creating

```bash
mvc-creator create middleware <name>
```

### Utility

Creating

```bash
mvc-creator create util <name>
```

### .Env

Creating

```bash
mvc-creator create env
```

Generate App key

```bash
mvc-creator env key generate
```

View App Key

```bash
mvc-creator env key view
```

View Value

```bash
mvc-creator env get <key>
```

Set Value

```bash
mvc-creator env set <key> <value>
```

Remove Value

```bash
mvc-creator env remove <key>
```

Show entire file

```bash
mvc-creator env show
```

## TODO

* Make so any dotenv operation changes the .env.example file
* Split things into files to remove clutter and copy-code

