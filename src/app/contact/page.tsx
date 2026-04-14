export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <p className="text-sm text-gray-500 mb-6 tracking-wide uppercase">Contact</p>
        <h1 className="text-4xl font-medium text-accent mb-6">Let's Work Together</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-12">
          Have a project in mind? I'd love to hear about it. Reach out and let's discuss how I can help grow your business.
        </p>

        <div className="space-y-8">
          <div className="border-b border-border pb-8">
            <h3 className="text-sm font-medium text-accent mb-2">Email</h3>
            <a href="mailto:youssf.hazem1221@gmail.com" className="text-xl text-gray-600 hover:text-accent transition-colors">
              youssf.hazem1221@gmail.com
            </a>
          </div>

          <div className="border-b border-border pb-8">
            <h3 className="text-sm font-medium text-accent mb-2">WhatsApp</h3>
            <a href="https://wa.me/201069237525" className="text-xl text-gray-600 hover:text-accent transition-colors">
              01069237525
            </a>
          </div>

          <div className="border-b border-border pb-8">
            <h3 className="text-sm font-medium text-accent mb-2">Telegram</h3>
            <a href="https://t.me/youssf_hazem" className="text-xl text-gray-600 hover:text-accent transition-colors">
              @youssf_hazem
            </a>
          </div>

          <div className="border-b border-border pb-8">
            <h3 className="text-sm font-medium text-accent mb-2">Response Time</h3>
            <p className="text-gray-600">
              I typically respond within a few hours during business hours (Sat-Thu, 9AM-9PM Cairo time).
            </p>
          </div>
        </div>

        <div className="mt-16 p-8 bg-muted rounded-sm">
          <h3 className="text-lg font-medium text-accent mb-3">Ready to start?</h3>
          <p className="text-gray-600">
            I offer a free 15-minute discovery call to discuss your project and goals. No commitment, no pressure — just a conversation about how I can help.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="mt-20 border-t border-border pt-16">
          <h2 className="text-2xl font-medium text-accent mb-8">Send a Message</h2>
          <form 
            action="https://formspree.io/f/youssf.hazem1221@gmail.com" 
            method="POST" 
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-gray-500 uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-sm focus:outline-none focus:border-accent transition-colors placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-500 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-sm focus:outline-none focus:border-accent transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-gray-500 uppercase tracking-wide">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="How can I help you?"
                className="w-full px-4 py-3 bg-muted border border-border rounded-sm focus:outline-none focus:border-accent transition-colors placeholder:text-gray-400 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-accent text-white rounded-sm hover:bg-gray-800 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
