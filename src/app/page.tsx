import Link from 'next/link';
import projects from '@/data/projects.json';

export default function Home() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <p className="text-sm text-gray-500 mb-6 tracking-wide uppercase">
            Web Developer & Business Analyst
          </p>
          <h1 className="text-5xl md:text-6xl font-medium text-accent mb-8 leading-tight">
            Business digital experiences<br />
            that grow businesses.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl">
            I build professional, scalable websites and digital strategies for Egyptian businesses — from e-commerce platforms to clinic websites. Zero upfront cost. You only pay if you're satisfied.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/projects" className="text-sm border-b border-accent pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
              View Projects →
            </Link>
            <Link href="/contact" className="text-sm border-b border-gray-300 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-medium text-accent">Selected Work</h2>
          <Link href="/projects" className="text-sm text-gray-500 hover:text-accent transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project: any) => (
            <Link href="/projects" key={project.id} className="group block">
              <div className="overflow-hidden bg-muted rounded-sm mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-medium text-accent mb-2 group-hover:text-gray-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{project.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-xs text-gray-400 bg-muted px-3 py-1 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-medium text-accent mb-2">10+</p>
            <p className="text-sm text-gray-500">Projects Completed</p>
          </div>
          <div>
            <p className="text-4xl font-medium text-accent mb-2">5+</p>
            <p className="text-sm text-gray-500">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl font-medium text-accent mb-2">100%</p>
            <p className="text-sm text-gray-500">Client Satisfaction</p>
          </div>
        </div>
      </section>
    </div>
  );
}
