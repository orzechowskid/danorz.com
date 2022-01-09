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

####################
# intermediate CA

pushd ca

# configure directory
touch index.txt
echo 1001 > serial
echo 1001 > crlnumber
mkdir -p certs crl csr newcerts private

# generate private key
openssl genrsa -out key.pem 4096

# generate CSR
openssl req -config openssl.cnf -new -sha256 -key key.pem -out csr.pem

# generate certificate
popd > /dev/null
pushd root-ca
openssl ca -batch -config openssl.cnf -extensions v3_intermediate_ca -days 1825 -notext -md sha256 -in ../ca/csr.pem -out ../ca/crt.pem

####################
# server

mkdir -p domains/local.host

# generate server private key
# generate server CSR
# generate server certificate
