#!/bin/bash

set -euf -o pipefail

SECRET_NAME=$(kubectl -n kubesail get serviceaccount pibox-io-updater -o yaml | fgrep 'name:' | fgrep 'updater-token' | awk '{print $3}')
ca=$(kubectl -n kubesail get secret/${SECRET_NAME} -o jsonpath='{.data.ca\.crt}')
token=$(kubectl -n kubesail get secret/${SECRET_NAME} -o jsonpath='{.data.token}' | base64 --decode)

echo "
apiVersion: v1
kind: Config
clusters:
- name: eks
  cluster:
    certificate-authority-data: ${ca}
    server: https://<K8S_ADDRESS_GOES_HERE>
contexts:
- name: eks
  context:
    cluster: eks
    namespace: kubesail
    user: pibox-io-updater
current-context: eks
users:
- name: pibox-io-updater
  user:
    token: ${token}
"
