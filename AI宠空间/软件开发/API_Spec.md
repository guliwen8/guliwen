# PetCare AI 宠护平台 - API 接口文档 (OpenAPI 3.0)

## 1. API 基础信息
- **Base URL**: `https://api.petcare.ai/v1`
- **认证方式**: Bearer Token (JWT)
- **响应格式**: JSON

## 2. 公共响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

## 3. 认证模块 (Auth)

### 3.1 用户注册
- **Endpoint**: `POST /auth/register`
- **Description**: 创建新账户（支持手机号或用户名）及首只宠物档案。
- **Request Body**:
  - `account`: String (Required, Phone or Username)
  - `password`: String (Required, Min 6 chars)
  - `confirm_password`: String (Required)
  - `first_pet_name`: String (Optional)
- **Responses**:
  - `201`: User created successfully with `token` and `user_info`.

### 3.2 用户登录 (账号密码方式)
- **Endpoint**: `POST /auth/login`
- **Description**: 验证账号（手机号或用户名）和密码，返回 JWT Token。
- **Request Body**:
  - `account`: String (Required)
  - `password`: String (Required)
- **Responses**:
  - `200`: Returns `token` and `user_info`.

### 3.3 退出登录
- **Endpoint**: `POST /auth/logout`
- **Description**: 使当前 Token 失效。
- **Responses**:
  - `200`: Logged out successfully.

## 4. 预约流程模块 (Booking)

### 4.1 获取服务列表
- **Endpoint**: `GET /services`
- **Description**: 获取所有可选的基础服务和增值项。
- **Responses**:
  - `200`: List of `services`.

### 4.2 创建预约订单
- **Endpoint**: `POST /bookings`
- **Description**: 提交预约请求。后端实时计价并校验总金额。
- **Request Body**:
  - `pet_id`: UUID (Required)
  - `store_id`: UUID (Required)
  - `service_ids`: Array of UUIDs (Required, including 1 basic service + optional addons)
  - `contact_phone`: String (Required)
- **Responses**:
  - `201`: Booking created with `booking_id` and `status: pending`.

### 4.3 获取我的预约列表
- **Endpoint**: `GET /bookings`
- **Description**: 获取当前登录用户的历史预约记录。
- **Query Params**:
  - `status`: String (Optional: pending/processing/completed/cancelled)
- **Responses**:
  - `200`: Array of `bookings`.

## 5. 管理后台模块 (Admin)

### 5.1 数据看板概览
- **Endpoint**: `GET /admin/dashboard/kpi`
- **Description**: 获取核心经营指标（今日订单、客单价、复购率等）。
- **Responses**:
  - `200`: Returns KPI object.

### 5.2 预约单管理
- **Endpoint**: `GET /admin/bookings`
- **Description**: 管理员多维检索预约记录。
- **Query Params**:
  - `query`: String (Phone/Order ID/Pet Name)
  - `status`: String
  - `store_id`: UUID
- **Responses**:
  - `200`: Paginated list of `bookings`.

### 5.3 更新预约状态
- **Endpoint**: `PATCH /admin/bookings/{id}/status`
- **Description**: 管理员手动触发状态流转。
- **Request Body**:
  - `status`: String (Required: processing/completed/cancelled)
- **Responses**:
  - `200`: Status updated.

### 5.4 用户分群运营
- **Endpoint**: `POST /admin/users/segment-campaign`
- **Description**: 对特定分群用户执行营销触达（一键触达）。
- **Request Body**:
  - `segment_id`: UUID (Required)
  - `campaign_template_id`: UUID (Required)
- **Responses**:
  - `202`: Campaign triggered.

## 6. 错误码说明
| 错误码 | 描述 |
| :--- | :--- |
| 400 | 请求参数错误 |
| 401 | 未经授权 (Token 无效或过期) |
| 403 | 权限不足 (如非管理员访问后台接口) |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
