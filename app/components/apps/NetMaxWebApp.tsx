
'use client'

import React from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Globe, Code, Smartphone, Zap, ExternalLink } from 'lucide-react'

interface NetMaxWebAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function NetMaxWebApp({ windowId, userSession }: NetMaxWebAppProps) {
  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">NetMax Web</h1>
            <p className="text-gray-400">Professional Web Development Services</p>
          </div>

          {/* Services */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Our Web Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Code className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="text-white font-medium">Custom Websites</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Tailored websites built with modern technologies and best practices.
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Smartphone className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="text-white font-medium">Responsive Design</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Mobile-first designs that work perfectly on all devices.
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="text-white font-medium">Performance Optimization</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Lightning-fast websites optimized for speed and SEO.
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Globe className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="text-white font-medium">E-commerce Solutions</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Complete online stores with payment processing and inventory management.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Technologies We Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma', 'Vercel'].map(tech => (
                  <Badge key={tech} variant="outline" className="border-blue-400 text-blue-400">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Projects */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Recent Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">Corporate Website Redesign</h4>
                  <Badge className="bg-green-500">Completed</Badge>
                </div>
                <p className="text-gray-400 text-sm">Modern, responsive corporate website with CMS integration.</p>
              </div>

              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">E-commerce Platform</h4>
                  <Badge className="bg-blue-500">In Progress</Badge>
                </div>
                <p className="text-gray-400 text-sm">Full-featured online store with payment processing and analytics.</p>
              </div>

              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">SaaS Application</h4>
                  <Badge className="bg-yellow-500">Planning</Badge>
                </div>
                <p className="text-gray-400 text-sm">Cloud-based software solution with subscription management.</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Get Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">
                Ready to build your next web project? Our team of experienced developers 
                is here to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start a Project
                </Button>
                <Button variant="outline" className="border-gray-600 flex-1">
                  View Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
