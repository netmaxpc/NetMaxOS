
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Youtube, Users, Clock, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function YoutubeSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const channels = [
    {
      name: 'NetMaxPC Tech',
      description: 'Latest technology tutorials, product reviews, and tech news',
      subscribers: '15.2K',
      videos: '240+',
      category: 'Technology',
      lastUpdated: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop&crop=center',
      color: 'red'
    },
    {
      name: 'NetMaxPC Learning',
      description: 'Comprehensive IT training courses and programming tutorials',
      subscribers: '28.7K',
      videos: '450+',
      category: 'Education',
      lastUpdated: '1 day ago',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop&crop=center',
      color: 'blue'
    },
    {
      name: 'NetMaxPC Innovation',
      description: 'R&D projects, innovation showcases, and product development',
      subscribers: '8.9K',
      videos: '120+',
      category: 'Innovation',
      lastUpdated: '3 days ago',
      thumbnail: 'https://imgs.search.brave.com/aXe5VNiTNqpvp_XuQMMeCjb24YLHNFMkqz_wOaQ2wO0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjEv/MTk2LzAxMy9zbWFs/bC9mdXR1cmlzdGlj/LXRlY2hub2xvZ3kt/YmFja2dyb3VuZC1i/bHVlLWxpbmUtd2F2/ZS1saWdodC1zY3Jl/ZW4tYWJzdHJhY3Qt/aWxsdXN0cmF0aW9u/LXBob3RvLmpwZw',
      color: 'green'
    }
  ]

  const featuredVideos = [
    {
      title: 'AI/ML Course Introduction - Complete Roadmap 2024',
      duration: '12:45',
      views: '45K',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop&crop=center'
    },
    {
      title: 'Building IoT Solutions with NetMaxPC',
      duration: '18:32',
      views: '23K',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop&crop=center'
    },
    {
      title: 'Industry 4.0 & Digital Transformation',
      duration: '25:16',
      views: '67K',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop&crop=center'
    }
  ]

  const badgeColors = {
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800'
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
    <section ref={ref} id="youtube" className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">YouTube</span> Channels
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest technology trends, tutorials, and insights through 
            our comprehensive YouTube channel network.
          </p>
        </motion.div>

        {/* Channel Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {channels.map((channel, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Youtube className="h-6 w-6 text-red-600" />
                      <Badge className={badgeColors[channel.color as keyof typeof badgeColors]}>
                        {channel.category}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {channel.lastUpdated}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl text-gray-900 mb-2">
                    {channel.name}
                  </CardTitle>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {channel.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="font-bold text-lg text-gray-900">{channel.subscribers}</div>
                      <div className="text-xs text-gray-600">Subscribers</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Play className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="font-bold text-lg text-gray-900">{channel.videos}</div>
                      <div className="text-xs text-gray-600">Videos</div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Youtube className="mr-2 h-4 w-4" />
                    Visit Channel
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Videos */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Featured Videos
            </h3>
            <p className="text-lg text-gray-600">
              Check out some of our most popular content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVideos.map((video, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="relative">
                    <div className="aspect-video bg-gray-200 relative overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                            <Play className="h-8 w-8 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 leading-tight">
                      {video.title}
                    </h4>
                    <div className="text-sm text-gray-600">
                      {video.views} views
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Subscribe to Our Channels
            </h3>
            <p className="text-gray-600 mb-6">
              Don't miss out on the latest technology insights, tutorials, and innovations. 
              Subscribe to stay ahead of the curve.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Youtube className="mr-2 h-5 w-5" />
              Subscribe Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
