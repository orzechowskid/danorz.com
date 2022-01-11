# usage

1. import ca/crt.pem into your browser as a trusted CA
2. provide local.host crt and key to your https server of choice
3. add an alias to your /etc/hosts (or equivalent): local.host -> localhost
4. access via https://local.host instead of http://localhost

# manifest

- ca/key.pem: private key for local CA
- ca/crt.pem: certificate for local CA
- <domain>.csr.pem: certificate signing request for local.host
- <domain>.crt.pem: ssl cert signed by local CA
- <domain>.key.pem: private key for <domain>.crt.pem
