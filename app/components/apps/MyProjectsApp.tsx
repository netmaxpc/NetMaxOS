
'use client'

import React, { useState, useEffect } from 'react'
import type { UserSession } from '@/types/os'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  FolderOpen, 
  FileText, 
  Calendar,
  Upload,
  Download,
  Trash2,
  Eye
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  type: string
  status: string
  createdAt: string
  updatedAt: string
}

interface ProjectFile {
  id: string
  name: string
  type: string
  size: number
  url: string
  projectId: string
  createdAt: string
}

interface MyProjectsAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function MyProjectsApp({ windowId, userSession }: MyProjectsAppProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [files, setFiles] = useState<ProjectFile[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'projects' | 'files'>('projects')

  useEffect(() => {
    loadProjects()
  }, [userSession])

  const loadProjects = async () => {
    if (userSession.isGuest) {
      // Mock data for guest users
      const mockProjects: Project[] = [
        {
          id: 'demo-1',
          name: 'Website Redesign',
          description: 'Modern website redesign with AI integration',
          type: 'website',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'demo-2',
          name: 'Mobile App Development',
          description: 'Cross-platform mobile application',
          type: 'app',
          status: 'completed',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      setProjects(mockProjects)
      setIsLoading(false)
      return
    }

    try {
      // For authenticated users, fetch real projects
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || [])
      }
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadProjectFiles = async (projectId: string) => {
    if (userSession.isGuest) {
      // Mock files for guest users
      const mockFiles: ProjectFile[] = [
        {
          id: 'file-1',
          name: 'design-mockup.pdf',
          type: 'pdf',
          size: 2048000,
          url: '#',
          projectId: projectId,
          createdAt: new Date().toISOString()
        },
        {
          id: 'file-2',
          name: 'requirements.docx',
          type: 'docx',
          size: 512000,
          url: '#',
          projectId: projectId,
          createdAt: new Date().toISOString()
        }
      ]
      setFiles(mockFiles)
      return
    }

    try {
      const response = await fetch(`/api/projects/${projectId}/files`)
      if (response.ok) {
        const data = await response.json()
        setFiles(data.files || [])
      }
    } catch (error) {
      console.error('Error loading project files:', error)
    }
  }

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'paused': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setActiveTab('files')
    loadProjectFiles(project.id)
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">My Projects</h2>
          <div className="flex items-center space-x-2">
            {!userSession.isGuest && (
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mt-4">
          <Button
            variant={activeTab === 'projects' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('projects')}
            className={activeTab === 'projects' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            Projects
          </Button>
          {selectedProject && (
            <Button
              variant={activeTab === 'files' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('files')}
              className={activeTab === 'files' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <FileText className="h-4 w-4 mr-2" />
              Files
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        {activeTab === 'projects' ? (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="bg-gray-700 border-gray-600 hover:border-red-500 transition-colors cursor-pointer"
                onClick={() => handleProjectSelect(project)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  <div className="flex items-center text-xs text-gray-400 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <span>Type: {project.type}</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredProjects.length === 0 && (
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  {searchTerm ? 'No projects found matching your search.' : 'No projects yet.'}
                </p>
                {!userSession.isGuest && !searchTerm && (
                  <Button className="mt-4 bg-red-600 hover:bg-red-700">
                    Create Your First Project
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Project Header */}
            {selectedProject && (
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{selectedProject.name}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab('projects')}
                      className="border-gray-600"
                    >
                      Back to Projects
                    </Button>
                  </CardTitle>
                  <p className="text-gray-300 text-sm">{selectedProject.description}</p>
                </CardHeader>
              </Card>
            )}

            {/* File Upload Area */}
            {!userSession.isGuest && (
              <Card className="bg-gray-700 border-gray-600 border-dashed">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Drag and drop files here, or{' '}
                      <button className="text-red-400 hover:text-red-300">browse</button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Files List */}
            <div className="space-y-2">
              {files.map((file) => (
                <Card key={file.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-white text-sm font-medium">{file.name}</p>
                          <p className="text-gray-400 text-xs">
                            {formatFileSize(file.size)} • {new Date(file.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Download className="h-4 w-4" />
                        </Button>
                        {!userSession.isGuest && (
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {files.length === 0 && selectedProject && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No files in this project yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-600 text-center">
        <p className="text-gray-400 text-xs">
          {userSession.isGuest 
            ? 'Guest mode - Sign in to access your real projects'
            : `${projects.length} projects total`
          }
        </p>
      </div>
    </div>
  )
}
