
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Play, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { label: 'Years of Excellence', value: 23 },
    { label: 'Professionals Trained', value: 10000 },
    { label: 'Corporate Partners', value: 50 },
    { label: 'Products Developed', value: 15 }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-red-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/netmaxpc-logo.png"
                    alt="NetMaxPC Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-3xl font-bold text-white">NetMaxPC</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Technology
                <span className="text-red-500 block">Solutions Hub</span>
              </h1>
            </motion.div>

            <motion.p 
              className="text-xl text-gray-300 leading-relaxed max-w-lg"
              variants={itemVariants}
            >
              Led by CEO Clay Thomas, we deliver full app & website development, AI training & deployment, 
              and corporate transformation services across the United States. Your partner in the AI future.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                <span>Explore Our Solutions</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-red-600 text-red-600 hover:bg-red-950">
                <Play className="mr-2 h-5 w-5" />
                <span>Watch Demo</span>
              </Button>
            </motion.div>

            <motion.div 
              className="bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-red-600"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-red-500">{stats[currentStat]?.value?.toLocaleString()}+</h3>
                  <p className="text-gray-300 font-medium">{stats[currentStat]?.label}</p>
                </div>
                <div className="flex space-x-2">
                  {stats.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStat ? 'bg-red-600' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual Elements */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Main Visual Card */}
              <div className="bg-gray-900 border border-red-600 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">N</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">NetMaxPC Platform</h3>
                      <p className="text-gray-400 text-sm">Technology Excellence</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-950 rounded-lg">
                      <span className="text-gray-300">IT Training</span>
                      <span className="text-red-400 font-semibold">Active</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-950 rounded-lg">
                      <span className="text-gray-300">R&D Solutions</span>
                      <span className="text-green-400 font-semibold">Live</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-950 rounded-lg">
                      <span className="text-gray-300">Product Development</span>
                      <span className="text-purple-400 font-semibold">Growing</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Our Store
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -left-4 bg-red-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">23+</div>
                  <div className="text-xs opacity-90">Years</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-red-700 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-xs opacity-90">Trained</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
