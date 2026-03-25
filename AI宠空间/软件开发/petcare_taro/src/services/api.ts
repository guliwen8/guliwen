import Taro from '@tarojs/taro'

const BASE_URL = 'https://api.petcare.ai/v1'

interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

const request = async <T = any>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  const token = Taro.getStorageSync('token')
  
  try {
    const res = await Taro.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    })

    const responseData = res.data as ApiResponse<T>
    if (responseData.code === 200 || responseData.code === 201) {
      return responseData.data
    } else {
      Taro.showToast({
        title: responseData.message || '请求失败',
        icon: 'none'
      })
      throw new Error(responseData.message)
    }
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

// Auth API
export const authService = {
  getOtp: (phone: string) => 
    request('/auth/otp', 'POST', { phone }),
  
  login: (phone: string, code: string) => 
    request('/auth/login', 'POST', { phone, code }),
  
  register: (data: any) => 
    request('/auth/register', 'POST', data)
}

// Service API
export const petService = {
  getServices: () => 
    request('/services', 'GET'),
  
  createBooking: (data: any) => 
    request('/bookings', 'POST', data),
  
  getMyBookings: (status?: string) => 
    request('/bookings', 'GET', { status })
}
