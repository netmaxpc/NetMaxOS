
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Smartphone, 
  Globe, 
  Brain, 
  Building2, 
  TrendingUp, 
  Zap,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const features = [
    {
      icon: Smartphone,
      title: 'App Development',
      description: 'Full-scale mobile and web application development using cutting-edge technologies and frameworks for iOS, Android, and cross-platform solutions.',
      highlight: 'End-to-end app solutions',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Custom website development from simple landing pages to complex enterprise solutions, with responsive design and modern frameworks.',
      highlight: 'Modern web solutions',
      color: 'green'
    },
    {
      icon: Brain,
      title: 'AI Training & Deployment',
      description: 'Comprehensive AI training programs and deployment services to help businesses integrate artificial intelligence into their operations.',
      highlight: 'AI-powered transformation',
      color: 'purple'
    },
    {
      icon: Building2,
      title: 'Corporate AI Training',
      description: 'Specialized training programs for corporations stepping into the AI future, helping teams understand and implement AI technologies.',
      highlight: 'Enterprise AI readiness',
      color: 'red'
    },
    {
      icon: TrendingUp,
      title: 'Small Business Development',
      description: 'Tailored solutions for small businesses to grow and scale using technology, automation, and digital transformation strategies.',
      highlight: 'Growth-focused solutions',
      color: 'indigo'
    },
    {
      icon: Zap,
      title: 'Technology Integration',
      description: 'Seamless integration of new technologies into existing business processes, ensuring smooth digital transformation journeys.',
      highlight: 'Seamless tech adoption',
      color: 'orange'
    }
  ]

  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-green-50 to-green-100 border-green-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200',
    red: 'from-red-50 to-red-100 border-red-200',
    indigo: 'from-indigo-50 to-indigo-100 border-indigo-200',
    orange: 'from-orange-50 to-orange-100 border-orange-200'
  }

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
    indigo: 'text-indigo-600',
    orange: 'text-orange-600'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">Core Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Led by CEO Clay Thomas, NetMaxPC delivers cutting-edge technology solutions 
            that empower businesses across the United States to thrive in the AI-driven future.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`h-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 bg-gradient-to-br ${colorClasses[feature.color as keyof typeof colorClasses]} group hover:scale-105`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${iconColorClasses[feature.color as keyof typeof iconColorClasses]}`} />
                  </div>
                  <CardTitle className="text-xl text-gray-900 mb-2">
                    {feature.title}
                  </CardTitle>
                  <div className={`text-sm font-semibold ${iconColorClasses[feature.color as keyof typeof iconColorClasses]} mb-3`}>
                    {feature.highlight}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
            Learn More About Our Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
