# Taxi APC Granada · Recibos y facturas

## Publicar la app

1. Descomprime `taxi-apc-granada-pwa.zip`.
2. Crea un repositorio en GitHub, por ejemplo `taxi-recibos`. Para usar GitHub Pages con una cuenta gratuita, el repositorio debe ser público.
3. En el repositorio, pulsa **Add file → Upload files**. Sube los archivos descomprimidos, con `index.html` en la raíz. No subas el ZIP cerrado ni una carpeta adicional que deje `index.html` dentro de ella.
4. Abre **Settings → Pages**.
5. En **Source**, selecciona **Deploy from a branch**. Elige la rama **main** y la carpeta **/(root)**. Pulsa **Save**.
6. Cuando termine la publicación, GitHub mostrará el enlace. Ábrelo en el teléfono. La app admite tanto la página principal de una cuenta como una página dentro de un repositorio.

Instrucciones oficiales: [publicar desde una rama](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) y [subir archivos](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## Instalar en el teléfono

- **Android:** abre el enlace en Chrome y pulsa **Instalar app**. También puedes utilizar **Instalar aplicación** o **Añadir a pantalla de inicio** en el menú del navegador.
- **iPhone:** abre el enlace en Safari, pulsa **Compartir → Añadir a pantalla de inicio**.
- El icono es un taxi negro sobre fondo amarillo.
- Abre la app una primera vez con internet para preparar el funcionamiento sin conexión.

## Preparar y emitir un documento

1. En **Mi empresa**, introduce el título, el titular, NIF/CIF, licencia, matrícula y dirección. Guarda los datos. El título inicial es **Servicio taxi APC Granada** y se puede editar.
2. En **Servicio y cliente**, elige **Recibo** o **Factura**. La fecha y la hora se rellenan automáticamente y se pueden editar.
3. Introduce origen, destino y los datos del cliente. Para una factura se requieren nombre o razón social, NIF/CIF y dirección fiscal del cliente, además de la dirección fiscal del titular.
4. Introduce **el total pagado**, con IVA y suplementos incluidos. Puedes detallar los suplementos: se separan del trayecto, pero no se suman otra vez al total.
5. Elige **Efectivo** o **Tarjeta**. Revisa la vista previa y pulsa **Emitir**.
6. Descarga el **PDF**, el **TXT**, imprime o utiliza **Compartir**. La posibilidad de compartir directamente un PDF depende del navegador; también puedes descargarlo y adjuntarlo en WhatsApp o email.

Los nombres de los archivos identifican servicio, fecha y documento. Por ejemplo:

`servicio-taxi-2026-10-05-F-2026-0001.pdf`

La numeración se asigna una sola vez al emitir. Descargar, imprimir o compartir el mismo documento no consume otro número. Las facturas utilizan `F-AÑO-0001` y los recibos `R-AÑO-0001`, con contadores independientes para cada año de la fecha del servicio. Los documentos emitidos conservan los datos con los que se crearon, aunque después edites los datos de empresa.

## IVA

Para los servicios habituales de transporte de viajeros en Granada se utiliza el **10 %**. La app parte del total, calcula **base = total / 1,10** y obtiene la cuota por diferencia, redondeando a céntimos. Ejemplo: **33,00 € = 30,00 € de base + 3,00 € de IVA**.

Los suplementos de esta versión son conceptos del propio servicio de taxi. Los suplidos pagados en nombre y por cuenta del cliente tienen un tratamiento distinto y no están contemplados en esta versión.

Fuentes: [AEAT: tipo reducido del 10 %](https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/manual-iva-2025/capitulo-04-sujetos-pasivos-repercusion-impositivo/tipo-impositivo/tipo-impositivo-reducido-10-ciento.html) y [AEAT: base imponible y suplidos](https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/calculo-base-imponible.html).

## Guardado y copias JSON

Los datos se guardan **en el navegador de cada dispositivo**. No se envían a GitHub ni a una base de datos online. Tus compañeros pueden utilizar la misma web sin cuenta: cada uno guarda sus propios datos en su teléfono. Una instalación en otro navegador o en otra dirección web tiene un almacenamiento distinto.

En **Mis documentos**, puedes abrir los documentos emitidos y volver a exportarlos. También encontrarás:

- **Exportar copia JSON:** descarga todos los documentos, los datos del titular y los contadores.
- **Importar copia JSON:** recupera la copia, añade los documentos que faltan y actualiza los contadores. Los documentos idénticos se reconocen como duplicados. Si un mismo número tiene datos diferentes, se rechaza la importación completa sin sobrescribir nada.

Para pasar los datos al PC:

1. Exporta una copia JSON desde el teléfono.
2. Transfiere el archivo al ordenador por el medio que prefieras.
3. Abre la misma app en el PC y utiliza **Mis documentos → Importar copia JSON**.

Haz copias frecuentes y consérvalas fuera del navegador. Borrar los datos del navegador, cambiar de teléfono o utilizar el modo privado puede hacer que pierdas lo guardado. Las copias contienen datos fiscales y de clientes; no las subas al repositorio público de GitHub.

Si vas a emitir facturas desde el PC, importa primero la última copia del móvil. Antes de volver a emitir desde el móvil, importa la última copia del PC. Sin este intercambio, ambos dispositivos podrían utilizar el mismo número para documentos diferentes.

## Esta primera versión

Incluye PWA, funcionamiento sin conexión después de la primera carga, modo claro y oscuro, documentos guardados, numeración, IVA, PDF, TXT y copias JSON. El ZIP contiene la aplicación lista para GitHub Pages; no requiere instalar componentes ni compilarla.

El APK para Android queda como una posible ampliación. Esta versión tampoco incluye rectificaciones ni conexión con sistemas de envío fiscal: esas funciones requerirían una adaptación específica.
