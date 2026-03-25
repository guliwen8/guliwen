/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#070B14',
        surface: {
          1: '#111827',
          2: '#1F2937',
          3: '#374151',
        },
        border: '#334155',
        primary: {
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        accent: {
          500: '#0EA5E9',
        },
        danger: {
          500: '#EF4444',
        },
        warning: {
          500: '#F59E0B',
        },
        text: {
          1: '#F8FAFC',
          2: '#CBD5E1',
          3: '#94A3B8',
        },
      },
      borderRadius: {
        'radius-1': '8rpx',
        'radius-2': '12rpx',
        'radius-3': '16rpx',
      },
      spacing: {
        '4': '4rpx',
        '8': '8rpx',
        '12': '12rpx',
        '16': '16rpx',
        '24': '24rpx',
        '32': '32rpx',
        '40': '40rpx',
        '48': '48rpx',
      },
      fontSize: {
        'xs': ['24rpx', '36rpx'],
        'sm': ['28rpx', '44rpx'],
        'md': ['32rpx', '48rpx'],
        'lg': ['40rpx', '60rpx'],
        'xl': ['56rpx', '72rpx'],
      },
      boxShadow: {
        'e1': '0 4rpx 16rpx rgba(2, 6, 23, 0.20)',
        'e2': '0 16rpx 48rpx rgba(2, 6, 23, 0.28)',
        'e3': '0 28rpx 80rpx rgba(2, 6, 23, 0.38)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // In mini-programs, we don't want the default reset
  },
}
