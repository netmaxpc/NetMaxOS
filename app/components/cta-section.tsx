
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Phone, Mail, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CTASection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-12">
            Join thousands of professionals and organizations who trust NetMaxPC for their 
            technology solutions. Let's build the future together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              variants={itemVariants}
            >
              <div className="text-3xl font-bold mb-2">23+</div>
              <div className="text-blue-200">Years of Excellence</div>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              variants={itemVariants}
            >
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Professionals Trained</div>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              variants={itemVariants}
            >
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Corporate Partners</div>
            </motion.div>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              asChild
            >
              <a href="https://209er.com" target="_blank" rel="noopener noreferrer">
                Visit Our Store
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center text-blue-100"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>+91-8699-644644</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>info@netmaxpc.com</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full"></div>
      <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full"></div>
      <div className="absolute bottom-20 left-32 w-16 h-16 bg-white/5 rounded-full"></div>
      <div className="absolute bottom-32 right-10 w-24 h-24 bg-white/5 rounded-full"></div>
    </section>
  )
}
