const express = require('express');
const app = express();
app.use(express.json());

// CONFIGURACIÓN CENTRALIZADA (Control total desde las variables de Render)
const CONFIG = {
  mlm: process.env.MLM_ENABLED === 'true',
    streaming: process.env.STREAMING_ENABLED === 'true',
      radio: process.env.RADIO_ENABLED === 'true',
        iptv: process.env.IPTV_ENABLED === 'true',
          social: process.env.SOCIAL_ENABLED === 'true'
          };

          // 1. RUTAS DE CONTROL (La interfaz de tu Ecosistema)
          app.get('/', (req, res) => {
            res.json({
                sistema: "Tonday Maestro",
                    estado: "Online",
                        modulos: CONFIG,
                            info: "Usa los endpoints /api/streaming, /api/radio, /api/mlm, /api/iptv"
                              });
                              });

                              // 2. ORQUESTADOR DE SERVICIOS (Llamadas ligeras a APIs externas)
                              // Aquí conectamos con TMDB (películas), Firebase (MLM) y otros
                              app.get('/api/:servicio', (req, res) => {
                                const { servicio } = req.params;
                                  
                                    // Si el módulo está apagado, no gastamos memoria
                                      if (CONFIG[servicio] === false) return res.status(403).json({ error: "Módulo desactivado" });

                                        // Aquí delegamos a la API externa (ejemplo: TMDB para películas o IPTV)
                                          res.json({ 
                                              mensaje: `Accediendo a ${servicio}...`,
                                                  redirect: "Conectando con servidor de contenido externo..."
                                                    });
                                                    });

                                                    app.listen(process.env.PORT || 3000, () => console.log("Sistema Maestro Tonday: Operativo y Optimizado"));
                                                    