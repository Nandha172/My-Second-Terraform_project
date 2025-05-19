# Creates the S3 bucket to host my website.
resource "aws_s3_bucket" "website" {
  bucket         = var.bucket_name
# This will delete the content (Objects in the s3) present in the bucket when i run terraform destroy!
  force_destroy  = true 
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.bucket

  index_document {
    suffix = "index.html"
  }
}   

resource "aws_s3_bucket_policy" "deny_public_access" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.s3_bucket_policy.json
}

data "aws_iam_policy_document" "s3_bucket_policy" {
  statement {
    sid    = "DenyInsecureTransport"
    effect = "Deny"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]

    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values   = ["false"]
    }
  }

  statement {
    sid    = "AllowCloudFrontServicePrincipal"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cdn.arn]
    }
  }
}

# This below block is for CloudFront to securely access S3 using OAC and without using a public bucket.

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "s3-oac-nandha-v2"
  description                       = "OAC for CloudFront to access S3"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# The block sets up the CDN layer to deliver content to global users.

resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  default_root_object = "index.html"
  comment             = "CDN for static website"
#   price_class         = "PriceClass_100"

# The below origin block tells CloudFront where to pull content from.

  origin {
    domain_name              = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id                = "s3-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

# The below block sets up the cache behavior for the CDN like it defines how CloudFront behaves for requests

  default_cache_behavior {
    target_origin_id         = "s3-origin"
    viewer_protocol_policy   = "redirect-to-https"
    allowed_methods          = ["GET", "HEAD"]
    cached_methods           = ["GET", "HEAD"]

# Basically configures how CloudFront handles query strings, headers, and cookies from requests.

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

# Enabled the ssl certificate

  viewer_certificate {
    cloudfront_default_certificate = true
  }

# Disabled the geo_restriction

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
