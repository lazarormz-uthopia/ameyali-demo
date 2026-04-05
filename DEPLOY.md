# AMEYALI — Guía de Deploy en Vercel (GRATIS)

## Paso 1: Crear cuenta en Vercel + GitHub

1. Ve a **github.com** y crea una cuenta si no tienes
2. Ve a **vercel.com** y regístrate con tu cuenta de GitHub

## Paso 2: Subir el proyecto a GitHub

1. En GitHub, crea un nuevo repositorio llamado `ameyali-demo`
2. Sube todos estos archivos manteniendo la estructura:

```
ameyali-demo/
├── api/
│   ├── chat.js          ← Backend: conecta con Claude
│   └── speak.js         ← Backend: conecta con ElevenLabs
├── public/
│   ├── index.html       ← Frontend principal
│   ├── ameyali.png      ← Tu imagen de Ameyali (Frente_2.png renombrada)
│   └── ameyali-profile.png  ← Imagen de perfil (opcional)
├── package.json
└── vercel.json
```

**Para subir a GitHub:**
- Opción fácil: Usa la interfaz web de GitHub
  - Click "Add file" → "Upload files" y arrastra todo
- Opción pro: Usa git desde la terminal:
  ```bash
  git init
  git add .
  git commit -m "Ameyali demo"
  git remote add origin https://github.com/TU_USUARIO/ameyali-demo.git
  git push -u origin main
  ```

## Paso 3: Conectar con Vercel

1. En **vercel.com**, click "Add New Project"
2. Selecciona tu repositorio `ameyali-demo`
3. En la configuración del proyecto:
   - **Framework Preset:** Other
   - **Root Directory:** (dejar vacío)
   - **Build Command:** (dejar vacío)
   - **Output Directory:** public

4. **IMPORTANTE — Variables de Entorno:**
   Antes de hacer deploy, configura estas variables:

   | Variable | Valor |
   |----------|-------|
   | `ANTHROPIC_API_KEY` | Tu API key de Anthropic (sk-ant-...) |
   | `ELEVENLABS_API_KEY` | Tu API key de ElevenLabs |
   | `ELEVENLABS_VOICE_ID` | El ID de la voz que quieras usar |

5. Click **"Deploy"**

## Paso 4: ¡Listo!

Vercel te dará una URL tipo: `https://ameyali-demo.vercel.app`

Esa URL funciona en:
- ✅ Computadora (Chrome, Firefox, Safari, Edge)
- ✅ iPhone (Safari, Chrome)
- ✅ Android (Chrome)
- ✅ Tablet

Para usar el micrófono, **debes usar HTTPS** (Vercel lo da automáticamente).

## Cómo obtener el Voice ID de ElevenLabs

1. Ve a **elevenlabs.io** → Voice Library
2. Busca una voz femenina en español que te guste
3. Click en la voz → copia el "Voice ID" (un string largo tipo `21m00Tcm4TlvDq8ikWAM`)
4. Pégalo en la variable de entorno `ELEVENLABS_VOICE_ID` en Vercel

**Tip:** Busca voces con tag "Spanish" y "Female". Recomiendo probar "Charlotte" o "Valentina" con el modelo multilingual.

## Cómo obtener la API Key de Anthropic

1. Ve a **console.anthropic.com**
2. Settings → API Keys → Create Key
3. Copia la key (empieza con `sk-ant-`)
4. Pégalo en `ANTHROPIC_API_KEY` en Vercel

## Costos estimados de la demo

| Servicio | Costo |
|----------|-------|
| Vercel hosting | **$0** (free tier) |
| Claude API | ~$0.003-0.015 por conversación |
| ElevenLabs | Depende de tu plan (free tier: 10,000 chars/mes) |

Con 100 conversaciones de demo: ~$0.50-1.50 USD total en Claude.

## Solución de problemas

**"El micrófono no funciona"**
- Asegúrate de usar HTTPS (Vercel lo da automáticamente)
- En iPhone, usa Safari (Chrome en iOS tiene limitaciones con el mic)
- Acepta los permisos de micrófono cuando el navegador lo pida

**"No responde la IA"**
- Verifica que `ANTHROPIC_API_KEY` esté correcta en Vercel
- Ve a Vercel → tu proyecto → Logs para ver errores

**"No se escucha la voz"**
- Verifica que `ELEVENLABS_API_KEY` y `ELEVENLABS_VOICE_ID` estén correctas
- Si ElevenLabs falla, el sistema usa automáticamente la voz del navegador como fallback

**"Quiero cambiar la imagen de Ameyali"**
- Reemplaza el archivo `public/ameyali.png` por tu nueva imagen
- Haz push a GitHub y Vercel hace redeploy automáticamente

---

## MIGRACIÓN FUTURA A 3D (Deployment Final)

Cuando tengas el modelo 3D de Ameyali listo (.GLB), el cambio es simple:

1. Reemplazar el `<img>` y los overlays CSS por un canvas de Three.js con TalkingHead.js
2. El backend (api/chat.js y api/speak.js) NO CAMBIA — es exactamente el mismo
3. Te daré un documento detallado con:
   - Especificaciones técnicas del modelo GLB
   - Cómo integrar TalkingHead.js
   - Cómo conectar el lip-sync real con ElevenLabs
   - Cómo agregar las animaciones Mixamo

El 80% del código se mantiene igual. Solo cambia la capa visual.
