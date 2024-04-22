resource "aws_ecr_repository" "surge_assessment_ecr_repo" {
  name = var.ecr_repo_name
}