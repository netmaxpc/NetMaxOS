
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

function HomePageContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isGuest = searchParams.get('guest')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || status === 'loading') return

    if (session || isGuest) {
      router.push('/desktop')
    } else {
      router.push('/auth/signin')
    }
  }, [session, status, router, isGuest, isMounted])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Net<span className="text-red-500">Max</span>OS
          </h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          <p className="text-gray-300 mt-4">Initializing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Net<span className="text-red-500">Max</span>OS
        </h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
        <p className="text-gray-300 mt-4">Loading your AI Operating System...</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Net<span className="text-red-500">Max</span>OS
          </h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          <p className="text-gray-300 mt-4">Initializing...</p>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}
