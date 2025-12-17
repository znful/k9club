import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Tab } from '@/types'

const VerticalTabs = ({ tabs, defaultValue }: {
  tabs: Tab[],
  defaultValue?: string
}) => {
  return (
    <div className='w-full max-w-md'>
      <Tabs defaultValue={defaultValue} className='flex-row'>
        <TabsList className='h-full flex-col'>
          {tabs.map(tab => (
            <TabsTrigger key={tab.title} value={tab.title} className='w-full'>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.content.toString()} value={tab.content.toString()} >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default VerticalTabs
