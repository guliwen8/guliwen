import { View } from '@tarojs/components'
import classNames from 'classnames'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'small' | 'medium' | 'large'
  bordered?: boolean
  shadow?: 'none' | 'e1' | 'e2' | 'e3'
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  padding = 'medium',
  bordered = true,
  shadow = 'none'
}) => {
  const baseClasses = 'bg-surface-2 rounded-radius-2 overflow-hidden'
  const paddingClasses = {
    none: 'p-0',
    small: 'p-8',
    medium: 'p-16',
    large: 'p-24'
  }
  const shadowClasses = {
    none: '',
    e1: 'shadow-e1',
    e2: 'shadow-e2',
    e3: 'shadow-e3'
  }

  return (
    <View 
      className={classNames(
        baseClasses, 
        paddingClasses[padding], 
        shadowClasses[shadow],
        { 'border border-border': bordered },
        className
      )}
    >
      {children}
    </View>
  )
}
