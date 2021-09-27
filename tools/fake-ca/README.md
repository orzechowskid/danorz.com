# usage

1. import myCA.pem into your browser as a trusted CA
2. provide crt and key to your https server of choice
3. add an alias to your /etc/hosts (or equivalent): local.host -> localhost
4. access via https://local.host instead of localhost

# manifest

- <domain>.csr: certificate signing request
- <domain>.crt: ssl cert signed by myCA
- <domain>.key: private key for <domain>.crt
