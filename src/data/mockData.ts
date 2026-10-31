import { CareerAnalysis, AiTool, DebateCase, QuizQuestion, Badge, PresentationSlide } from '../types';

export const INITIAL_CAREERS: CareerAnalysis[] = [
  {
    career: 'Ingeniería de Software & Computación',
    faculty: 'Ingeniería y Tecnología',
    exposureScore: 82,
    automationRisk: 'Alto en escritura de código boilerplate, sintaxis repetitiva y pruebas unitarias básicas.',
    augmentationPotential: 'Excepcional en diseño de arquitecturas complejas, depuración sistémica y orquestación de agentes autónomos.',
    emergingRoles: [
      'Ingeniero de Sistemas Agénticos & IA',
      'Arquitecto de Contexto y Prompting de Código',
      'Auditor de Seguridad y Sesgos en Algoritmos IA'
    ],
    skillsToMaster: [
      'Orquestación de LLMs y flujos RAG',
      'Supervisión y revisión de código generado por IA',
      'Modelado de dominios y especificación precisa de requerimientos',
      'Ciberseguridad en entornos de inferencia'
    ],
    practicalTools: [
      { name: 'Cursor / GitHub Copilot', use: 'Aceleración de desarrollo y refactorización inteligente' },
      { name: 'v0.dev / Claude Code', use: 'Prototipado rápido de interfaces y lógica de componentes' },
      { name: 'Gemini CLI / API', use: 'Análisis de bases de código masivas de más de 1M tokens' }
    ],
    horizonRecommendation: 'El desarrollador del futuro no es quien tipea caracteres más rápido, sino quien formula con precisión milimétrica la arquitectura del problema y valida con rigor los sistemas generados.',
    humanAdvantageScore: 78,
    taskBreakdown: {
      routineTasks: 15,
      analyticalTasks: 35,
      creativeTasks: 30,
      humanRelationalTasks: 20
    }
  },
  {
    career: 'Medicina & Ciencias de la Salud',
    faculty: 'Ciencias de la Salud',
    exposureScore: 64,
    automationRisk: 'Medio-Alto en transcripción de historias clínicas, lectura preliminar de imágenes diagnósticas y triage estándar.',
    augmentationPotential: 'Revolucionario en medicina personalizada de precisión, detección temprana multivariada y reducción del burnout clínico.',
    emergingRoles: [
      'Médico Especialista en Informática Clínica & IA',
      'Consultor de Medicina Personalizada Genómica-IA',
      'Líder de Validación de Dispositivos Médicos Inteligentes'
    ],
    skillsToMaster: [
      'Interpretación crítica de probabilidades bayesianas de la IA',
      'Comunicación empática con el paciente en la toma de decisiones compartida',
      'Bioética de la privacidad de datos clínicos y equidad algorítmica',
      'Manejo de historiales médicos aumentados con IA'
    ],
    practicalTools: [
      { name: 'NotebookLM / Consensus', use: 'Revisión sistemática de literatura médica y metaanálisis instantáneo' },
      { name: 'Scribe AI / Whisper Médica', use: 'Automatización de notas SOAP para dedicar 100% de la consulta a mirar al paciente' },
      { name: 'UpToDate + Gemini Clinical', use: 'Doble verificación en diagnósticos diferenciales complejos' }
    ],
    horizonRecommendation: 'La IA será el mejor estetoscopio cognitivo de la historia. Los médicos que dominen la empatía humana y la interpretación de datos de IA serán los líderes indiscutibles de los sistemas de salud.',
    humanAdvantageScore: 92,
    taskBreakdown: {
      routineTasks: 10,
      analyticalTasks: 40,
      creativeTasks: 15,
      humanRelationalTasks: 35
    }
  },
  {
    career: 'Derecho & Ciencias Jurídicas',
    faculty: 'Ciencias Jurídicas y Políticas',
    exposureScore: 74,
    automationRisk: 'Muy Alto en revisión documental masiva, redacción de cláusulas contractuales estándar y búsqueda jurisprudencial.',
    augmentationPotential: 'Enorme en estrategia procesal de alto nivel, negociación mediada, litigación oral y argumentación constitucional.',
    emergingRoles: [
      'Especialista en LegalTech & Gobernanza de Algoritmos',
      'Abogado en Derecho de Propiedad Intelectual de IA',
      'Auditor de Cumplimiento Regulatorio (Compliance) de IA'
    ],
    skillsToMaster: [
      'Prompting legal con restricciones estrictas de jurisdicción',
      'Detección experta de alucinaciones jurisprudenciales',
      'Oratoria jurídica, negociación estratégica y persuasión en sala',
      'Marco regulatorio internacional de IA (AI Act de la UE y normativas LATAM)'
    ],
    practicalTools: [
      { name: 'Perplexity Pro / vLex', use: 'Investigación dogmática y trazabilidad de sentencias con citas verificadas' },
      { name: 'Claude 3.7 / Gemini Pro', use: 'Análisis comparativo de contratos de cientos de páginas en segundos' },
      { name: 'NotebookLM', use: 'Carga de expedientes completos para simulación de contra-argumentos de la contraparte' }
    ],
    horizonRecommendation: 'Un abogado que cobra por redactar un contrato estándar perderá su cliente. El abogado que utiliza IA para auditar 500 contratos en 1 hora y diseñar la estrategia de negociación preventiva multiplicará su valor.',
    humanAdvantageScore: 84,
    taskBreakdown: {
      routineTasks: 12,
      analyticalTasks: 38,
      creativeTasks: 22,
      humanRelationalTasks: 28
    }
  },
  {
    career: 'Administración de Empresas & Finanzas',
    faculty: 'Negocios y Economía',
    exposureScore: 71,
    automationRisk: 'Alto en conciliación contable, reportes periódicos de KPIs, modelos financieros estáticos y procesamiento de facturas.',
    augmentationPotential: 'Máximo en simulación de escenarios de mercado dinámicos, análisis predictivo de inversiones y diseño de modelos de negocio innovadores.',
    emergingRoles: [
      'Estratega de Transformación Digital & Flujos de IA',
      'Analista Financiero Cuantitativo Asistido por LLMs',
      'Líder de Experiencia del Cliente Aumentada'
    ],
    skillsToMaster: [
      'Diseño y validación de agentes para flujos de trabajo operativos',
      'Pensamiento crítico financiero y detección de anomalías',
      'Liderazgo de equipos híbridos (humanos + agentes digitales)',
      'Narrativa de datos y comunicación ejecutiva'
    ],
    practicalTools: [
      { name: 'ChatGPT con Code Interpreter / Python', use: 'Limpieza de grandes bases de datos financieras y modelado dinámico' },
      { name: 'Gamma / Beautiful.ai', use: 'Generación de presentaciones de pitch y reportes ejecutivos' },
      { name: 'Julius AI / Rows', use: 'Análisis predictivo de series temporales sin escribir fórmulas manuales complejas' }
    ],
    horizonRecommendation: 'La ventaja competitiva ya no es memorizar ratios financieros, sino saber qué preguntas estratégicas hacerle a los datos y cómo motivar a las personas para ejecutar con visión ética.',
    humanAdvantageScore: 81,
    taskBreakdown: {
      routineTasks: 18,
      analyticalTasks: 42,
      creativeTasks: 20,
      humanRelationalTasks: 20
    }
  },
  {
    career: 'Psicología & Salud Mental',
    faculty: 'Ciencias Sociales y Humanidades',
    exposureScore: 42,
    automationRisk: 'Bajo en intervenciones terapéuticas profundas; Medio en psicoeducación básica, diarios de registro cognitivo y triaje inicial.',
    augmentationPotential: 'Muy Alto en seguimiento continuo de pacientes entre sesiones, análisis de patrones de lenguaje y apoyo en supervisión clínica.',
    emergingRoles: [
      'Psicólogo Diseñador de Agentes Terapéuticos Validados',
      'Especialista en Tecnoestrés e Impacto de la IA en la Psique',
      'Investigador de Interacción Humano-Computadora y Bienestar Digital'
    ],
    skillsToMaster: [
      'Empatía sintonizada y lectura del lenguaje corporal y microexpresiones',
      'Alianza terapéutica genuina (imposible de replicar por algoritmos)',
      'Ética de confidencialidad en aplicaciones de salud mental digital',
      'Diseño de intervenciones basadas en evidencia complementadas con tecnología'
    ],
    practicalTools: [
      { name: 'Woebot / Wysa (Estudio Clínico)', use: 'Análisis de protocolos CBT digitalizados para psicoeducación complementaria' },
      { name: 'NotebookLM', use: 'Sistematización de manuales diagnósticos DSM-5 y notas clínicas desidentificadas' },
      { name: 'Otter.ai / Whisper Seguro', use: 'Transcripción de sesiones para supervisión de casos con consentimiento ético' }
    ],
    horizonRecommendation: 'En un mundo saturado de respuestas automatizadas, la presencia humana auténtica, la escucha profunda y el vínculo afectivo se convierten en los activos más valiosos y demandados de la civilización.',
    humanAdvantageScore: 96,
    taskBreakdown: {
      routineTasks: 8,
      analyticalTasks: 22,
      creativeTasks: 25,
      humanRelationalTasks: 45
    }
  },
  {
    career: 'Diseño Gráfico & Creación Multimedia',
    faculty: 'Artes, Diseño y Comunicación',
    exposureScore: 86,
    automationRisk: 'Muy Alto en recorte de fondos, generación de texturas, mockups preliminares y retoques mecánicos de imagen.',
    augmentationPotential: 'Monumental en exploración conceptual hiperacelerada, generación de storyboards y personalización masiva de experiencias visuales.',
    emergingRoles: [
      'Director de Arte Generativo y Síntesis Visual',
      'Diseñador de Interfaces Conversacionales y Espaciales',
      'Curador de Identidad de Marca y Coherencia Estética para IA'
    ],
    skillsToMaster: [
      'Dirección de arte rigurosa: composición, teoría del color, semiótica visual',
      'Dominio de modelos de difusión (Midjourney, Stable Diffusion, Flux, Recraft)',
      'Criterio curatorial agudo: saber descartar el 95% de opciones mediocres generadas por IA',
      'Animación y narrativa visual transmedia'
    ],
    practicalTools: [
      { name: 'Midjourney v6 / Flux', use: 'Exploración de conceptos visuales de alta dirección de arte' },
      { name: 'Adobe Firefly / Photoshop GenAI', use: 'Edición no destructiva, expansión de lienzos y composición híbrida' },
      { name: 'Krea.ai / Runway Gen-3', use: 'Generación y animación de video para prototipado publicitario ágil' }
    ],
    horizonRecommendation: 'La IA abarata la producción de imágenes genéricas hasta costar cero. Lo que se dispara de precio es el gusto impecable, la narrativa humana con alma y la conceptualización audaz.',
    humanAdvantageScore: 76,
    taskBreakdown: {
      routineTasks: 10,
      analyticalTasks: 20,
      creativeTasks: 50,
      humanRelationalTasks: 20
    }
  },
  {
    career: 'Arquitectura & Urbanismo',
    faculty: 'Arquitectura y Construcción',
    exposureScore: 69,
    automationRisk: 'Alto en modelado paramétrico repetitivo, cálculo de superficies y renderizado estandarizado.',
    augmentationPotential: 'Altísimo en diseño biofílico optimizado, simulación climática y eficiencia energética en tiempo real.',
    emergingRoles: [
      'Arquitecto Paramétrico y Algorítmico Sostenible',
      'Especialista en Gemelos Digitales de Edificaciones (BIM + IA)',
      'Urbanista de Movilidad Predictiva y Ciudades Inteligentes'
    ],
    skillsToMaster: [
      'Integración de IA con software BIM (Revit, Rhino + Grasshopper)',
      'Diseño bioclimático basado en simulaciones térmicas instantáneas',
      'Sensibilidad espacial, habitabilidad y contexto cultural local',
      'Negociación con comités ciudadanos y normativas edilicias'
    ],
    practicalTools: [
      { name: 'Veras / Midjourney Arch', use: 'Iteración de bocetos conceptuales en renders fotorrealistas en segundos' },
      { name: 'Spacemaker (Autodesk Forma)', use: 'Optimización de asoleamiento, viento y densidad urbana con IA generativa' },
      { name: 'NotebookLM', use: 'Comprensión y auditoría de códigos de edificación y ordenanzas municipales' }
    ],
    horizonRecommendation: 'Las edificaciones las habitan seres humanos con emociones y memorias. La IA calcula mil variaciones estructurales en un parpadeo; el arquitecto humano decide cuál de ellas crea comunidad y belleza.',
    humanAdvantageScore: 85,
    taskBreakdown: {
      routineTasks: 12,
      analyticalTasks: 38,
      creativeTasks: 35,
      humanRelationalTasks: 15
    }
  },
  {
    career: 'Educación & Pedagogía',
    faculty: 'Educación',
    exposureScore: 58,
    automationRisk: 'Medio-Alto en corrección de pruebas estandarizadas, elaboración de planificaciones curriculares y redacción de fichas.',
    augmentationPotential: 'Revolucionario en personalización del aprendizaje al ritmo de cada alumno, tutoría adaptativa 1 a 1 y diseño de experiencias inmersivas.',
    emergingRoles: [
      'Diseñador Instruccional de Aprendizaje Asistido por IA',
      'Mentor de Pensamiento Crítico y Metacognición',
      'Especialista en Ambientes de Aprendizaje Personalizado'
    ],
    skillsToMaster: [
      'Pedagogía del cuestionamiento (hacer que los alumnos hagan mejores preguntas)',
      'Evaluación formativa auténtica basada en procesos y no en productos memorísticos',
      'Creación de tutores IA pedagógicamente seguros y con grounding curricular',
      'Inteligencia emocional docente y contención del grupo'
    ],
    practicalTools: [
      { name: 'Khanmigo / Gemini Learning Coach', use: 'Tutor socrático personalizado que no da la respuesta directa sino pistas guiadas' },
      { name: 'NotebookLM', use: 'Transformación de libros de texto en cuadernos de estudio interactivos con audio resumen' },
      { name: 'Curipod / Brisk Teaching', use: 'Generación instantánea de lecciones interactivas con encuestas en tiempo real' }
    ],
    horizonRecommendation: 'El rol del profesor ha cambiado para siempre: de ser el transmisor de información en el podio, a ser el facilitador y faro del pensamiento crítico, inspirando a los estudiantes a construir sentido.',
    humanAdvantageScore: 94,
    taskBreakdown: {
      routineTasks: 10,
      analyticalTasks: 25,
      creativeTasks: 25,
      humanRelationalTasks: 40
    }
  }
];

export const LABOR_TRENDS_DATA = {
  macroStats: [
    {
      metric: '85 Millones',
      label: 'Empleos transformados o desplazados',
      source: 'Foro Económico Mundial (WEF)',
      detail: 'Principalmente tareas administrativas repetitivas, entrada de datos y redacción estándar.'
    },
    {
      metric: '97 Millones',
      label: 'Nuevos roles emergentes creados',
      source: 'WEF Future of Jobs',
      detail: 'Puestos de interacción humano-máquina, auditoría de datos, gobernanza ética y arquitectura de contexto.'
    },
    {
      metric: '+65%',
      label: 'Habilidades requeridas que cambiarán al 2030',
      source: 'LinkedIn Economic Graph',
      detail: 'Incluso en empleos existentes, el conjunto diario de habilidades evolucionará drásticamente.'
    },
    {
      metric: '3.7x',
      label: 'Aceleración de productividad en profesionales aumentados',
      source: 'Estudio MIT & Harvard Business School',
      detail: 'Los profesionales que integran LLMs completan tareas complejas en menos de la mitad del tiempo con mayor calidad.'
    }
  ],
  humanVsAiMatrix: [
    {
      domain: 'Pensamiento Crítico & Juicio Ético',
      humanStrength: 'Evaluación de matices morales, consecuencias imprevistas, discernimiento de verdad y contexto cultural.',
      aiCapability: 'Detección rápida de inconsistencias en argumentos y síntesis de posturas filosóficas preexistentes.',
      humanAdvantage: 'Exclusivamente Humana',
      trendScore: 98
    },
    {
      domain: 'Procesamiento Masivo & Síntesis de Datos',
      humanStrength: 'Definición del propósito analítico y formulación de la hipótesis de valor.',
      aiCapability: 'Lectura de 1,000 papers en 10 segundos, extracción de patrones estadísticos y estructuración tabular instantánea.',
      humanAdvantage: 'Dominio de la IA',
      trendScore: 25
    },
    {
      domain: 'Empatía Profunda & Negociación',
      humanStrength: 'Vínculo emocional genuino, calibración intuitiva de confianza, contención en crisis y diplomacia.',
      aiCapability: 'Generación de respuestas con tono empático simulado y formulación de opciones de negociación según teoría de juegos.',
      humanAdvantage: 'Exclusivamente Humana',
      trendScore: 95
    },
    {
      domain: 'Creatividad & Dirección de Arte',
      humanStrength: 'Visión estética transgresora, intención artística sentida, cuestionamiento del status quo y narrativa con significado.',
      aiCapability: 'Variación infinita sobre combinaciones estéticas previas y renderizado fotorrealista en segundos.',
      humanAdvantage: 'Simbiosis Híbrida',
      trendScore: 72
    },
    {
      domain: 'Resolución de Problemas Ambiguos',
      humanStrength: 'Capacidad de navegar la incertidumbre radical, improvisar sin datos históricos y tomar decisiones con escasa información.',
      aiCapability: 'Optimización de caminos si las reglas y los datos pasados están claramente acotados.',
      humanAdvantage: 'Ventaja Humana',
      trendScore: 89
    }
  ],
  timelineHorizons: [
    {
      period: '2024 - 2025: La Era del Asistente (Co-piloto)',
      description: 'La IA se adopta como herramienta individual para acelerar correos, resúmenes, bocetos y código básico.',
      impactStudent: 'El estudiante que la usa ahorra tiempo en tareas mecánicas. El peligro: perder la práctica de la lectura y redacción profunda.'
    },
    {
      period: '2026 - 2027: La Era Agéntica (Orquestación)',
      description: 'Los modelos ejecutan flujos de trabajo autónomos multi-paso: investigan, redactan, prueban y publican de forma coordinada.',
      impactStudent: 'Se valora la capacidad de dar directrices precisas, supervisar la calidad y conectar herramientas dispares mediante APIs y prompts.'
    },
    {
      period: '2028 - 2030: Transformación Estructural de Profesiones',
      description: 'Reconfiguración de las jerarquías empresariales. Los roles junior tradicionales se convierten en analistas con criterio supervisor.',
      impactStudent: 'Los graduados universitarios compiten con su portafolio de proyectos reales aumentados por IA y su capacidad de liderazgo empático.'
    },
    {
      period: '2031 - 2035: Simbiosis Cognitiva Avanzada',
      description: 'Integración nativa de agentes multimodales en todas las industrias. La ventaja humana radica en la filosofía, la ética y la presencia física.',
      impactStudent: 'La educación continua y la adaptabilidad psicológica son la única garantía de vigencia laboral.'
    }
  ]
};

export const AI_TOOLS_DIRECTORY: AiTool[] = [
  {
    id: 'notebooklm',
    name: 'Google NotebookLM',
    category: 'Investigación',
    badge: 'Grounding Estricto',
    description: 'Cuaderno de investigación con IA que analiza exclusivamente las fuentes bibliográficas, PDFs y apuntes que tú le cargues, con citas exactas y generación de podcasts explicativos.',
    academicUseCases: [
      'Estudio de tesis y papers académicos sin riesgo de alucinación fuera de texto',
      'Creación de guías de estudio y preguntas de autoevaluación basadas en tus lecturas',
      'Generación de resumen en formato de conversación en audio (Deep Dive Audio)'
    ],
    recommendedPromptTemplate: 'Basado estrictamente en los documentos adjuntos de la unidad 3, compara la postura del autor A con la del autor B respecto al impacto regulatorio, citando los números de página exactos.',
    accessType: 'Gratis',
    url: 'https://notebooklm.google.com'
  },
  {
    id: 'gemini',
    name: 'Google Gemini 3.8 / Advanced',
    category: 'Redacción & Síntesis',
    badge: 'Ventana de 1M-2M Tokens',
    description: 'Modelo multimodal de Google con capacidad de analizar libros enteros, videos de conferencias completas y código en una sola consulta.',
    academicUseCases: [
      'Análisis de transcripciones de clases grabadas de 2 horas',
      'Revisión crítica de ensayos universitarios con retroalimentación rúbrica por rúbrica',
      'Co-razonamiento paso a paso en problemas de matemáticas, física y lógica'
    ],
    recommendedPromptTemplate: 'Actúa como evaluador universitario exigente. Analiza el siguiente borrador de ensayo contra la rúbrica adjunta: evalúa coherencia lógica, solidez de la evidencia y elegancia estilística. Señala 3 párrafos a reformular.',
    accessType: 'Freemium',
    url: 'https://gemini.google.com'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'Investigación',
    badge: 'Búsqueda en Tiempo Real con Fuentes',
    description: 'Motor de búsqueda conversacional potenciado con LLMs que rastrea la web académica en vivo y coloca citas indexadas en cada afirmación.',
    academicUseCases: [
      'Búsqueda de estadísticas recientes de organismos internacionales (Banco Mundial, OCDE)',
      'Exploración del estado del arte de una tecnología en los últimos 3 meses',
      'Verificación rápida de hipótesis con filtros académicos (Focus: Academic)'
    ],
    recommendedPromptTemplate: '¿Cuáles son los estudios empíricos publicados entre 2024 y 2026 sobre la correlación entre uso de LLMs en el aula y rendimiento en pensamiento crítico? Incluye DOI o enlaces a papers revisados por pares.',
    accessType: 'Freemium',
    url: 'https://perplexity.ai'
  },
  {
    id: 'claude',
    name: 'Anthropic Claude 3.7 Sonnet',
    category: 'Redacción & Síntesis',
    badge: 'Pensamiento Híbrido & Prosa Natural',
    description: 'Modelo con excepcional fluidez lingüística y capacidad de razonamiento extendido (extended thinking) para tareas de redacción y codificación meticulosa.',
    academicUseCases: [
      'Redacción de cartas de motivación para becas internacionales y pasantías',
      'Desglose analítico de argumentos filosóficos o dilemas jurídicos complejos',
      'Refactorización de código limpio con comentarios explicativos claros'
    ],
    recommendedPromptTemplate: 'Actúa como mentor de postulaciones para becas de posgrado. Revisa mi declaración de propósitos: elimina clichés corporativos, refuerza el impacto de mi proyecto de investigación y mejora la voz narrativa sin sonar arrogante.',
    accessType: 'Freemium',
    url: 'https://claude.ai'
  },
  {
    id: 'cursor',
    name: 'Cursor IDE',
    category: 'Programación',
    badge: 'Editor de Código con IA Nativa',
    description: 'Bifurcación de VS Code potenciada con IA que entiende todo tu repositorio local para autocompletar funciones, refactorizar archivos y explicar errores en vivo.',
    academicUseCases: [
      'Desarrollo de proyectos finales de ingeniería y ciencias de la computación',
      'Localización rápida de bugs en bases de datos y scripts de análisis de datos en Python/R',
      'Explicación didáctica de librerías complejas línea por línea'
    ],
    recommendedPromptTemplate: 'Revisa este script de procesamiento de datos en Pandas. Optimiza el tiempo de ejecución vectorizando los bucles for y agrega tipado estricto con validación de valores nulos.',
    accessType: 'Freemium',
    url: 'https://cursor.com'
  },
  {
    id: 'consensus',
    name: 'Consensus App',
    category: 'Investigación',
    badge: 'Motor de Búsqueda Científica',
    description: 'Herramienta de búsqueda que consulta más de 200 millones de artículos científicos y genera un medidor de consenso científico (Yes / No / Inconclusive).',
    academicUseCases: [
      'Fundamentación de marcos teóricos para tesis universitarias',
      'Comprobación de si una hipótesis de salud o psicología tiene respaldo empírico',
      'Extracción de tamaños de muestra y metodologías de investigación'
    ],
    recommendedPromptTemplate: '¿Existe evidencia concluyente de que el ayuno intermitente supera a la restricción calórica estándar en preservación de masa magra en adultos jóvenes?',
    accessType: 'Freemium',
    url: 'https://consensus.app'
  },
  {
    id: 'gamma',
    name: 'Gamma App',
    category: 'Diseño & Media',
    badge: 'Presentaciones & Documentos Inteligentes',
    description: 'Generador de presentaciones, documentos interactivos y páginas web con diseño limpio a partir de un simple outline o documento de texto.',
    academicUseCases: [
      'Preparación ágil de diapositivas para exposiciones orales en clases',
      'Transformación de un informe académico largo en un resumen ejecutivo visual',
      'Presentación de proyectos de emprendimiento universitario a inversionistas'
    ],
    recommendedPromptTemplate: 'Genera una presentación de 8 tarjetas visuales para universitarios sobre los 4 mitos más comunes de la inteligencia artificial en el trabajo. Estilo minimalista, visual y directo.',
    accessType: 'Freemium',
    url: 'https://gamma.app'
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    category: 'Programación',
    badge: 'Generador de UI en React + Tailwind',
    description: 'Herramienta de IA generativa que convierte descripciones de diseño en componentes funcionales de React estilizados con Tailwind CSS y accesibles.',
    academicUseCases: [
      'Construcción de prototipos de software en hackathons universitarios',
      'Diseño rápido de dashboards para proyectos de grado',
      'Aprendizaje de maquetación moderna e interactiva'
    ],
    recommendedPromptTemplate: 'Crea una tarjeta de perfil de estudiante universitario con progreso de créditos académicos, asignaturas pendientes y botón de agendar asesoría con tutor. Usa Tailwind CSS y diseño limpio.',
    accessType: 'Freemium',
    url: 'https://v0.dev'
  }
];

export const DEBATE_CASES: DebateCase[] = [
  {
    id: 'debate-1',
    title: 'Evaluaciones Universitarias: ¿Plagio o Calculadora Cognitiva?',
    category: 'Educación & Ética',
    context: 'En los años 70, muchas escuelas prohibieron las calculadoras científicas porque "destruirían la capacidad mental de los estudiantes". Hoy, el 84% de los estudiantes universitarios utilizan ChatGPT o Claude para sus tareas, pero muchas universidades aún lo consideran falta disciplinaria o fraude.',
    question: '¿Cómo debería la universidad evaluar el aprendizaje en la era de los modelos de lenguaje masivos?',
    options: [
      { id: 'opt-1', text: 'Prohibir y volver a exámenes manuscritos sin internet en sala vigilada.', votes: 42, percentage: 14 },
      { id: 'opt-2', text: 'Permitir el uso libre pero exigir declaración de prompts y reflexión crítica del proceso.', votes: 198, percentage: 66 },
      { id: 'opt-3', text: 'Cambiar completamente las evaluaciones hacia defensas orales y resolución de problemas prácticos imprevistos.', votes: 60, percentage: 20 }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Camila Morales',
        faculty: 'Derecho (4to año)',
        stance: 'A favor de la evaluación por procesos',
        text: 'En el ejercicio profesional nadie te pide que escribas un alegato a mano y sin consultar bases de datos. Lo que deben calificar es el criterio jurídico y la argumentación, no si me sé un artículo de memoria.',
        likes: 24,
        timestamp: 'Hace 12 min'
      },
      {
        id: 'c2',
        author: 'Nicolás Valdés',
        faculty: 'Ingeniería Civil',
        stance: 'Defensa oral y criterio práctico',
        text: 'La IA puede resolver cualquier derivada en un segundo. Si el examen es solo "calcule X", la prueba no mide ingeniería, mide mecanografía. La evaluación debe ser: "explícame por qué el puente no se cae ante este sismo".',
        likes: 31,
        timestamp: 'Hace 8 min'
      }
    ],
    instructorNote: 'María Elena Rúa & Eduardo Riveros señalan: La evaluación no puede seguir premiando la memoria enciclopédica que la IA tiene a costo cero. La educación superior debe migrar hacia la evaluación auténtica: el proceso de indagación, la metacognición y la capacidad de cuestionar las respuestas dadas por la máquina.'
  },
  {
    id: 'debate-2',
    title: 'La Paradoja del Profesional Junior: ¿Quién formará a la próxima generación?',
    category: 'Mercado Laboral & Empleabilidad',
    context: 'Tradicionalmente, las firmas contrataban graduados universitarios para realizar tareas iniciales (resúmenes, auditoría básica, transcripción, redacción preliminar). Esas tareas hoy las ejecuta un LLM en 30 segundos. Si las empresas prescinden de los puestos Junior, ¿cómo adquirirán los estudiantes la experiencia para convertirse en Seniors?',
    question: '¿Cuál es la solución más viable ante la reducción de puestos de entrada para recién graduados?',
    options: [
      { id: 'opt-a', text: 'Las universidades deben integrar proyectos reales con empresas desde el 1er año.', votes: 172, percentage: 55 },
      { id: 'opt-b', text: 'El nuevo rol Junior debe nacer como "Super-Analista Aumentado" que supervisa 10 flujos de IA.', votes: 104, percentage: 33 },
      { id: 'opt-c', text: 'Regulación estatal con incentivos fiscales para que las empresas contraten y formen talento joven.', votes: 38, percentage: 12 }
    ],
    comments: [
      {
        id: 'c3',
        author: 'Javiera Pino',
        faculty: 'Administración de Empresas',
        stance: 'Proyectos reales desde la universidad',
        text: 'La universidad tradicional nos enseña teoría desfasada por 5 años. Si salimos con un portafolio de proyectos prácticos donde demostramos cómo resolvimos un problema real usando IA, no necesitamos rogar por una pasantía básica.',
        likes: 19,
        timestamp: 'Hace 15 min'
      }
    ],
    instructorNote: 'En el diseño instruccional de Yo Aprendo enfatizamos: El estudiante universitario del 2026 debe abandonar la mentalidad de "aprendiz pasivo". El mercado premia al estudiante que llega con un portafolio visible y capacidad de orquestar herramientas de IA para resolver problemas de negocio desde el día uno.'
  },
  {
    id: 'debate-3',
    title: 'Derechos de Autor & Entrenamiento de Modelos: ¿Quién es el dueño de la obra?',
    category: 'Propiedad Intelectual',
    context: 'Millones de obras de artistas, periodistas, fotógrafos e ingenieros fueron utilizadas para entrenar los modelos de lenguaje y difusión sin compensación económica directa ni consentimiento explícito.',
    question: '¿Qué postura jurídica y ética debe prevalecer en la creación de contenidos asistida por IA?',
    options: [
      { id: 'd3-1', text: 'Pago obligatorio de regalías colectivas a creadores humanos cuyos datos entrenaron la IA.', votes: 145, percentage: 48 },
      { id: 'd3-2', text: 'Fair Use absoluto: el aprendizaje automático es equivalente a cómo un humano lee e inspira su obra.', votes: 62, percentage: 21 },
      { id: 'd3-3', text: 'Modelos de compensación por atribución opt-in: el creador decide si permite o no el entrenamiento.', votes: 93, percentage: 31 }
    ],
    comments: [
      {
        id: 'c4',
        author: 'Rodrigo Méndez',
        faculty: 'Diseño Multimedia',
        stance: 'Compensación por atribución opt-in',
        text: 'No es justo que una empresa multimillonaria entrene un modelo con el portafolio de un ilustrador independiente y luego venda una suscripción para generar imágenes idénticas a su estilo por 10 dólares.',
        likes: 27,
        timestamp: 'Hace 5 min'
      }
    ],
    instructorNote: 'Este dilema ético es fundamental en nuestras sesiones: el progreso tecnológico no puede cimentarse sobre la precarización del trabajo creativo. Como futuros profesionales, deben conocer la frontera entre la inspiración algorítmica y el uso legítimo de datos.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Según el informe Future of Jobs del Foro Económico Mundial, ¿cuál es el efecto neto proyectado de la IA en el mercado laboral global?',
    options: [
      'Destrucción masiva de empleo sin creación de nuevos puestos (-100M neto).',
      'Creación neta positiva de empleo: se desplazan ~85M de roles repetitivos pero se proyectan ~97M de nuevos roles híbridos.',
      'Cero impacto: el mercado laboral permanecerá inalterado en los próximos 10 años.',
      'Sustitución únicamente en carreras técnicas de programación informática.'
    ],
    correctIndex: 1,
    explanation: 'El WEF proyecta una creación neta positiva (~12M más de empleos), pero con un desafío gigantesco: los nuevos empleos exigen habilidades radicalmente distintas a las de los empleos desplazados.',
    points: 100
  },
  {
    id: 'q2',
    question: 'En la técnica de ingeniería de prompts "CLEAR", ¿qué representa la letra "E"?',
    options: [
      'Ejecución automática sin intervención humana.',
      'Enfoque o Rol experto que delimita la perspectiva y personalidad del modelo.',
      'Extensión máxima permitida en caracteres.',
      'Emotividad y tono afectivo del texto.'
    ],
    correctIndex: 1,
    explanation: 'En el marco CLEAR de Yo Aprendo (Contexto, Límite, Enfoque/Rol, Acción, Resultado), el Enfoque asigna el rol experto específico (ej: "Actúa como docente evaluador") para calibrar el vocabulario y criterio de la IA.',
    points: 100
  },
  {
    id: 'q3',
    question: '¿Cuál de las siguientes habilidades es considerada por los expertos como la más difícil de automatizar por la inteligencia artificial?',
    options: [
      'Lectura y resumen veloz de 500 páginas de texto.',
      'Detección de patrones en hojas de cálculo con millones de registros.',
      'Pensamiento crítico situado, empatía profunda y juicio ético en situaciones de alta incertidumbre.',
      'Generación de código funcional en lenguajes estructurados como Python o SQL.'
    ],
    correctIndex: 2,
    explanation: 'Las habilidades interpersonales profundas, la calibración ética moral y el discernimiento de valor ante situaciones inéditas son el núcleo insustituible del ser humano.',
    points: 100
  },
  {
    id: 'q4',
    question: '¿Qué es el "Grounding" (anclaje) en los modelos de inteligencia artificial aplicados al ámbito universitario?',
    options: [
      'Desconectar el computador de la red eléctrica para evitar hackeos.',
      'Vincular y restringir las respuestas del modelo a fuentes documentales verificadas (PDFs, papers, bases de datos) para evitar alucinaciones.',
      'Pedirle al modelo que responda únicamente con lenguaje informal.',
      'Instalar una tarjeta gráfica dedicada en el computador del estudiante.'
    ],
    correctIndex: 1,
    explanation: 'El grounding (como el que hace NotebookLM con tus apuntes) garantiza que el modelo no invente referencias o hechos, respondiendo con citas directas del material de estudio confiable.',
    points: 100
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-explorer',
    title: 'Explorador del Futuro',
    description: 'Inició su pasaporte de aprendizaje en la plataforma Yo Aprendo.',
    icon: '🧭',
    unlocked: true,
    unlockedAt: 'Hoy'
  },
  {
    id: 'badge-prompt-master',
    title: 'Arquitecto de Prompts',
    description: 'Evaluó y optimizó un prompt en el Laboratorio Práctico.',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'badge-ethical-thinker',
    title: 'Pensador Crítico & Ético',
    description: 'Participó y votó con argumento en un dilema profesional.',
    icon: '⚖️',
    unlocked: false
  },
  {
    id: 'badge-career-visionary',
    title: 'Estratega de Carrera 2030',
    description: 'Ejecutó una simulación de impacto laboral para su disciplina.',
    icon: '🔮',
    unlocked: false
  },
  {
    id: 'badge-quiz-champion',
    title: 'Graduado del Futuro',
    description: 'Completó el desafío interactivo con puntaje perfecto.',
    icon: '🏆',
    unlocked: false
  }
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 1,
    title: 'Inteligencia Artificial y el Futuro del Trabajo',
    subtitle: 'Navegando la transformación profesional para estudiantes universitarios',
    type: 'concept',
    content: {
      headline: '¿Amenaza de reemplazo o el superpoder definitivo?',
      bullets: [
        'Presentado por: Eduardo Riveros Quiroz (Yo Aprendo · www.aprendo.website) y María Elena Rúa',
        'Diseño instruccional creado para potenciar la agencia estudiantil y el pensamiento crítico',
        'Portal oficial de recursos y cursos: www.aprendo.website',
        'Durante esta sesión interactiva podrás votar en vivo, probar herramientas y obtener tu pasaporte de adaptabilidad'
      ],
      highlightQuote: 'La IA no te reemplazará; te reemplazará un colega de tu misma carrera que aprenda a amplificar su talento con IA.',
      interactiveAction: {
        label: 'Abrir Tendencias Laborales',
        targetTab: 'trends'
      }
    },
    instructorNotes: 'Dar la bienvenida cálida a los estudiantes. Mencionar que Yo Aprendo busca transformar la incertidumbre en ventaja estratégica. Pedir que abran la sesión interactiva en sus dispositivos.'
  },
  {
    id: 2,
    title: 'El Mapa de Tareas: Automatización vs Aumento',
    subtitle: 'Desarmando el mito de que los empleos desaparecen en bloque',
    type: 'data',
    content: {
      headline: 'Los trabajos no son monolitos: son paquetes de 30 a 50 tareas distintas',
      bullets: [
        'Tareas Mecánicas / Sintácticas (IA = 90% automatización): transcribir, formatear, buscar citas, clasificar correos',
        'Tareas de Análisis & Síntesis (Simbiosis = 70% aceleración): cruzar fuentes, modelar escenarios, detectar anomalías',
        'Tareas de Juicio, Ética & Empatía (Humanos = 100% ventaja): definir objetivos, asumir responsabilidad legal, calmar al paciente, inspirar al equipo',
        'Tu valor de mercado se medirá por el porcentaje de tu tiempo dedicado a las tareas de alta ventaja humana'
      ],
      highlightQuote: 'Si tu trabajo diario puede describirse como "seguir una receta repetitiva sin cuestionar", estás en riesgo. Si tu trabajo requiere calibrar contexto y tomar decisiones con juicio ético, estás en tu mejor momento.',
      interactiveAction: {
        label: 'Ver Matriz de Habilidades vs IA',
        targetTab: 'trends'
      }
    },
    instructorNotes: 'Explicar la diferencia entre "job destruction" y "task re-allocation". Poner ejemplos concretos para abogados, médicos, ingenieros y diseñadores en sala.'
  },
  {
    id: 3,
    title: 'Simulador de Exposición en Vivo por Carreras',
    subtitle: '¿Cómo impacta la IA en tu facultad y qué nuevos roles nacen?',
    type: 'activity',
    content: {
      headline: 'De espectadores pasivos a estrategas proactivos',
      bullets: [
        'Explora tu carrera en tiempo real en nuestro simulador impulsado por IA',
        'Analiza el índice de exposición, los roles emergentes y las herramientas recomendadas',
        'Descubre las 4 habilidades clave que tu plan de estudio actual probablemente no te está enseñando',
        'Pon a prueba carreras multidisciplinarias o escribe tu propia especialidad'
      ],
      highlightQuote: 'No estudies para ser un procesador de datos; para eso ya existen servidores en la nube. Estudia para ser quien formule las preguntas que ninguna máquina sabe formular.',
      interactiveAction: {
        label: 'Probar Simulador de Carreras',
        targetTab: 'simulator'
      }
    },
    instructorNotes: 'Pausar la presentación por 3 minutos. Invitar a 2 estudiantes de carreras distintas a ingresar su especialidad y comentar en voz alta los roles emergentes que el simulador proyecta.'
  },
  {
    id: 4,
    title: 'Caja de Herramientas & Ingeniería de Prompts',
    subtitle: 'El superpoder de hablarle a los modelos con estructura profesional',
    type: 'activity',
    content: {
      headline: 'El Método CLEAR: De prompts mediocres a resultados de grado profesional',
      bullets: [
        'C - Contexto: ¿En qué escenario se encuentra el problema y para qué público?',
        'L - Límite & Restricciones: ¿Qué cosas NO debe hacer el modelo? (longitud, tono, supuestos prohibidos)',
        'E - Enfoque & Rol: "Actúa como docente senior evaluador con 20 años de experiencia"',
        'A - Acción: Verbo rector preciso ("analiza", "diseña", "audita", "compara")',
        'R - Resultado & Formato: "¿En una tabla comparativa de 3 columnas o en viñetas ejecutivas?"'
      ],
      highlightQuote: 'La calidad del output de una inteligencia artificial es el espejo exacto de la claridad mental y el rigor del prompt humano.',
      interactiveAction: {
        label: 'Entrar al Laboratorio de Prompts',
        targetTab: 'tools'
      }
    },
    instructorNotes: 'Hacer una demostración en vivo en el evaluador de prompts. Mostrar cómo un mal prompt ("hazme un ensayo de derecho") mejora radicalmente con la estructura CLEAR.'
  },
  {
    id: 5,
    title: 'Dilemas Éticos & Debate en Tiempo Real',
    subtitle: 'El criterio humano puesto a prueba en situaciones complejas',
    type: 'debate',
    content: {
      headline: '¿Dónde trazamos la línea ética en el ejercicio profesional?',
      bullets: [
        'Caso en discusión: La paradoja de los profesionales Junior y la formación del talento joven',
        '¿Cómo justificarás tus honorarios si tu cliente sabe que usas IA para resolver sus casos?',
        'Votación interactiva en sala: observa cómo se distribuye la opinión de tus compañeros en tiempo real',
        'Aprender a debatir con argumentos fundamentados frente a la polarización'
      ],
      highlightQuote: 'En la era digital, la ética profesional ya no es una materia teórica de último semestre: es la licencia misma para seguir ejerciendo.',
      interactiveAction: {
        label: 'Ir a los Foros de Debate',
        targetTab: 'debates'
      }
    },
    instructorNotes: 'Abrir el dilema en pantalla gigante. Dar 60 segundos para que todos voten desde sus celulares. Analizar los porcentajes que aparecen en la barra de resultados.'
  },
  {
    id: 6,
    title: 'El Manifiesto de Yo Aprendo para Universitarios',
    subtitle: 'Conclusiones y compromisos de María Elena Rúa & Eduardo Riveros',
    type: 'takeaway',
    content: {
      headline: 'Las 4 Leyes de Adaptabilidad Universitaria',
      bullets: [
        '1. Adopta la IA temprano, pero mantén un escepticismo metodológico implacable.',
        '2. Construye un portafolio de proyectos prácticos con evidencia de valor real.',
        '3. Cultiva tu presencia humana, tu voz propia y tu capacidad de escucha sintonizada.',
        '4. Nunca dejes de aprender en www.aprendo.website: el título universitario no es el final de la carrera, es solo el boleto de entrada a la educación continua.'
      ],
      highlightQuote: 'El futuro no es algo que nos va a pasar; es algo que estamos diseñando en este instante con cada clic, cada pregunta y cada decisión ética.',
      interactiveAction: {
        label: 'Completar Quiz & Descargar Certificado',
        targetTab: 'presentation'
      }
    },
    instructorNotes: 'Cierre motivador. Agradecer a los estudiantes por su participación activa. Invitar a todos a completar el Quiz final para desbloquear su Certificado Digital de Yo Aprendo.'
  }
];
