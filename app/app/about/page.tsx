
import { Building2, Users, Target, Award, Calendar, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function AboutPage() {
  const milestones = [
    {
      year: '2001',
      title: 'Company Founded',
      description: 'NetMaxPC established in the United States as a pioneering technology solutions provider'
    },
    {
      year: '2010',
      title: 'NetMaxWeb Launch',
      description: 'Launched NetMaxWeb focusing on modern web development and design solutions'
    },
    {
      year: '2015',
      title: 'Financial Technology',
      description: 'NetMax Accounting established, bringing AI-powered financial solutions to businesses'
    },
    {
      year: '2018',
      title: 'Software Development',
      description: 'NetMaxDev launched for custom software and mobile app development'
    },
    {
      year: '2020',
      title: 'E-commerce Platform',
      description: 'Launched 209 e-commerce platform featuring trending products and collectibles'
    },
    {
      year: '2021',
      title: 'Marketplace Innovation',
      description: 'Introduced Barters Bargains and Snapchatables, revolutionizing digital commerce'
    },
    {
      year: '2022',
      title: 'AI Revolution',
      description: 'SwiftSell AI launched, leading corporate AI transformation across America'
    }
  ]

  const stats = [
    { icon: Users, label: 'Professionals Trained', value: '10,000+' },
    { icon: Building2, label: 'Corporate Partners', value: '50+' },
    { icon: Award, label: 'Products Developed', value: '15+' },
    { icon: Target, label: 'Years of Excellence', value: '23+' }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-red-600">NetMaxPC</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Led by CEO Clay Thomas, NetMaxPC is a pioneering US-based technology company dedicated to delivering 
              cutting-edge solutions that bridge innovation with practical business applications. For over two decades, 
              we've been at the forefront of app development, AI training & deployment, and business transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <stat.icon className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-blue-600">
                  <Target className="h-8 w-8" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To empower businesses across the United States with AI-driven solutions, comprehensive 
                  app & website development, and transformative training programs that prepare organizations 
                  for the AI-powered future.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-blue-600">
                  <Award className="h-8 w-8" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To be America's leading technology ecosystem, where innovative companies under NetMaxPC's 
                  umbrella collaborate to deliver revolutionary AI solutions, transforming how businesses 
                  operate and compete in the digital economy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Two decades of innovation and excellence</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-6 w-6 text-blue-600" />
                        <CardTitle className="text-xl text-blue-600">{milestone.year}</CardTitle>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Network</h2>
            <p className="text-xl text-gray-600">Serving businesses nationwide across the United States</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-red-600">
                  <MapPin className="h-6 w-6" />
                  NetMaxPC Headquarters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  United States<br />
                  Nationwide Service Coverage
                </p>
                <p className="text-red-600 font-medium">Technology Hub & Corporate Leadership</p>
                <p className="text-gray-500 text-sm mt-2">Led by CEO Clay Thomas</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-red-600">
                  <MapPin className="h-6 w-6" />
                  Company Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  NetMaxWeb • NetMaxDev • NetMax Accounting<br />
                  209 • Barters Bargains • Snapchatables • SwiftSell AI
                </p>
                <p className="text-red-600 font-medium">Comprehensive Technology Ecosystem</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
