import 'package:flutter/cupertino.dart';
import '../../../../core/constants/colors.dart';
import '../../../../core/constants/spacing.dart';
import '../../../../core/constants/typography.dart';
import '../../../../core/widgets/primary_button.dart';

class HeroSection extends StatelessWidget {
  const HeroSection({super.key});

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
          Container(
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s3, vertical: AppSpacing.s1),
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.2),
              borderRadius: BorderRadius.circular(AppSpacing.radiusPill),
            ),
            child: Text(
              '智能寄存',
              style: AppTypography.xs.copyWith(color: AppColors.primary),
            ),
          ),
          const SizedBox(height: AppSpacing.s3),
          Text('爱宠托管更安心', style: AppTypography.xl),
          const SizedBox(height: AppSpacing.s2),
          Text(
            '8pt 栅格，移动优先，聚焦高频预约与状态回传。',
            style: AppTypography.sm.copyWith(color: AppColors.text2),
          ),
          const SizedBox(height: AppSpacing.s4),
          const PrimaryButton(text: '立即预约'),
          const SizedBox(height: AppSpacing.s4),
          ClipRRect(
            borderRadius: BorderRadius.circular(AppSpacing.radius2),
            child: Image.network(
              'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
              height: 176,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
        ],
      ),
    );
  }
}
