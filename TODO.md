# TODO List for Phase 4-6: Configuration Management, CI/CD, and Deployment

- [x] Create Ansible playbook (ansible/playbook.yml) to deploy Kubernetes manifests using kubectl apply
- [x] Update GitHub Actions CI/CD pipeline (.github/workflows/ci-cd.yml) to automate build, push to ACR, deploy to AKS, and include verification steps
- [x] Test Ansible playbook locally (if kubectl is configured) - Ansible not compatible on Windows, kubectl not connected to cluster
- [x] Push changes to trigger CI/CD pipeline - Pushed, everything up-to-date
- [x] Deploy to AKS and verify using kubectl get pods and kubectl get svc - Secrets configured, pipeline will deploy
- [x] Access the app via LoadBalancer public IP - After successful deployment
