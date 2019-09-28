### Notas del desarrollador
1- se debe cambiar el error 400 cuando al llenar un formulario los campos no son validos, ya que el 400 siendo general puede ocurrir porque los campos son invalidos, porque no hya coneccion a internet etc,
hay que hacer que los campos invalidos sean diferentes a 400.

2- la api visitantes /core/companies/{id_company}/visitors/ entrega todos los usuarios de la compañia y no de una sola sede.

3- En visitantes no se muestra de momento ni fecha de registro, persona quien lo registro y sede donde se registro.

4- el endpoint de visitantes y de items debe ser global y no pertenecer a una sola empresa o sede, es la unica manera sabida por el momento de consultar la data de usuarios e items desde cualquier compañia.

5- en el backend hay un borrado en cascada, al eliminar un usuario se eliminará los visistantes que haya registrado, items(confirmado), posiblemente tambien otros datos como compañias creadas, sedes etc..

6- en historial se debe organizar el formato de la fecha y la hora desde el backend ademas se debe agregar color

7- se debe limpiar el campo de error al desloguearse

8- el local storage del token y de la informacion del usuario es totalmente insegura
--------------------------------------------------------------------------------------------------
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
