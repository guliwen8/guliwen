import 'package:flutter/cupertino.dart';
import '../constants/colors.dart';
import '../constants/spacing.dart';
import '../constants/typography.dart';

class PrimaryButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isLoading;
  final bool fullWidth;

  const PrimaryButton({
    super.key,
    required this.text,
    this.onPressed,
    this.isLoading = false,
    this.fullWidth = true,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: fullWidth ? double.infinity : null,
      height: 48,
      child: CupertinoButton(
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s4),
        color: AppColors.primary,
        disabledColor: AppColors.primary.withOpacity(0.45),
        borderRadius: BorderRadius.circular(AppSpacing.radius2),
        onPressed: isLoading ? null : onPressed,
        child: isLoading
            ? const CupertinoActivityIndicator(color: AppColors.background)
            : Text(
                text,
                style: AppTypography.sm.copyWith(
                  color: const Color(0xFF04120A),
                  fontWeight: FontWeight.w600,
                ),
              ),
      ),
    );
  }
}
