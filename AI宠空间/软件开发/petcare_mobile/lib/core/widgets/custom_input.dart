import 'package:flutter/cupertino.dart';
import '../constants/colors.dart';
import '../constants/spacing.dart';
import '../constants/typography.dart';

class CustomInput extends StatelessWidget {
  final String? placeholder;
  final TextEditingController? controller;
  final bool obscureText;
  final TextInputType? keyboardType;
  final Widget? prefix;
  final Widget? suffix;
  final String? errorText;

  const CustomInput({
    super.key,
    this.placeholder,
    this.controller,
    this.obscureText = false,
    this.keyboardType,
    this.prefix,
    this.suffix,
    this.errorText,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: 44,
          decoration: BoxDecoration(
            color: const Color(0xFF0B1220),
            border: Border.all(
              color: errorText != null ? AppColors.danger : AppColors.border,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(AppSpacing.radius2),
          ),
          child: CupertinoTextField(
            controller: controller,
            placeholder: placeholder,
            placeholderStyle: AppTypography.sm.copyWith(color: AppColors.text3),
            style: AppTypography.sm.copyWith(color: AppColors.text1),
            obscureText: obscureText,
            keyboardType: keyboardType,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            decoration: null,
            prefix: prefix,
            suffix: suffix,
            cursorColor: AppColors.accent,
          ),
        ),
        if (errorText != null)
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4),
            child: Text(
              errorText!,
              style: AppTypography.xs.copyWith(color: AppColors.danger),
            ),
          ),
      ],
    );
  }
}
