# PetCare AI Flutter 移动端项目

## 项目概述
基于 PetCare AI 宠护平台设计稿开发的 Flutter 移动端应用，采用 Cupertino (iOS) 风格，专注于极简交互与高频预约流程。

## 核心特性
- **Cupertino 风格**: 深度适配 iOS 设计语言，使用 `CupertinoApp` 和原生 Cupertino 组件。
- **暗色模式**: 严格遵循 Design Token，主背景色 `#070B14`，品牌绿 `#22C55E`。
- **响应式布局**: 适配 375px 基准宽度，确保在 iOS 和 Android 设备上均有良好表现。
- **认证流程**: 支持手机号 + OTP 验证码快速登录。
- **状态追踪**: 实时展示爱宠在托管柜中的环境数据（温度、湿度、状态）。

## 项目结构
```
lib/
├── core/               # 核心配置与工具
│   ├── constants/      # 设计令牌 (Colors, Spacing, Typography)
│   ├── theme/          # App 主题配置
│   ├── utils/          # API 客户端 (Dio)
│   └── widgets/        # 全局复用组件 (Button, Input)
├── features/           # 业务功能模块
│   ├── auth/           # 认证模块 (Login, OTP, Register)
│   └── home/           # 首页模块 (Hero, Status, Services)
└── main.dart           # 入口文件
```

## 技术栈
- **UI Framework**: Flutter (Cupertino)
- **Networking**: Dio
- **State Management**: Riverpod (已预置配置)
- **Storage**: SharedPreferences
- **Fonts**: Google Fonts (Inter, Noto Sans SC)

## 开始使用
1. 确保已安装 Flutter SDK。
2. 在项目根目录运行 `flutter pub get`。
3. 运行项目：`flutter run`。
