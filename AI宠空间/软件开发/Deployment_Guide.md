# PetCare AI 宠护平台部署与运维指南

本指南详细说明了 PetCare AI 平台的容器化、Kubernetes 部署、CI/CD 流水线以及监控方案的配置与操作流程。

## 1. 架构概览

- **前端**: Next.js (React) - 运行于容器 (Port 3000)
- **后端**: Node.js (Express) - 运行于容器 (Port 3001)
- **数据库**: PostgreSQL (数据持久化)
- **缓存**: Redis (实时订单与状态)
- **编排**: AWS EKS (Kubernetes)
- **CI/CD**: GitHub Actions

## 2. 容器化方案 (Docker)

### 本地开发与测试
使用根目录下的 `docker-compose.yml` 快速启动完整环境：
```bash
docker-compose up --build
```
- 前端访问: `http://localhost:3000`
- 后端访问: `http://localhost:3001/v1`
- 监控指标: `http://localhost:3001/metrics`

### Docker 镜像构建
- **前端 Dockerfile**: `frontend/Dockerfile` (多阶段构建，优化体积)
- **后端 Dockerfile**: `backend/Dockerfile`

## 3. Kubernetes 部署规格 (AWS EKS)

所有清单文件位于 `k8s/` 目录：
- `database-config.yaml`: 包含数据库连接配置 (ConfigMap) 与敏感信息 (Secret)。
- `backend-deployment.yaml`: 后端 Deployment 与 ClusterIP Service。
- `frontend-deployment.yaml`: 前端 Deployment 与 ClusterIP Service。
- `ingress.yaml`: 使用 AWS ALB Ingress Controller 暴露服务。

### 部署命令
```bash
kubectl apply -f k8s/database-config.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

## 4. GitHub Actions CI/CD 流水线

流水线配置文件: `.github/workflows/deploy.yml`

### 工作流步骤
1. **代码签出**: 拉取最新代码。
2. **AWS 认证**: 配置 `AWS_ACCESS_KEY_ID` 与 `AWS_SECRET_ACCESS_KEY`。
3. **镜像构建与推送**: 
   - 构建前端与后端镜像。
   - 推送至 Amazon ECR 仓库。
4. **清单更新**: 动态更新 `k8s/*.yaml` 中的镜像 Tag。
5. **部署至 EKS**: 执行 `kubectl apply` 更新集群资源。

### 必须配置的 GitHub Secrets
- `AWS_ACCESS_KEY_ID`: AWS IAM 用户访问密钥。
- `AWS_SECRET_ACCESS_KEY`: AWS IAM 用户私有密钥。

## 5. 监控与告警方案

### Prometheus 配置
后端已集成 `prom-client`。Prometheus 将通过 Kubernetes Service Discovery 自动发现并抓取 `/metrics` 端点。

### 告警规则 (`monitoring/prometheus-rules.yaml`)
- **BackendHighErrorRate**: 当后端 5xx 错误率超过 5% 并持续 2 分钟时触发。
- **InstanceDown**: 当后端实例离线超过 1 分钟时触发。

### Grafana 看板建议
- **API 性能**: 平均响应时间、QPS。
- **系统资源**: Pod CPU 与 内存利用率。
- **业务指标**: 实时订单提交量、成功履约率。

## 6. 维护与故障排查

- **查看日志**: `kubectl logs -f deployment/petcare-backend`
- **查看状态**: `kubectl get pods`, `kubectl get ingress`
- **回滚部署**: `kubectl rollout undo deployment/petcare-backend`
