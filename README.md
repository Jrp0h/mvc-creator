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

in the routes file it will have
*This is for API Routes*

```javascript

routes.get("/", PostsController.Index);
routes.get("/:id", PostsController.Show);
routes.store("/", PostsController.Store);

```

### Typescript

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

### Create Controller

```bash
mvc-creator controller new <name>
```
