import { View, Text, Button as TaroButton } from '@tarojs/components'
import classNames from 'classnames'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
  disabled?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'primary', 
  loading = false, 
  disabled = false,
  className 
}) => {
  const baseClasses = 'w-full h-12 rounded-pill flex items-center justify-center transition-all active:opacity-80'
  const typeClasses = {
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-surface-1 border border-border text-text-1',
    danger: 'bg-danger-500 text-white'
  }

  return (
    <TaroButton
      className={classNames(baseClasses, typeClasses[type], className, {
        'opacity-50 pointer-events-none': disabled || loading
      })}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      <Text className='text-md font-bold'>{children}</Text>
    </TaroButton>
  )
}
