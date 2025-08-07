
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = 2024

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/netmaxpc-logo.png"
                  alt="NetMaxPC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">NetMaxPC</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Led by CEO Clay Thomas, your comprehensive technology solutions hub delivering 
              AI training, app development, and business transformation across the United States.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#companies" className="text-gray-400 hover:text-white transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-red-400" />
                <div>
                  <div>+1-555-NETMAX</div>
                  <div>+1-800-NETMAX</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-red-400" />
                <div>
                  <div>info@netmaxpc.com</div>
                  <div>support@netmaxpc.com</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-red-400" />
                <div>
                  <div>United States</div>
                  <div>Nationwide Service</div>
                </div>
              </li>
            </ul>
          </div>

          {/* External Link */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Store</h3>
            <p className="text-gray-400 text-sm mb-4">
              Visit our Shopify store for the latest technology products and solutions.
            </p>
            <a
              href="https://209er.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
            >
              Visit 209er.com <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} NetMaxPC. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Technology Solutions • Innovation • Excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
