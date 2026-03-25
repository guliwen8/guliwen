import 'package:flutter/cupertino.dart';
import '../../../../core/constants/colors.dart';
import '../../../../core/constants/spacing.dart';
import '../../../../core/constants/typography.dart';

class PetStatusCard extends StatelessWidget {
  const PetStatusCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.s4),
      decoration: BoxDecoration(
        color: AppColors.surface1.withOpacity(0.82),
        borderRadius: BorderRadius.circular(AppSpacing.radius3),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Text('A03柜', style: AppTypography.sm),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s2, vertical: 2),
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(AppSpacing.radiusPill),
                ),
                child: Text(
                  '正常',
                  style: AppTypography.xs.copyWith(color: AppColors.primary),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.s3),
          Stack(
            children: [
              Container(
                height: 8,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: AppColors.surface3,
                  borderRadius: BorderRadius.circular(AppSpacing.radiusPill),
                ),
              ),
              FractionallySizedBox(
                widthFactor: 0.8,
                child: Container(
                  height: 8,
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius: BorderRadius.circular(AppSpacing.radiusPill),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.s3),
          Text(
            '温度 24°C · 湿度 52%',
            style: AppTypography.xs.copyWith(color: AppColors.text3),
          ),
        ],
      ),
    );
  }
}
