# Kubernetes Microservices Setup Guide

## Project Overview

This project contains multiple microservices deployed using Kubernetes.

### Services Included

- API Gateway Service
- Worker Service
- Stats Service
- Redis

### Technologies Used

- Docker
- Kubernetes
- Minikube
- kubectl
- Node.js
- TypeScript
- Redis

---

# Architecture

```text
Host Machine
│
├── Docker
├── Minikube (Kubernetes Cluster)
│
├── API Gateway Pod
│     └── api-gateway container
│
├── Worker Pod
│     └── worker-service container
│
├── Stats Pod
│     └── stats-service container
│
└── Redis Pod
      └── redis container
```

Each microservice runs in its own Docker container and Kubernetes Pod.

---

# Prerequisites

Install the following tools before starting.

## 1. Install Docker

Verify Docker installation:

```bash
docker --version
```

Make sure Docker Desktop or Docker daemon is running.

---

## 2. Install Minikube

Verify Minikube installation:

```bash
minikube version
```

---

## 3. Install kubectl

Verify kubectl installation:

```bash
kubectl version --client
```

---

# Start Kubernetes Cluster

Start Minikube:

```bash
minikube start
```

Verify cluster status:

```bash
minikube status
```

Check Kubernetes nodes:

```bash
kubectl get nodes
```

Expected output:

```bash
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   XXm   v1.xx.x
```

---

# Build Docker Images

## API Gateway Service

```bash
docker build -t api-gateway-service ./services/api-gateway-service
```

## Worker Service

```bash
docker build -t worker-service ./services/worker-service
```

## Stats Service

```bash
docker build -t stats-service ./services/stats-service
```

---

# Verify Docker Images

Check all created Docker images:

```bash
docker images
```

Expected images:

```bash
api-gateway-service
worker-service
stats-service
```

---

# Configure Minikube Docker Environment (Optional)

If Kubernetes cannot access local Docker images:

```bash
eval $(minikube docker-env)
```

Rebuild Docker images after running the above command.

---

# Deploy Kubernetes Resources

Apply all Kubernetes YAML files:

```bash
kubectl apply -f k8s/
```

---

# Verify Kubernetes Resources

## Check Pods

```bash
kubectl get pods
```

Expected pods:

```bash
api-gateway-service-xxxxx
worker-service-xxxxx
stats-service-xxxxx
redis-xxxxx
```

---

## Check Services

```bash
kubectl get services
```

---

## Check Deployments

```bash
kubectl get deployments
```

---

# View Application Logs

## API Gateway Logs

```bash
kubectl logs deployment/api-gateway-service
```

## Worker Service Logs

```bash
kubectl logs deployment/worker-service
```

## Stats Service Logs

```bash
kubectl logs deployment/stats-service
```

---

# Restart Deployment After Code Changes

After making code changes:

## Rebuild Docker Image

```bash
docker build -t worker-service ./services/worker-service
```

## Restart Kubernetes Deployment

```bash
kubectl rollout restart deployment worker-service
```

Verify rollout status:

```bash
kubectl rollout status deployment/worker-service
```

---

# Verify Auto Scaling (HPA)

Check HPA status:

```bash
kubectl get hpa
```

---

# Perform Load Testing

Example using curl:

```bash
for i in {1..100}; do
  curl http://localhost:3000/jobs
done
```

Monitor pods during load testing:

```bash
kubectl get pods -w
```

---

# Access Application

Get Minikube service URL:

```bash
minikube service api-gateway-service --url
```

---

# Useful Kubernetes Commands

## Get All Resources

```bash
kubectl get all
```

---

## Describe Pod

```bash
kubectl describe pod <pod-name>
```

---

## Delete Pod

```bash
kubectl delete pod <pod-name>
```

---

## Delete All Kubernetes Resources

```bash
kubectl delete -f k8s/
```

---

# Stop Kubernetes Cluster

```bash
minikube stop
```

---

# Common Issues

## ImagePullBackOff

### Cause

Kubernetes cannot find the Docker image.

### Solution

Run:

```bash
eval $(minikube docker-env)
```

Then rebuild Docker images and redeploy.

---

## Pods Not Restarting After Code Changes

### Solution

Rebuild Docker image:

```bash
docker build -t worker-service ./services/worker-service
```

Restart deployment:

```bash
kubectl rollout restart deployment worker-service
```

---

# Project Flow

```text
Application Code
        ↓
Docker Image
        ↓
Kubernetes Deployment
        ↓
Pod Creation
        ↓
Kubernetes Service Exposure
```
