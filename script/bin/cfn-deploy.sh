#!/bin/bash -eu
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)/.." # Figure out where the script is running
. "$SCRIPT_DIR"/lib/robust-bash.sh
. "$SCRIPT_DIR"/config.sh

require_env_var STACK_PREFIX
require_env_var STACK_SUFFIX
require_env_var CLOUDFORMATION_TEMP_BUCKET_NAME
require_env_var EXPECT_AWS_ACCOUNT

STACK_NAME="${STACK_PREFIX}"-"$STACK_SUFFIX"
TEMPLATE_FILE="$SCRIPT_DIR/../aws/cfn-$STACK_SUFFIX.yaml"
PACKAGED_TEMPLATE_FILE="$SCRIPT_DIR/$(basename "$TEMPLATE_FILE" .yaml)".packaged.yaml

ACTUAL_ACCOUNT_ID=$(aws sts get-caller-identity | grep "Account" | cut -d'"' -f4)

if [ "$ENVIRONMENT" == "production" ]; then
  echo "🚨 DEPLOYING PRODUCTION 🚨"
else   
  echo "🚧 Deploying dev/staging"
fi

if [ "$ACTUAL_ACCOUNT_ID" != "$EXPECT_AWS_ACCOUNT" ]; then
  echo "❌ Deploying $ENVIRONMENT: expected aws-cli to be connected to accountID $EXPECT_AWS_ACCOUNT, but was $ACTUAL_ACCOUNT_ID"
  echo "   - you may need to authenicate with different AWS credentials"
  exit 1
fi
 
if ! aws s3api head-bucket --bucket "$CLOUDFORMATION_TEMP_BUCKET_NAME" ; then 
  echo "🌳 Creating S3 bucket '$CLOUDFORMATION_TEMP_BUCKET_NAME'"
  aws s3api create-bucket --bucket "$CLOUDFORMATION_TEMP_BUCKET_NAME"  --create-bucket-configuration LocationConstraint=ap-southeast-2
else
  echo "🌳 S3 bucket '$CLOUDFORMATION_TEMP_BUCKET_NAME' already exists; don't need to make it"
fi
echo "🌳 Packaging $TEMPLATE_FILE into $PACKAGED_TEMPLATE_FILE"
aws cloudformation package  --template-file "$TEMPLATE_FILE" --s3-bucket "$CLOUDFORMATION_TEMP_BUCKET_NAME"  --output-template-file "$PACKAGED_TEMPLATE_FILE"
echo "🌳 Deploying $PACKAGED_TEMPLATE_FILE to $STACK_NAME"
aws cloudformation deploy --template-file "$PACKAGED_TEMPLATE_FILE" --stack-name "$STACK_NAME" "$@"