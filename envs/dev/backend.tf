terraform {
  backend "s3" {
    bucket         = "terraform-state-static-site-12345"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock-table"
    encrypt        = true
  }
}
