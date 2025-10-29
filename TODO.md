# TODO List for Phase 4-6: Configuration Management, CI/CD, and Deployment

- [x] Create Ansible playbook (ansible/playbook.yml) to deploy Kubernetes manifests using kubectl apply
- [x] Update GitHub Actions CI/CD pipeline (.github/workflows/ci-cd.yml) to automate build, push to ACR, deploy to AKS, and include verification steps
- [ ] Test Ansible playbook locally (if kubectl is configured)
- [ ] Push changes to trigger CI/CD pipeline
- [ ] Deploy to AKS and verify using kubectl get pods and kubectl get svc
- [ ] Access the app via LoadBalancer public IP
