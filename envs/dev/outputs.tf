# # output "cloudfront_url" {
# #   value       = module.static_site.cloudfront_domain_name
# #   description = "The user can access our site at this cloudfront url."
# # }

# output "cloudfront_distribution_id" {
#   value       = module.static-site.cloudfront_distribution_id
#   description = "CloudFront distribution ID for cache invalidation"
# }

# output "cloudfront_distribution_id" {
#   value       = module.static-site.cloudfront_distribution_id
#   description = "CloudFront distribution ID for cache invalidation"
# }
# output "cloudfront_domain_name" {
#   value       = aws_cloudfront_distribution.cdn.domain_name
#   description = "Public URL for accessing the static site via CloudFront"
# }

output "cloudfront_domain_name" {
  value       = module.static-site.cloudfront_domain_name
  description = "Public URL for accessing the static site via CloudFront"
}

output "cloudfront_distribution_id" {
  value       = module.static-site.cloudfront_distribution_id
  description = "CloudFront distribution ID for cache invalidation"
}
