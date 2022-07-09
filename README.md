## 05HeroesApp

# COMPONENTES A UTILIZAR

Angular Material: ```https://material.angular.io/```

Base de datos de heroes: ```https://gist.github.com/Klerith/403c91e61d3c87284beb0dd138619958```

JSON Server: ```https://www.npmjs.com/package/json-server```
El JSON Server permite crear un backend de forma rapida (Get a full fake REST API with zero coding in less than 30 seconds (seriously)

En el mismo aplicativo se encuentran comprimidos dos zips uno es el que contiene la base de datos y el otro
contiene los assets con los que se trabajaran en el proyecto:

```
assets.zip
base-datos.zip
```

# INSTALAR ANGULAR MATERIAL

1. Ejecutar el siguiente comnado para instalar el Angular Material:

```ng add @angular/material```

La versión a instalarse será la ```@angular/material@13.3.9```

# INSTALAR ANGULAR FLEX

1. Ejecutar el siguiente comando para instalar Angular Flex:

```npm i @angular/flex-layout```

Si se produjera algún error por la versión se deberá utilizar la inmediata anterior:

```npm i @angular/flex-layout@13.0.0-beta.38```

2. Adicionalmente, debemos instalar el CDK, por lo general al haber instalado el angular material primero
y este ya lo usaba se debio haber instalado pero si no lo tienen se debe instalar con el siguiente comando:

```npm i -s @angular/cdk```

# JSON-SERVER
1. Para instalar este paquete de npm que permite crear rapidamente servicios rest debemos instalarlo de forma
global:

```npm install -g json-server```

2. A continuación crearemos una carpeta denominada ```05-heroes-server``` y pegamos dentro el archivo json del comprimido
denominado ```base-datos.zip```

3. Una vez realizado el paso anterior, debemos ir a un terminal ejecutado con modo administrador y ubicarnos en la carpeta
donde pegamos la base de datos:

```D:\WS_ANGCEROAEXPFRONT\05-heroes-server>```

Posterior a esto debemos ejecutar el siguiente comando: 

```json-server --watch db.json```

Debería regresar el siguiente resultado:

  ```
  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/usuarios
  http://localhost:3000/heroes

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
  ```

# APUNTES

1. En la configuración las rutas hijas, se deben configurar los modulos que contienen las definiciones
de las rutas hijas en el archivo de configuración de rutas principales "app-routing.module.ts" de la 
siguiente manera, por ejemplo:

```{path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)},```

La sentencia anterior es la clave del ```"lazyload"```, esto significa cuando alguien ingrese al path: 'auth'
carga sus hijos (loadChildren), y este modulo hijo a cargar se debe importar de ```"import('./auth/auth.module')"```
cuando el resultado de la sentencia anterior se cargue en memoria entonces el modulo que va a regresar es el
module.AuthModule ```("then(module => module.AuthModule)").```

2. En la siguiente URL podremos encontrar los iconos de angular material:

```https://fonts.google.com/icons```

3. En la carpeta environments se pueden configurar archivos que permiten definir variables de entorno para diferentes
etapas de desarrollo (desa, test o producción); de esta forma podemos definir variables que contienen por ejemplo 
las rutas de los endpoints para diferentes entornos. Así mismo, cuando se vaya a utilizar la constante ```enviroments```,
nos debemos asegurar de borrar al final la extensión:

```import { environment } from '../../../environments/environment';```

4. Para ver una ruta en la consola en el typescript se debera colocar la siguiente sentencia: 

```console.log(this.router.url.includes('editar'));```

5. Los pipes se clasifican en puros e impuros, los puros permiten ejecutarse cada vez que el argumento cambia, pero en el 
caso de heroes el objeto ```heroe``` es un objeto, cuando se cambia el valor de una propiedad de un objeto, el objeto sigue
siendo el mismo y por esta razón no se vuelve a disparar, si necesitamos que el pipe se vuelva a disparar cada vez que el 
ciclo de detección de cambios se dispare entonces debemos colocar el ```pure: false``` ya que será el ciclo de detección de
cambios lo que estaremos evaluando y no el valor del argumento que es un objeto. Sin embargo, se debe tener cuidado con trabajar
con pipes impuros ```pure: false```ya que se disparan cada vez que algo cambia en la aplicación indeferentemente de que haya sido
la imagen o cualquier otro objeto o variable.

6. Se recomienda utilizar el operador spread ```{...object}``` con la finalidad de evitar enviar por referencia el objeto hacia 
el dialogo, de esta manera nos aseguramos que si en componente que se usará como dialogo se modifica el objeto no impacte o no 
pase por referencia dicho cambio al objeto original.

7. El operador ```tap``` de ```rxjs``` permite generar efectos secundarios cuando se ejecuta un observable.

8. CanLoad: Este método de los guards sirve para prevenir que el usuario cargue un módulo determinado, estos métodos se configuran en el archivo donde se tiene configurado el routing en este caso en el archivo ```app-routing.module.ts```:

```{path: 'heroes', loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule), canLoad: [AuthGuard]},```

Sin embargo, este método tiene una debilidad que es que cuando ya se cargo el módulo, por primera vez, que esta condicionado bajo este método, si se intenta volver a ingresar, se permite el ingreso ya que ya esta cargado en memoria, por esta razón se aconseja configurarlo en conjunto con el CanActivate

9. of: esta función sirve para crear observables en base al argumento que se le coloca por ejemplo:

```return of(false);```
