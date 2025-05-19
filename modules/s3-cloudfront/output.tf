# # output "cloudfront_domain_name" {
# #     value = aws_cloudfront_distribution.cdn.domain_name
# #     description = "This stores and shows the CloudFront distribution domain name."
# # }

# output "cloudfront_distribution_id" {
#   value       = module.s3-cloudfront.cloudfront_distribution_id
#   description = "CloudFront distribution ID for cache invalidation"
# }

# output "cloudfront_distribution_id" {
#   value       = aws_cloudfront_distribution.cdn.id
#   description = "CloudFront distribution ID for cache invalidation"
# }
# output "cloudfront_domain_name" {
#   value       = aws_cloudfront_distribution.cdn.domain_name
#   description = "Public URL for accessing the static site via CloudFront"
# }

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.cdn.id
  description = "CloudFront distribution ID for cache invalidation"
}

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.cdn.domain_name
  description = "Public URL for accessing the static site via CloudFront"
}

