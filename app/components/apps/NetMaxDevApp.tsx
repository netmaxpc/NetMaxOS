
'use client'

import React from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Code2, Smartphone, Database, Cloud, ExternalLink } from 'lucide-react'

interface NetMaxDevAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function NetMaxDevApp({ windowId, userSession }: NetMaxDevAppProps) {
  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">NetMax Dev</h1>
            <p className="text-gray-400">Custom Software Development Solutions</p>
          </div>

          {/* Services */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Development Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Smartphone className="h-5 w-5 text-green-400 mr-2" />
                    <h3 className="text-white font-medium">Mobile Apps</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Native and cross-platform mobile applications for iOS and Android.
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Database className="h-5 w-5 text-green-400 mr-2" />
                    <h3 className="text-white font-medium">Backend Systems</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Robust backend APIs and database architecture for scalable applications.
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Cloud className="h-5 w-5 text-green-400 mr-2" />
                    <h3 className="text-white font-medium">Cloud Solutions</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Cloud-native applications with microservices architecture.
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Code2 className="h-5 w-5 text-green-400 mr-2" />
                    <h3 className="text-white font-medium">Custom Software</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Tailored software solutions for specific business requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React Native', 'Flutter', 'Swift', 'Kotlin', 'React', 'Vue.js'].map(tech => (
                      <Badge key={tech} variant="outline" className="border-green-400 text-green-400">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'MongoDB', 'Redis'].map(tech => (
                      <Badge key={tech} variant="outline" className="border-green-400 text-green-400">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Cloud & DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    {['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Monitoring'].map(tech => (
                      <Badge key={tech} variant="outline" className="border-green-400 text-green-400">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Development Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Discovery & Planning', desc: 'Understanding requirements and technical specifications' },
                  { step: 2, title: 'Design & Architecture', desc: 'Creating system design and user experience mockups' },
                  { step: 3, title: 'Development & Testing', desc: 'Agile development with continuous testing and integration' },
                  { step: 4, title: 'Deployment & Support', desc: 'Production deployment with ongoing maintenance and support' },
                ].map(phase => (
                  <div key={phase.step} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {phase.step}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{phase.title}</h4>
                      <p className="text-gray-400 text-sm">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Start Your Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">
                Have a software idea? Let's discuss how we can bring it to life with 
                cutting-edge technology and best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-green-600 hover:bg-green-700 flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="border-gray-600 flex-1">
                  View Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
