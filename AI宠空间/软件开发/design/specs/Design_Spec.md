# 杭州试点高保真设计规范 v1.0

## 1. 设计基线

- 设计系统：8pt栅格
- 目标平台断点：375/750、414/828、768/1536、1440/2880
- 可访问性：WCAG 2.1 AA
- 核心原则：高频低价策略下的信息效率优先、状态可感知优先、操作路径最短优先

## 2. Design Token

### 2.1 颜色

- Background `#070B14`
- Surface-1 `#111827`
- Surface-2 `#1F2937`
- Surface-3 `#374151`
- Border `#334155`
- Primary-500 `#22C55E`
- Primary-600 `#16A34A`
- Primary-700 `#15803D`
- Accent-500 `#0EA5E9`
- Danger-500 `#EF4444`
- Warning-500 `#F59E0B`
- Text-1 `#F8FAFC`
- Text-2 `#CBD5E1`
- Text-3 `#94A3B8`

### 2.2 字体与字阶

- Font Family：Inter / Noto Sans SC
- XS：12/18
- SM：14/22
- MD：16/24
- LG：20/30
- XL：28/36

### 2.3 圆角

- Radius-1：8
- Radius-2：12
- Radius-3：16
- Pill：999

### 2.4 间距

- 4、8、12、16、24、32、40、48

### 2.5 投影（Elevation）

- E1：`0 2px 8px rgba(2,6,23,.20)`
- E2：`0 8px 24px rgba(2,6,23,.28)`
- E3：`0 14px 40px rgba(2,6,23,.38)`

### 2.6 动效

- Fast：120ms
- Mid：220ms
- Slow：320ms
- Curve：`cubic-bezier(0.2,0,0,1)`

## 3. 响应式规格

- 375：单栏移动布局，关键卡片纵向排布
- 414：单栏移动布局，信息密度略增
- 768：双栏平板布局，主内容与操作面板并列
- 1440：桌面多栏布局，展示后台总览与表格数据

## 4. 交互状态

- 悬停：背景与边框提升一级对比
- 按下：主色加深一级
- 禁用：不透明度45%，禁用交互
- 加载：按钮右侧旋转指示器
- 错误：字段边框切换Danger并提供错误文案

## 5. 可访问性标准

- 正文最小字号14px
- 可点击区域最小40x40
- 交互控件提供清晰焦点态
- 文本与背景对比度按AA执行
- 表单错误态提供文本反馈，不仅依赖颜色

## 6. 切图与资源导出

- SVG@2x：
  - `assets/export/svg@2x/icon-paw.svg`
  - `assets/export/svg@2x/card-order.svg`
- PNG@3x：
  - `assets/export/png@3x/home-hero@3x.png`
  - `assets/export/png@3x/admin-dashboard@3x.png`
  - `assets/export/png@3x/components-states@3x.png`

## 7. 交互原型入口

- 总览页：`design/prototypes/index.html`
- 用户端：`design/prototypes/home.html`
- 账户中心：`design/prototypes/auth.html`
- 后台：`design/prototypes/admin.html`
- 状态库：`design/prototypes/components.html`

## 8. 双端信息架构

### 8.1 用户端

- 账户模块：注册、登录、账户状态反馈
- 业务模块：预约创建、服务选择、价格预估、订单提交
- 反馈模块：最近订单、状态回执、错误提示

### 8.2 后台管理端

- 用户管理：用户检索、等级筛选、生命周期操作
- 预约管理：预约检索、状态流转、履约分派
- 数据统计：订单量、客单价、复购率、预算偏差看板

## 9. 组件库清单

- 导航组件：顶部导航、侧边导航、分段Tab
- 表单组件：输入框、选择框、按钮、状态文案
- 数据组件：统计卡片、表格、进度条、趋势柱图
- 反馈组件：Toast、错误态、加载态、空态
- 业务组件：预约卡片、订单列表、会员标签

## 10. 关键交互原型流程

### 10.1 注册流程

- 打开账户中心
- 切换到注册Tab
- 输入昵称、手机号、密码、宠物信息
- 提交并返回成功状态

### 10.2 登录流程

- 输入手机号与验证码
- 提交后展示加载状态
- 成功后跳转提示

### 10.3 预约流程

- 输入宠物昵称
- 选择基础服务与增值项
- 实时计算订单金额
- 提交后写入最近订单

### 10.4 后台管理流程

- 切换侧栏模块（数据统计/预约管理/用户管理）
- 按条件筛选目标记录
- 进行详情、派单、运营动作

## 11. 商用实施规范

- Token唯一来源：`tokens.css`
- 组件行为唯一来源：`assets/js/*.js`
- 页面结构规范：一页一职责，避免跨页样式耦合
- 可访问性准入：表单、按钮、焦点态必须通过AA规则
- 响应式验收：375、414、768、1440四断点截图留存

## 12. 交付物清单

- 高保真页面：`home.html`、`auth.html`、`admin.html`
- 组件状态页：`components.html`
- 四断点画板：`home-375.html`、`home-414.html`
- Token样式：`assets/css/tokens.css`
- 交互脚本：`assets/js/prototype.js`、`assets/js/auth.js`、`assets/js/admin.js`
- 切图资产：`assets/export/svg@2x`、`assets/export/png@3x`
- 设计文档：`Design_Spec.md`、`Design_Review_and_Handoff_Checklist.md`、`Design_Review_Record_Template_v1.0.md`
