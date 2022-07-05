## 05HeroesApp

# COMPONENTES A UTILIZAR

Angular Material: https://material.angular.io/

# INSTALAR ANGULAR MATERIAL

1. Ejecutar el siguiente comnado para instalar el Angular Material:

ng add @angular/material

La versión a instalarse será la @angular/material@13.3.9

# APUNTES

1. En la configuración las rutas hijas, se deben configurar los modulos que contienen las definiciones
de las rutas hijas en el archivo de configuración de rutas principales "app-routing.module.ts" de la 
siguiente manera, por ejemplo:

{path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)},

La sentencia anterior es la clave del "lazyload", esto significa cuando alguien ingrese al path: 'auth'
carga sus hijos (loadChildren), y este modulo hijo a cargar se debe importar de "import('./auth/auth.module')"
cuando el resultado de la sentencia anterior se cargue en memoria entonces el modulo que va a regresar es el
module.AuthModule ("then(module => module.AuthModule)").

