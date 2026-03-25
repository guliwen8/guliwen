import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useLoad, navigateTo } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function Index() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [services, setServices] = useState([
    { id: '1', name: '精细洗护', price: 128, icon: 'paw' },
    { id: '2', name: '全效修剪', price: 188, icon: 'paw' },
    { id: '3', name: '宠物寄养', price: 98, icon: 'paw' }
  ])

  useLoad(() => {
    console.log('Page loaded.')
  })

  const handleAuth = () => {
    navigateTo({ url: '/pages/login/index' })
  }

  return (
    <ScrollView scrollY className='min-h-screen bg-background pb-40'>
      {/* Header / Nav */}
      <View className='px-16 py-12 bg-surface-1 border-b border-border flex flex-row items-center justify-between'>
        <View className='flex flex-row items-center'>
          <View className='w-8 h-8 rounded-radius-1 bg-primary-500/20 flex items-center justify-center mr-8'>
            <Text className='text-primary-500 text-xs'>🐾</Text>
          </View>
          <Text className='text-md font-bold text-text-1'>AI宠空间</Text>
        </View>
        
        {user ? (
          <View className='flex flex-row items-center bg-primary-500/10 px-12 py-6 rounded-pill border border-primary-500/20'>
            <Text className='text-xs text-primary-500 font-medium'>欢迎，{user.name}</Text>
          </View>
        ) : (
          <View 
            className='px-12 py-6 bg-primary-500 rounded-pill active:opacity-80'
            onClick={handleAuth}
          >
            <Text className='text-xs text-slate-900 font-bold'>登录 / 注册</Text>
          </View>
        )}
      </View>

      {/* Hero Section */}
      <View className='relative h-40 bg-surface-1 overflow-hidden'>
        <View className='absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent' />
        <View className='px-16 pt-24 relative z-10'>
          <Text className='text-xl font-bold text-text-1 leading-tight'>让宠护更简单</Text>
          <View className='mt-4'>
            <Text className='text-sm text-text-3'>极致效率，全方位 AI 呵护</Text>
          </View>
        </View>
        <Image 
          className='absolute right-0 bottom-0 w-24 h-24 opacity-40'
          src='/assets/images/home-hero@3x.png' 
          mode='aspectFit'
        />
      </View>

      {/* Pet Status Card */}
      <View className='mx-16 -mt-12 p-16 bg-surface-2 border border-border rounded-radius-3 shadow-e2'>
        <View className='flex items-center justify-between mb-16'>
          <View className='flex items-center'>
            <View className='w-12 h-12 rounded-full bg-primary-500 mr-8' />
            <Text className='text-md font-bold text-text-1'>我的宠物</Text>
          </View>
          <Text className='text-xs text-text-3'>切换宠物</Text>
        </View>
        <View className='flex items-center space-x-12'>
          <View className='w-20 h-20 rounded-full bg-surface-3 flex items-center justify-center'>
            <Text className='text-text-2 text-xs'>🐶</Text>
          </View>
          <View>
            <Text className='text-md font-medium text-text-1'>旺财</Text>
            <Text className='text-xs text-text-3'>状态：待预约</Text>
          </View>
        </View>
      </View>

      {/* Service Booking Section */}
      <View className='px-16 mt-32'>
        <View className='flex items-center justify-between mb-16'>
          <Text className='text-lg font-bold text-text-1'>服务预约</Text>
          <Text className='text-xs text-accent-500'>更多服务</Text>
        </View>
        <View className='grid grid-cols-1 gap-12'>
          {services.map(service => (
            <View 
              key={service.id}
              className='p-16 bg-surface-2 border border-border rounded-radius-2 flex items-center justify-between active:bg-surface-3 transition-colors'
            >
              <View className='flex items-center'>
                <View className='w-12 h-12 bg-primary-500/10 rounded-radius-1 flex items-center justify-center mr-12'>
                  <Text className='text-primary-500 text-sm'>🐾</Text>
                </View>
                <View>
                  <Text className='text-md font-medium text-text-1'>{service.name}</Text>
                  <Text className='text-xs text-text-3'>专业美容师上门服务</Text>
                </View>
              </View>
              <View className='text-right'>
                <Text className='text-md font-bold text-primary-500'>¥{service.price}</Text>
                <View className='mt-4 px-8 py-2 bg-primary-500 rounded-pill'>
                  <Text className='text-xs text-white'>预约</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View className='px-16 mt-32'>
        <Text className='text-lg font-bold text-text-1 mb-16'>最近预约</Text>
        <View className='p-16 bg-surface-1 border border-border rounded-radius-2 border-dashed flex flex-col items-center justify-center h-24'>
          <Text className='text-xs text-text-3'>暂无正在进行的预约</Text>
        </View>
      </View>
    </ScrollView>
  )
}
