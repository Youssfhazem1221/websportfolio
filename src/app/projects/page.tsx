import projects from '@/data/projects.json';

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-16">
        <p className="text-sm text-gray-500 mb-6 tracking-wide uppercase">Portfolio</p>
        <h1 className="text-4xl font-medium text-accent mb-6">Projects</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          A selection of websites and digital strategies I've built for Egyptian businesses. Each project is designed to grow their customer base and revenue.
        </p>
      </div>

      <div className="space-y-16">
        {projects.map((project: any) => (
          <div key={project.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="overflow-hidden bg-muted rounded-sm">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="md:pt-8">
              <p className="text-sm text-gray-500 mb-2">{project.year} — {project.role}</p>
              <h2 className="text-2xl font-medium text-accent mb-3">{project.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{project.subtitle}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="text-xs text-gray-400 bg-muted px-3 py-1 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
