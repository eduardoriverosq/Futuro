import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Helper for Gemini AI client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API: Career Impact Simulator with Gemini AI
app.post('/api/analyze-career', async (req, res) => {
  const { career, faculty, universityYear } = req.body;
  if (!career) {
    return res.status(400).json({ error: 'Career parameter is required' });
  }

  const ai = getAiClient();
  if (!ai) {
    // Return structured default analysis when API key is not configured
    return res.json({
      career,
      exposureScore: 68,
      automationRisk: 'Medio-Alto (automatización de tareas repetitivas y síntesis)',
      augmentationPotential: 'Muy Alto (amplificación cognitiva y diseño estratégico)',
      emergingRoles: [
        `Arquitecto de Soluciones con IA en ${career}`,
        `Auditor Ético y de Calidad de Datos para ${career}`,
        `Especialista en Integración Humano-Agente en ${career}`
      ],
      skillsToMaster: [
        'Ingeniería de contexto y prompting avanzado',
        'Validación crítica de sesgos y alucinaciones',
        'Pensamiento sistémico y resolución de problemas complejos',
        'Liderazgo empático y comunicación persuasiva'
      ],
      practicalTools: [
        { name: 'Gemini Workspace / NotebookLM', use: 'Análisis de documentación extensa y síntesis de casos' },
        { name: 'Claude / ChatGPT Plus', use: 'Ideación, redacción de informes técnicos y contra-argumentación' },
        { name: 'Perplexity Pro', use: 'Investigación académica y validación con fuentes citadas en tiempo real' }
      ],
      horizonRecommendation: `Para un estudiante de ${career} en ${universityYear || 'nivel universitario'}, la clave no es competir contra los modelos de lenguaje, sino convertirse en el profesional aumentado que orquesta estas tecnologías con criterio ético y juicio humano insustituible.`
    });
  }

  try {
    const prompt = `Actúa como especialista senior en el futuro del trabajo y diseño instruccional universitario para el taller de "Yo Aprendo" (autores: María Elena Rúa & Eduardo Riveros).
Analiza el impacto de la Inteligencia Artificial en la carrera universitaria: "${career}" (Área/Facultad: ${faculty || 'General'}, Año académico: ${universityYear || 'Universitario'}).

Devuelve ÚNICAMENTE un JSON válido con la siguiente estructura exacta:
{
  "career": "${career}",
  "exposureScore": <número entre 25 y 95 representando el porcentaje de tareas expuestas a IA>,
  "automationRisk": "<descripción breve en español del riesgo de automatización de tareas>",
  "augmentationPotential": "<descripción breve del potencial de aumento y amplificación>",
  "emergingRoles": ["<rol emergente 1>", "<rol emergente 2>", "<rol emergente 3>"],
  "skillsToMaster": ["<habilidad clave 1>", "<habilidad clave 2>", "<habilidad clave 3>", "<habilidad clave 4>"],
  "practicalTools": [
    {"name": "<herramienta>", "use": "<caso de uso aplicado a la carrera>"},
    {"name": "<herramienta 2>", "use": "<caso de uso applied>"},
    {"name": "<herramienta 3>", "use": "<caso de uso applied>"}
  ],
  "horizonRecommendation": "<párrafo inspirador y pragmático de 3 a 4 oraciones orientado a estudiantes universitarios>"
}`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API timeout')), 6000)
    );

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const response: any = await Promise.race([generatePromise, timeoutPromise]);
    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini career analysis error:', error);
    // Graceful fallback
    return res.json({
      career,
      exposureScore: 72,
      automationRisk: 'Moderado a Alto en tareas operativas, transcripción y análisis descriptivo.',
      augmentationPotential: 'Excepcional en diseño conceptual, síntesis estratégica e investigación.',
      emergingRoles: [
        `Consultor de Flujos Agénticos en ${career}`,
        `Analista de Gobernanza y Ética de IA para ${career}`,
        `Especialista en Co-pilotos de Dominio Específico`
      ],
      skillsToMaster: [
        'Criterio crítico de validación metodológica',
        'Diseño de prompts estructurados y roleplay profesional',
        'Gestión de la incertidumbre e inteligencia emocional',
        'Hibridación técnica y humana'
      ],
      practicalTools: [
        { name: 'Gemini 3.8 / ChatGPT', use: 'Co-razonamiento y análisis de hipótesis de trabajo' },
        { name: 'NotebookLM', use: 'Grounding estricto sobre bibliografía y artículos científicos' },
        { name: 'v0 / Cursor / Perplexity', use: 'Prototipado rápido y exploración bibliográfica acelerada' }
      ],
      horizonRecommendation: `La inteligencia artificial no sustituirá al profesional de ${career}; sustituirá al profesional de ${career} que no aprenda a integrarla con criterio humano, ética rigurosa y pensamiento crítico.`
    });
  }
});

// API: Prompt Engineering Evaluator & Coach
app.post('/api/evaluate-prompt', async (req, res) => {
  const { promptText, taskGoal } = req.body;
  if (!promptText) {
    return res.status(400).json({ error: 'promptText is required' });
  }

  const ai = getAiClient();
  if (!ai) {
    return res.json({
      score: 8,
      verdict: 'Prompt prometedor con margen de optimización en contexto y restricciones.',
      strengths: [
        'Define el objetivo principal de la tarea con claridad',
        'Vocabulario comprensible para el modelo'
      ],
      improvements: [
        'Especificar el rol experto (ej: "Actúa como docente evaluador")',
        'Definir el formato de salida deseado (ej: tabla markdown o viñetas ejecutivas)',
        'Añadir restricciones de longitud y tono profesional'
      ],
      optimizedPrompt: `Actúa como especialista en ${taskGoal || 'educación universitaria'}. Analiza el siguiente tema con rigor metodológico: "${promptText}". Entrega tu respuesta en 3 secciones: 1. Diagnóstico de contexto, 2. Plan de acción práctico en 4 pasos, 3. Matriz de riesgos y mitigaciones. Tono analítico, conciso y profesional.`
    });
  }

  try {
    const prompt = `Actúa como evaluador experto en ingeniería de prompts para estudiantes universitarios del programa "Yo Aprendo" (autores: María Elena Rúa & Eduardo Riveros).
Evalúa el siguiente prompt escrito por un estudiante para la tarea "${taskGoal || 'Académica/Profesional'}":
"${promptText}"

Devuelve ÚNICAMENTE un JSON con este formato:
{
  "score": <número del 1 al 10>,
  "verdict": "<síntesis de 1 frase>",
  "strengths": ["<fortaleza 1>", "<fortaleza 2>"],
  "improvements": ["<oportunidad de mejora 1>", "<oportunidad de mejora 2>"],
  "optimizedPrompt": "<versión reformulada aplicando las mejores prácticas: rol, contexto, tarea, restricciones y formato de salida>"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('Prompt evaluation error:', error);
    return res.json({
      score: 7,
      verdict: 'Buen punto de partida, requiere estructura de rol y delimitación de formato.',
      strengths: ['Intención clara', 'Términos precisos'],
      improvements: ['Añadir restricciones de salida', 'Establecer persona/rol experto'],
      optimizedPrompt: `Actúa como especialista senior. Considerando el contexto universitario actual: "${promptText}". Proporciona una respuesta estructurada con: 1. Puntos clave, 2. Aplicación directa, 3. Ejemplo concreto. Limita a 250 palabras en español formal.`
    });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Yo Aprendo Server active on port ${PORT}`);
  });
}

startServer();
