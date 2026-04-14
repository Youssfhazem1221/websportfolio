import Link from 'next/link';

export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <p className="text-sm text-gray-500 mb-6 tracking-wide uppercase">Blog</p>
        <h1 className="text-4xl font-medium text-accent mb-6">Insights & Updates</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-12">
          Thoughts on web development, business strategy, and helping Egyptian businesses grow through digital presence.
        </p>

        <div className="border-t border-border pt-12 text-center">
          <div className="py-20">
            <p className="text-6xl mb-6">📝</p>
            <h2 className="text-2xl font-medium text-accent mb-4">Coming Soon</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              I'm preparing helpful articles about web development, SEO, and digital strategy for Egyptian businesses. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
