   const express = require('express');
   const axios = require('axios');
   const app = express();
   app.use(express.json());

   // CONFIGURACIÓN MAESTRA
   const CONFIG = {
     mlm: process.env.MLM_ENABLED === 'true',
       streaming: process.env.STREAMING_ENABLED === 'true',
         radio: process.env.RADIO_ENABLED === 'true',
           iptv: process.env.IPTV_ENABLED === 'true',
             social: process.env.SOCIAL_ENABLED === 'true',
               tienda: process.env.TIENDA_ENABLED === 'true',
                 bridge: process.env.BRIDGE_ENABLED === 'true',
                   rastreo: process.env.RASTREO_ENABLED === 'true',
                     videoIntro: {
                         enabled: process.env.VIDEO_INTRO_ENABLED === 'true',
                             url: process.env.VIDEO_INTRO_URL || ""
                               }
                               };

                               app.get('/', (req, res) => {
                                 res.json({ sistema: "Tonday Ecosistema Maestro", estado: "Online", modulos_activos: CONFIG });
                                 });

                                 // ORQUESTADOR DE SERVICIOS
                                 app.get('/api/:servicio', (req, res) => {
                                   const { servicio } = req.params;
                                     if (CONFIG[servicio] === undefined || CONFIG[servicio] === false) {
                                         return res.status(403).json({ error: "Módulo desactivado" });
                                           }
                                             res.json({ mensaje: `Acceso concedido a ${servicio}` });
                                             });

                                             // CONECTOR IPTV GLOBAL
                                             app.get('/api/iptv/canales/:pais?', async (req, res) => {
                                               if (!CONFIG.iptv) return res.status(403).json({ error: "Módulo IPTV desactivado" });
                                                 const pais = req.params.pais || 'index';
                                                   try {
                                                       const response = await axios.get(`https://iptv-org.github.io/iptv/${pais === 'index' ? 'index' : 'countries/' + pais}.m3u`);
                                                           res.send(response.data);
                                                             } catch (error) { res.status(500).json({ error: "Error de red en canales" }); }
                                                             });

                                                             // CONECTOR STREAMING (Películas, Series, Documentales, Conciertos)
                                                             // Este conector entrega la configuración para que la App consuma el catálogo de alta calidad
                                                             app.get('/api/streaming/config', (req, res) => {
                                                               if (!CONFIG.streaming) return res.status(403).json({ error: "Módulo Streaming desactivado" });
                                                                 
                                                                   res.json({
                                                                       fuente_datos: "TMDB API",
                                                                           categorias: ["Peliculas", "Series", "Novelas", "Reality", "Conciertos", "Documentales"],
                                                                               api_key_publica: process.env.TMDB_API_KEY || "PENDIENTE_CONFIGURAR",
                                                                                   status: "ready"
                                                                                     });
                                                                                     });

                                                                                     app.listen(process.env.PORT || 3000, () => {
                                                                                       console.log("Sistema Tonday: Ecosistema Maestro 100% Finalizado.");
                                                                                       });
                                                                                       