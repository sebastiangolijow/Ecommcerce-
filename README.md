
## Objetivos del Proyecto

- Construir una App JavaScript desde cero.
- Practicar el workflow de GIT.
- Utilizar Metodologías Ágiles (SCRUM).
- Trabajar en equipo.
- Trabajar con Trello para organizar los sprints.
- Usar y practicar testing.







El contenido de `client` fue creado usando: Create React App.

### Usuarios no Autenticados

Un Visitante anónimo podra navegar en el e-commerce, ver, buscar y comprar productos.

###### Guest 

- PRODUCTOS:
    + ver la lista completa de productos (catálogo), para ver todo lo disponible para comprar.
    + refinar el listado por categorías, para poder ver los items en los que estoy interesado.
    + buscas productos, para poder encontrar rápido los productos que quiero comprar.
    + ver los detalles de un producto individual (incluida las fotos, descripciones, reviews, etc...), asi puede determinar si quiero ese producto o no.

- CARRITO:
    +  agregar items a mi carrito de compras desde el listado o desde a página de detalles de un producto, para poder comprarlos despues.
    +  sacar items de mi carrito, en caso que decida no quererlos.
    +  editar cantidades de los items de mi carrito, en caso que quiera mas o menos cantidad de un item en particular.
    +  refrescar la página, o irme y volver, y todavía tener mi carrito de compras (sin haberme creado una cuenta). (Podés usar sessionStorage, localStorage, cookies, o JWT).
    +  crearme una cuenta, loguearme y seguir editando ese mismo carrito, asi no pierdo los items seleccionados.
- CHECKOUT:
    + comprar todos los items de un mi carrito.
    + especificar una dirección de envio y un email cuando hago el checkout, asi me envien la compra a lugar que dije.
    + recibir un email de confirmación que hice la compra.
    + recibir un email de notificación cuando la orden fue despachada.
- GESTION DE CUENTA:
    +  crear una cuenta, asi puede hacer otras cosas como dejar un review.
    +  logearme usando Google o Github, para no tener que acordarme de un password nuevo.

### Usuarios Autenticados

Los usuarios que hayan creado su cuenta, podrán hacer todo lo que puede hacer un usuario guest y además:

###### Como un Usuario Autenticado

- GESTION DE CUENTA:
    +  desloguearme, asi nadie más pueda usar mi sesión.
    +  ver el historial de ordenes previas, asi puede reever las ordenes que hice en el pasado.
    +  ver los detalles de una orden que hice en el pasado, incluyendo:
        * Los items comprados, con sus cantidades.
        * Links a la página del producto comprado.
        * Fecha y hora de la compra.
- REVIEWS:
    +  dejar reviews a los productos, que incluyan texto y un sistema de cinco estrellas.

### Admin

Los usuarios administradores pueden manejar el sitio, los productos que se listan y los items que están disponibles.

###### Como un administrador yo quiero...

- GESTION DE PRODUCTOS:
    +  crear y editar productos, con nombre, descripción, precio y uno o más fotos, tal que los visitantes puedan ver la última información de lo que se vende.
    +  crear categorías, para que los usuarios puedan filtrar los items.
    +  agregar o sacar categorías de los items (los items deben poder aceptar múltiples categorías).
    +  gestionar la disponibilidad de un item. (un item que no esta disponible, no deberá estar listado en la página, pero su detalle debe seguir siendo accesible desde el historial de compras o con su URL, pero debe mencionar que el item no está disponible).

- GESTION DE ORDENES:
    + ...poder ver una lista de todas las ordenes, para poder ver y revisar las ordener.
    + ...poder filtrar as ordenes por su estado (creada, procesando, cancelada, completa).
    + ver los detalles de una orden específica, asi puedo revisarla y actualizar su estado.
    + ...poder cambiar el estado de una orden (creada => procesando, procesando => cancelada || completa).

- GESTION DE USUARIOS:
    + hacer que un usuario se convierta en admin.
    + a un usuario, asi no puedan logearse más.
    + forzar una password reset para un usuario.


