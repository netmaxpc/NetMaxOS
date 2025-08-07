
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, MapPin, Users, Briefcase, ExternalLink, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function CompaniesSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const companies = [
    {
      name: 'NetMaxPC',
      location: 'United States',
      established: '2001',
      focus: 'Technology Hub & Platform',
      description: 'The flagship technology platform providing comprehensive solutions for app development, AI training, and business development across the United States.',
      employees: '50+',
      highlights: [
        'Full app & website development',
        'AI training & deployment',
        'Corporate AI transformation',
        'Small business development'
      ],
      website: 'netmaxpc.com',
      color: 'blue'
    },
    {
      name: 'NetMaxWeb',
      location: 'United States',
      established: '2010',
      focus: 'Web Development & Design',
      description: 'Specialized web development company creating modern, responsive websites and web applications for businesses of all sizes.',
      employees: '15+',
      highlights: [
        'Custom website development',
        'E-commerce solutions',
        'Responsive design',
        'SEO optimization'
      ],
      website: 'netmaxweb.com',
      color: 'green'
    },
    {
      name: 'NetMax Accounting',
      location: 'United States',
      established: '2015',
      focus: 'Financial Technology',
      description: 'Comprehensive accounting and financial technology solutions for modern businesses, integrating AI-powered automation and analytics.',
      employees: '12+',
      highlights: [
        'AI-powered accounting',
        'Financial automation',
        'Tax compliance solutions',
        'Business analytics'
      ],
      website: 'netmaxaccounting.com',
      color: 'purple'
    },
    {
      name: 'NetMaxDev',
      location: 'United States',
      established: '2018',
      focus: 'Software Development',
      description: 'Custom software development company specializing in mobile apps, enterprise solutions, and AI-integrated applications.',
      employees: '20+',
      highlights: [
        'Mobile app development',
        'Enterprise software',
        'AI integration',
        'Cloud solutions'
      ],
      website: 'netmaxdev.com',
      color: 'red'
    },
    {
      name: '209',
      location: 'United States',
      established: '2020',
      focus: 'E-commerce & Retail',
      description: 'Modern e-commerce platform featuring trending products and collectibles with integrated technology solutions.',
      employees: '8+',
      highlights: [
        'Trending products',
        'Collectibles marketplace',
        'Tech accessories',
        'Customer-focused service'
      ],
      website: '209er.com',
      color: 'indigo'
    },
    {
      name: 'Barters Bargains',
      location: 'United States',
      established: '2021',
      focus: 'Digital Marketplace',
      description: 'Innovative marketplace platform connecting buyers and sellers with smart bargaining technology and AI-powered pricing recommendations.',
      employees: '6+',
      highlights: [
        'Smart bargaining system',
        'AI pricing recommendations',
        'Secure transactions',
        'Community-driven marketplace'
      ],
      website: 'bartersbargains.com',
      color: 'teal'
    },
    {
      name: 'Snapchatables',
      location: 'United States',
      established: '2021',
      focus: 'Social Commerce',
      description: 'Social commerce platform combining social media engagement with seamless shopping experiences for the modern digital consumer.',
      employees: '8+',
      highlights: [
        'Social commerce integration',
        'Interactive shopping',
        'Influencer partnerships',
        'Mobile-first platform'
      ],
      website: 'snapchatables.com',
      color: 'pink'
    },
    {
      name: 'SwiftSell AI',
      location: 'United States',
      established: '2022',
      focus: 'AI Sales Solutions',
      description: 'Revolutionary AI-powered sales platform helping businesses automate and optimize their sales processes with cutting-edge technology.',
      employees: '10+',
      highlights: [
        'AI sales automation',
        'Lead generation',
        'Customer analytics',
        'Sales optimization'
      ],
      website: 'swiftsellai.com',
      color: 'orange'
    }
  ]

  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-green-50 to-green-100 border-green-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200',
    red: 'from-red-50 to-red-100 border-red-200',
    indigo: 'from-indigo-50 to-indigo-100 border-indigo-200',
    orange: 'from-orange-50 to-orange-100 border-orange-200',
    teal: 'from-teal-50 to-teal-100 border-teal-200',
    pink: 'from-pink-50 to-pink-100 border-pink-200'
  }

  const badgeColorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    red: 'bg-red-100 text-red-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    orange: 'bg-orange-100 text-orange-800',
    teal: 'bg-teal-100 text-teal-800',
    pink: 'bg-pink-100 text-pink-800'
  }

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
    <section ref={ref} id="companies" className="py-20 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">Company Network</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive ecosystem of US-based technology companies led by CEO Clay Thomas, 
            delivering innovative AI solutions, app development, and business transformation services.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {companies.map((company, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`h-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 bg-gradient-to-br ${colorClasses[company.color as keyof typeof colorClasses]} group hover:scale-105`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-6 w-6 text-blue-600" />
                      <Badge className={`${badgeColorClasses[company.color as keyof typeof badgeColorClasses]}`}>
                        Est. {company.established}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {company.employees}
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl text-gray-900 mb-2">
                    {company.name}
                  </CardTitle>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="h-4 w-4" />
                      {company.focus}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    {company.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Highlights:</h4>
                    <ul className="space-y-2">
                      {company.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                      onClick={() => {
                        if (company.website === '209er.com') {
                          window.open(`https://${company.website}`, '_blank')
                        } else {
                          // For other websites, you can add logic here
                          window.open(`https://${company.website}`, '_blank')
                        }
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </Button>
                  </div>
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
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Partner with NetMaxPC Network
            </h3>
            <p className="text-gray-600 mb-6">
              Join our ecosystem of technology companies and leverage our combined expertise 
              for your digital transformation journey.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Explore Partnership Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
