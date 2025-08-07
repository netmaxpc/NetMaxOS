
'use client'

import React from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calculator, DollarSign, TrendingUp, FileText, ExternalLink } from 'lucide-react'

interface NetMaxAccountingAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function NetMaxAccountingApp({ windowId, userSession }: NetMaxAccountingAppProps) {
  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">NetMax Accounting</h1>
            <p className="text-gray-400">Financial Technology Solutions</p>
          </div>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Services</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-400 mb-2" />
                <h3 className="text-white font-medium">Financial Management</h3>
                <p className="text-gray-400 text-sm">Complete accounting and bookkeeping solutions</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-400 mb-2" />
                <h3 className="text-white font-medium">Analytics & Reporting</h3>
                <p className="text-gray-400 text-sm">Advanced financial analytics and reporting tools</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <FileText className="h-6 w-6 text-purple-400 mb-2" />
                <h3 className="text-white font-medium">Tax Preparation</h3>
                <p className="text-gray-400 text-sm">Professional tax preparation and filing services</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <Calculator className="h-6 w-6 text-purple-400 mb-2" />
                <h3 className="text-white font-medium">Payroll Management</h3>
                <p className="text-gray-400 text-sm">Automated payroll processing and compliance</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Get Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Streamline your financial operations with our comprehensive accounting solutions.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
