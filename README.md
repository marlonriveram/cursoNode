Modelo Vista Controlador (MVC): es un patro de arquetectura
separ las preocupaciones de la app

Modelo: Es la logica del negocio, la extructura de datos reglas del negocio de forma interna
accider a base de datos, actulizar info, ver que la integridad de los datos es correcta.
(mysql,local,mongoDB)

Controlador: Es el intermediaro entre el modelo y la vista, es el que responde a las entradas del u usuari, y antes de llegar al modelo se encarga de tratar la entradas y saber si tiene que solicitarle al modelo que haga operaciones a que modelo le debe pedir y que le debe pedir.

Vista: Es la interfaz de usuario, mostrar los datos, enviar acciones a hacer.
(React,Json)

