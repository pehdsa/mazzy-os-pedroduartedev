// Configuração das tags pra geração de capas (Highlights + Stories).
// Atualize aqui pra refletir nas duas saídas de uma vez.

window.TAGS = [
  { slug: 'news',         name: 'News',         color: '#7C3AED', icon: 'newspaper',      desc: 'Notícias, lançamentos e tendências da cena tech.' },
  { slug: 'concepts',     name: 'Concepts',     color: '#06B6D4', icon: 'lightbulb',      desc: 'Fundamentos da engenharia de software, explicados.' },
  { slug: 'code',         name: 'Code',         color: '#3B82F6', icon: 'code',           desc: 'Código limpo, refatoração e boas práticas.' },
  { slug: 'architecture', name: 'Architecture', color: '#8B5CF6', icon: 'layers',         desc: 'Arquitetura, design de sistemas e decisões técnicas.' },
  { slug: 'ai',           name: 'AI',           color: '#EC4899', icon: 'sparkles',       desc: 'Inteligência artificial aplicada ao desenvolvimento.' },
  { slug: 'career',       name: 'Career',       color: '#F59E0B', icon: 'briefcase',      desc: 'Carreira em tech, entrevistas e crescimento profissional.' },
  { slug: 'tools',        name: 'Tools',        color: '#10B981', icon: 'wrench',         desc: 'Ferramentas, libs e frameworks que valem conhecer.' },
  { slug: 'study',        name: 'Study',        color: '#22D3EE', icon: 'graduation-cap', desc: 'Resumos, livros, cursos e aprendizados pessoais.' },
  { slug: 'security',     name: 'Security',     color: '#EF4444', icon: 'shield',         desc: 'Autenticação, proteção de APIs, OWASP e boas práticas.' },
  { slug: 'devops',       name: 'DevOps',       color: '#F97316', icon: 'server',         desc: 'Deploy, Docker, CI/CD, cloud e infraestrutura.' },
  { slug: 'opinion',      name: 'Opinion',      color: '#A78BFA', icon: 'message-circle', desc: 'Comentários e experiências sobre o mundo dev.' },
];

// Lucide icon paths (versão simplificada, viewBox 24x24)
window.ICONS = {
  'newspaper':      '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/>',
  'lightbulb':      '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  'code':           '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
  'layers':         '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  'sparkles':       '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  'briefcase':      '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  'wrench':         '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  'graduation-cap': '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  'shield':         '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  'server':         '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
  'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
};
