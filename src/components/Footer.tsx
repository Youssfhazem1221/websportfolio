'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Youssf Hazem. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="mailto:youssf.hazem1221@gmail.com" className="text-gray-500 hover:text-accent transition-colors">
              youssf.hazem1221@gmail.com
            </a>
            <span className="text-gray-300">|</span>
            <a href="https://wa.me/201069237525" className="text-gray-500 hover:text-accent transition-colors">
              WhatsApp
            </a>
            <span className="text-gray-300">|</span>
            <a href="https://t.me/youssf_hazem" className="text-gray-500 hover:text-accent transition-colors">
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
