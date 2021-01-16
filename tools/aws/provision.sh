#!/bin/bash -xe

AWS_DEFAULT_OUTPUT="text"
EB_APP_NAME=alewife-cms
EB_EC2_AUTH=ac-ec2-eb
EB_PLATFORM_NAME='64bit Amazon Linux 2 v3.2.1 running Docker'
IAM_EB_USER_NAME=ac-eb-admin
IAM_GROUP_NAME=ac-admins

# provision AWS account

# create-group: "GROUP" <arn> <create date> <id> <name> <path>
aws iam create-group --group-name ac-admins
# attach-group-policy: no output?
aws iam attach-group-policy --group-name ac-admins --policy-arn arn:aws:iam::aws:policy/AWSElasticBeanstalkFullAccess
# create-user: "USER" <arn> <create date> <path> <id> <name>
aws iam create-user --user-name $IAM_EB_USER_NAME
# add-user-to-group: no output?
aws iam add-user-to-group --user-name $IAM_EB_USER_NAME --group-name $IAM_GROUP_NAME
# create-access-key: "ACCESSKEY" <key> <create date> <secret> <status> <user>
CREDS=`aws iam create-access-key --user-name $IAM_EB_USER_NAME | tr -s ' '`
AWS_ACCESS_KEY_ID=`echo $CREDS | cut -f 2 -d ' '`
AWS_SECRET_ACCESS_KEY=`echo $CREDS | cut -f 4 -d ' '`

# create-instance-profile: "INSTANCEPROFILE" <arn> <create date> <id> <name> <path>
aws iam create-instance-profile --instance-profile-name $EB_EC2_AUTH-profile
# create-role: "ROLE" <arn> <create date> <id> <name>
aws iam create-role --role-name $EB_EC2_AUTH-role --assume-role-policy-document '{ "Version": "2012-10-17", "Statement": [ { "Sid": "", "Effect": "Allow", "Principal": { "Service": "elasticbeanstalk.amazonaws.com" }, "Action": "sts:AssumeRole" }] }'
# attach-role-policy: no output
aws iam attach-role-policy --role-name $EB_EC2_AUTH-role --policy-arn arn:aws:iam::aws:policy/AWSElasticBeanstalkFullAccess

aws iam add-role-to-instance-profile

# provision AWS environment using new AWS account creds

export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY

# create ec2 elb
# create eb environments using the shared elb

# create-application: "APPLICATION" <arn> <name> <create date> <update date>
aws elasticbeanstalk create-application --application-name $APP_NAME-backend
# create-environment: <app name> <create date> <update date> <arn> <id> <env name> <health> <solution stack arn> <status>
aws elasticbeanstalk create-environment --environment-name $APP_NAME-backend-env --tier Name=WebServer,Type=Standard --application-name $APP_NAME-backend --solution-stack-name "$EB_PLATFORM_NAME" --option-settings Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value=$EB_EC2_AUTH-profile

#aws elasticbeanstalk create-application --application-name $APP_NAME-frontend
#aws elasticbeanstalk create-environment --environment-name $APP_NAME-frontend-env --tier Name=WebServer,Type=Standard --application-name $APP_NAME-frontend --solution-stack-name "$EB_PLATFORM_NAME" --option-settings Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value=$EB_EC2_AUTH
