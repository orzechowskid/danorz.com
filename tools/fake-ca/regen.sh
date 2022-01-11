#!/bin/bash -xe

# configure directory
mkdir -p ca domains/local.host

####################
# CA

# generate private key and certificate
openssl req -nodes -subj "/CN=local.host.ca/OU=Dev Team/O=Alewife Labs/L=Worcester/ST=MA/C=US" -new -x509 -days 3650 -keyout ca/key.pem -out ca/crt.pem

####################
# server

# generate private key
openssl genrsa -out domains/local.host/key.pem 2048

# generate CSR
openssl req -new -sha256 -nodes -subj "/CN=local.host/OU=Dev Team/O=Alewife Labs/L=Worcester/ST=MA/C=US" -extensions v3_req -reqexts SAN -config openssl.cnf -key domains/local.host/key.pem -out domains/local.host/csr.pem

# generate certificate
openssl x509 -req -days 720 -in domains/local.host/csr.pem -CA ca/crt.pem -CAkey ca/key.pem -CAcreateserial -out domains/local.host/crt.pem -extfile openssl.cnf -extensions SAN
