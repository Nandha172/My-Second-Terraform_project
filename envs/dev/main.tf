module "static-site" {
  source      = "../../modules/s3-cloudfront"
  bucket_name = var.bucket_name
}