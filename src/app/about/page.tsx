export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <p className="text-sm text-gray-500 mb-6 tracking-wide uppercase">About</p>
        <h1 className="text-4xl font-medium text-accent mb-8">Youssf Hazem</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p className="text-lg">
            I'm a web developer and business analyst based in Egypt, specializing in building digital experiences that help businesses grow their customer base and revenue.
          </p>
          <p>
            With over 5 years of experience and 10+ completed projects, I combine web development, business strategy, and marketing expertise to deliver results — not just pretty pages. Every website I build is designed with your ROI in mind: more patients, more revenue, more trust.
          </p>
          <p>
            What sets me apart is my risk-free approach: I build your website first, and you only pay if you're 100% satisfied. This means zero upfront cost and zero risk for you.
          </p>
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-medium text-accent mb-8">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-accent mb-3">Development</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Next.js & React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Supabase & PostgreSQL</li>
                <li>API Development</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-accent mb-3">Business & Marketing</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Business Analysis</li>
                <li>Marketing Strategy</li>
                <li>SEO Optimization</li>
                <li>Conversion Optimization</li>
                <li>Analytics & Reporting</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-medium text-accent mb-8">Experience</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-accent mb-1">Freelance Web Developer & Business Analyst</h3>
              <p className="text-sm text-gray-500 mb-3">2021 — Present</p>
              <p className="text-gray-600">
                Building professional websites and digital strategies for Egyptian businesses. Specializing in e-commerce, clinic websites, and scalable web applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
