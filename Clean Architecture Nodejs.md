Uso de clean code , architecture 

App-rest podra
- Crear usuarios 
- Autenticar usuarios -> usar tokens para validar 

Uso de patron de repository para facilitar el cambio de bd 

EL objetivo de la clean arch es que los circulos externos se comunican con los internos pero los internos no deben saber nada de los externos y simpre con responsabilidad unica

Entidades -> información de nuestros usarios , parecido a la información que almacenamos en bd , propia imple y es agnostico no importa que la bd le ponga mas campos o menos deadorde a lo mismo

Casos de uso -> vamos hacer 2 login y register 

Infra 
Presentacion -> colocar las rutas ,controladores , imple de framework 

Se paga el precio de crear mas abstraciones y archivos 


configurar ts en node 
https://gist.github.com/Klerith/47af527da090043f604b972b22dd4c01

estructura de directorios opcional 

Presentation -> Todo lo que este en la carpeta de presentacion es lo mas externo de nuestro circulo, es lo mas de cerca a lo que van estar consumiento de nuestro rest, 

Domain ->reglas que gobernan la aplicacion , como aplicar adptadores , data soirce , sin dependecias externas 

Infraestructure -> Punto intermedio entre domain y presentation , implementación concreta de data source, repositorio , mappers 

Todas nuestras variables de entornos son txt y hay q convertirlas

---

Adapta los paquetes que instalesmos al proyecto , no los uses directamente en tu codigo , como dependecias ocultas 
Evita el acoplamiento

----
En la carpeta de dominio creamos dos carptes 
- datasource - Regla de negocio(no imple) a la cual regimos la obtención de datos 
- repositories -quienes se van a comunicar/conectar con los datasource , reglas de repositori

ambos son abstracciones no implementaciones 

La codificacion de sus archivos son identicos pero sus implementaciones varian 

La definicion de las class abstrac son exactas iguales 

La idea de los repositorios es que conoscan cuales son los metodos que vamos a llamar desde nuestro datasource 

**Los casos de uso llamaran a los repository pero estos en su instanciacio necesitarn un obj de datasource**

Nuestros datasource en dominio son las reglas de definion del juego (variso datasource mongo , postgresql)

---
Nuestros repos reciben datasource y nosotros interactuamos con los repos , no directamente con el datasource(se puede), la idea es que esta nos sirva como una capa para que ustdes pueden cambiar los origenes de datos, pero el codigo de los repo no se ve afectado   

---
Mapper va en infra debido a que es un puente entre las capas 


Nunca grabara en JWT informacion sensible como tarjetas, es facilmente extraible , se considera seguro gracias mediante a su firma y lo header  