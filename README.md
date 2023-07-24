# CURSOS BOOTCAMP

Se entrega deploy para Consolidado Modulo 8

## Aspectos a considerar

Es una página de aspecto plano.

## Indicaciones para empezar proyecto

Este es un repositorio donde se podrá encontrar una aplicación web, el cual su desarrollo está sistemáticamente orientado a un CRUD de bootcamps/usuarios.

```console
npm install
```
```console
npm run dev
```

### Importante: Configurar el entorno

Configurar el archivo .env en la raíz del proyecto que coincidan con las mostradas en:

```
/.env.example
```

## Contenido del proyecto:

### Se facilita la base de datos

Lo encuentras en:

```
/public/bkp_database.sql
```

### Se utilizan los seeds para crear Usuarios y Bootcamps

```console
node seeds.js
```

### Se muestran ejemplos realizados en postmam

```
/public/consultas_postman
```

## Consultas aplicadas

- Consultando el Bootcamp por id, incluyendo los usuarios.

```bash

<!-- GET -->

http://localhost:3000/api/v1/bootcamp/id/1


```

- Listar todos los Bootcamp con sus usuarios.

```bash

<!-- GET -->

http://localhost:3000/api/v1/bootcamp


```

- Consultar un usuario por id, incluyendo los Bootcamp.

```bash

<!-- GET -->

http://localhost:3000/api/v1/user/id/1

```

- Listar los usuarios con sus Bootcamp

```bash

<!-- GET -->

http://localhost:3000/api/v1/user


<!-- PUT -->

http://localhost:3000/api/v1/user/id/1

```

```json
{
	"firstName": "Pedro",
	"lastName": "Sánchez",
	"email": "mateo.diaz@correo.com"
}
```

- Eliminar un usuario por id; por ejemplo: el usuario con id=1.

```bash

<!-- DELETE -->

http://localhost:3000/api/v1/user/id/1

```

