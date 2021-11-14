## Web Monorepo 
This application is a monrepo with a create-react-app client and express-mongo backend both using typescript.

### Sharing server + client code
Code is shared between server and client using `shared-client` and `shared-server` folders.
Yarn start or build from client/server will copy shared-client from client from server and vice versa. These copies are gitignored. 
The easiest way to include shared code after adding it is to run `yarn start`, `prestart` and `prebuild` scripts will copy the shared folder over.


### Run the app
From client/server run `yarn start`
`yarn build` to create minified production build.

### Architecture, Patterns, And Conventions

### Communication
Actions with a type ending in _FETCH** will be picked up by the communication reducer and recorded to communication/logs.