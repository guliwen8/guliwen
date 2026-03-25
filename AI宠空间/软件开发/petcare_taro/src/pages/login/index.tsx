import { View, Text, Button, Input } from '@tarojs/components'
import { useLoad, navigateBack } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!account || !password) return
    if (mode === 'register' && password !== confirmPassword) return
    
    setLoading(true)
    // 模拟登录/注册
    setTimeout(() => {
      setLoading(false)
      navigateBack()
    }, 800)
  }

  return (
    <View className='min-h-screen bg-background flex flex-col px-32 py-64'>
      <View className='mb-48'>
        <Text className='text-xl font-bold text-text-1'>{mode === 'login' ? '登录账号' : '注册新账号'}</Text>
        <View className='mt-8'>
          <Text className='text-sm text-text-3'>商用级安全账户中心</Text>
        </View>
      </View>

      {/* Mode Switcher */}
      <View className='flex p-4 bg-surface-2 rounded-radius-2 mb-48'>
        <View 
          className={`flex-1 py-12 flex items-center justify-center rounded-radius-1 transition-all ${mode === 'login' ? 'bg-primary-500/10 border border-primary-500/20' : ''}`}
          onClick={() => setMode('login')}
        >
          <Text className={`text-sm font-bold ${mode === 'login' ? 'text-primary-500' : 'text-text-3'}`}>登录</Text>
        </View>
        <View 
          className={`flex-1 py-12 flex items-center justify-center rounded-radius-1 transition-all ${mode === 'register' ? 'bg-primary-500/10 border border-primary-500/20' : ''}`}
          onClick={() => setMode('register')}
        >
          <Text className={`text-sm font-bold ${mode === 'register' ? 'text-primary-500' : 'text-text-3'}`}>注册</Text>
        </View>
      </View>

      {/* Form */}
      <View className='space-y-24'>
        <View className='p-16 bg-surface-2 border border-border rounded-radius-2'>
          <Input 
            className='text-md text-text-1'
            placeholder='手机号 / 账号'
            placeholderClass='text-text-3'
            value={account}
            onInput={(e) => setAccount(e.detail.value)}
          />
        </View>
        <View className='p-16 bg-surface-2 border border-border rounded-radius-2'>
          <Input 
            className='text-md text-text-1'
            placeholder='登录密码'
            placeholderClass='text-text-3'
            value={password}
            password
            onInput={(e) => setPassword(e.detail.value)}
          />
        </View>
        {mode === 'register' && (
          <View className='p-16 bg-surface-2 border border-border rounded-radius-2'>
            <Input 
              className='text-md text-text-1'
              placeholder='确认密码'
              placeholderClass='text-text-3'
              value={confirmPassword}
              password
              onInput={(e) => setConfirmPassword(e.detail.value)}
            />
          </View>
        )}
      </View>

      <Button 
        className='w-full h-12 bg-primary-500 border border-primary-500 rounded-pill flex items-center justify-center mt-48 active:opacity-80'
        onClick={handleSubmit}
        loading={loading}
      >
        <Text className='text-md font-bold text-slate-900'>{mode === 'login' ? '立即登录' : '注册并登录'}</Text>
      </Button>

      <View className='mt-24 flex justify-between'>
        <Text className='text-xs text-accent-500'>忘记密码？</Text>
      </View>

      <View className='mt-auto flex justify-center'>
        <Text className='text-xs text-text-3 italic'>登录即表示同意服务协议和隐私政策</Text>
      </View>
    </View>
  )
}
