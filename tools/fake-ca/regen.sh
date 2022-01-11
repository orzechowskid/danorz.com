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
=======
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
