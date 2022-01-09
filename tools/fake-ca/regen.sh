#!/bin/bash -e

# configure directory
mkdir -p root-ca ca domains

####################
# root CA

pushd root-ca

# configure directory
touch index.txt
echo 1001 > serial
mkdir -p certs crl csr newcerts private

# generate private key
openssl genrsa -out key.pem 4096

# generate certificate
openssl req -config openssl.cnf -key key.pem -new -x509 -days 3650 -sha256 -extensions v3_ca -out crt.pem

popd > /dev/null

exit 0
####################
# intermediate CA

pushd ca

# configure directory
touch index.txt
echo 1001 > serial
mkdir -p certs crl csr newcerts private

# generate private key
# generate CSR
# generate certificate

popd

####################
# server

mkdir -p domains/local.host

# generate server private key
# generate server CSR
# generate server certificate
