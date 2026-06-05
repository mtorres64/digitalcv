const cvData = {
  name: 'Marcelo Alejandro Torres',
  title: 'Ing. en Computación — Desarrollador .NET Full Stack',
  subtitle: '.NET Full Stack Developer · +8 años de experiencia',
  profile:
    'Ingeniero en Computación y Desarrollador .NET Full Stack con más de 8 años de experiencia en el desarrollo de aplicaciones empresariales utilizando .NET Core, C#, APIs REST, SQL, MongoDB y Azure. Fuerte capacidad analítica, foco en calidad, y experiencia en mantenimiento, optimización y automatización de procesos. Especialista en backend, APIs y arquitectura limpia.',
  contact: {
    email: 'ing.torresma@gmail.com',
    location: 'Argentina',
    linkedin: 'linkedin.com/in/marcelo-alejandro-torres',
    github: 'github.com',
  },
  stats: {
    yearsExperience: 8,
    projects: 20,
    technologies: 15,
  },
  skills: [
    {
      category: 'Lenguajes & Frameworks',
      items: ['C#', '.NET Core', '.NET 6/7', 'ASP.NET Core', 'Entity Framework Core', '.NET Framework', 'JavaScript', 'Angular'],
    },
    {
      category: 'Bases de Datos',
      items: ['SQL Server', 'OracleDB', 'MySQL', 'MongoDB', 'PostgreSQL'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['Azure Functions', 'Azure App Service', 'Azure Storage', 'Azure DevOps', 'CI/CD', 'Git', 'GitFlow'],
    },
    {
      category: 'Arquitectura',
      items: ['APIs REST', 'Microservicios', 'Clean Architecture', 'DDD', 'Patrones de diseño', 'Programación asíncrona', 'Multithreading'],
    },
  ],
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'Accenture',
      period: '2024 – Presente',
      client: 'YPF',
      industry: 'Oil & Energy · Argentina',
      location: 'Argentina',
      responsibilities: [
        'Desarrollo y mantenimiento de aplicaciones empresariales en .NET Core y C#',
        'Optimización de sistema de logística y ruteo con mejoras de rendimiento significativas',
        'Implementación de Azure Functions y automatización de procesos críticos de negocio',
        'Desarrollo de APIs REST y servicios internos de alta disponibilidad',
        'CI/CD con Azure DevOps: pipelines, repositorios y gestión de boards',
      ],
      technologies: ['.NET Core', 'C#', 'Azure Functions', 'Azure DevOps', 'SQL Server', 'REST APIs'],
    },
    {
      role: 'Full Stack Developer',
      company: 'Accenture',
      period: '2021 – 2024',
      client: 'DirecTV',
      industry: 'TV Satelital · Argentina',
      location: 'Argentina',
      responsibilities: [
        'Desarrollo de aplicaciones web, APIs y servicios backend en .NET Core',
        'Implementación de nuevas funcionalidades en plataformas de cliente',
        'Mantenimiento evolutivo y corrección de errores en aplicaciones Angular',
        'Optimización de consultas y procedimientos almacenados en OracleDB',
        'Colaboración en equipos ágiles con metodología Scrum',
      ],
      technologies: ['.NET Core', 'Angular', 'OracleDB', 'C#', 'REST APIs', 'Scrum'],
    },
    {
      role: 'Developer',
      company: 'Infomanager',
      period: '2020',
      client: null,
      industry: 'Software · Argentina',
      location: 'Argentina',
      responsibilities: [
        'Desarrollo en .NET Framework para sistema de gestión comercial',
        'Optimización de consultas SQL y procedimientos almacenados en MySQL',
        'Análisis y relevamiento de requerimientos con usuarios finales',
      ],
      technologies: ['.NET Framework', 'C#', 'MySQL', 'SQL'],
    },
    {
      role: 'Developer',
      company: 'Ministerio de Educación',
      period: '2016 – 2019',
      client: null,
      industry: 'Sector Público · Argentina',
      location: 'Argentina',
      responsibilities: [
        'Desarrollo y mantenimiento de portales institucionales educativos',
        'Creación de reportes y dashboards para toma de decisiones directivas',
        'Gestión y administración de bases de datos PostgreSQL',
        'Soporte técnico y capacitación a usuarios internos',
      ],
      technologies: ['.NET', 'PostgreSQL', 'JavaScript', 'HTML/CSS'],
    },
  ],
  projects: [
    {
      title: 'Optimización Logística con IA',
      description:
        'Sistema de optimización de rutas y logística empresarial con algoritmos de IA para YPF. Reducción significativa de costos operativos y tiempos de entrega.',
      technologies: ['.NET Core', 'C#', 'Azure', 'SQL Server', 'AI/ML'],
      icon: 'FiTruck',
      color: '#6366f1',
    },
    {
      title: 'Sistema de Gestión de Stock',
      description:
        'Aplicación de gestión de inventario y stock en .NET con dashboard en tiempo real, alertas automáticas y reportes exportables.',
      technologies: ['.NET', 'C#', 'SQL Server', 'ASP.NET', 'Angular'],
      icon: 'FiPackage',
      color: '#0891b2',
    },
    {
      title: 'Software de Gestión Educativa',
      description:
        'Sistema freelance para institución educativa con módulos de alumnos, calificaciones, asistencia y reportes. Implementado en producción con más de 500 usuarios activos.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
      icon: 'FiBookOpen',
      color: '#7c3aed',
    },
    {
      title: 'Aplicación para Gym',
      description:
        'Aplicación web freelance para gestión de gimnasio: control de socios, turnos, rutinas y facturación. Integración de control de acceso con molinete y lector biométrico de huellas.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', '.NET'],
      icon: 'FiActivity',
      color: '#059669',
    },
    {
      title: 'Sistema de Facturación y Ventas',
      description:
        'Sistema freelance para comercios con gestión de ventas, emisión de facturas, control de stock, clientes y reportes de caja diaria.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
      icon: 'FiShoppingCart',
      color: '#d97706',
    },
    {
      title: 'Gestión de Cajas de Seguridad',
      description:
        'Software freelance para administración de cajas de seguridad: asignación de cajas, control de accesos, vencimientos de contratos y notificaciones automáticas.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
      icon: 'FiLock',
      color: '#0891b2',
    },
  ],
  education: [
    {
      degree: 'Ingeniería en Computación',
      institution: 'Universidad Nacional',
      period: 'Graduado',
      type: 'degree',
    },
    {
      degree: 'Analista en Computación',
      institution: 'Universidad Nacional',
      period: 'Graduado',
      type: 'degree',
    },
    {
      degree: 'Formación continua en .NET, Front-End, Azure, SQL y Arquitectura de software',
      institution: 'Plataformas de formación online y certificaciones',
      period: 'En curso',
      type: 'certification',
    },
  ],
};

export default cvData;
