import 'package:flutter/cupertino.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

class AppTheme {
  static CupertinoThemeData get darkTheme {
    return CupertinoThemeData(
      brightness: Brightness.dark,
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: AppColors.background,
      barBackgroundColor: AppColors.surface1.withOpacity(0.8),
      textTheme: CupertinoTextThemeData(
        primaryColor: AppColors.text1,
        textStyle: AppTypography.md,
        navActionTextStyle: AppTypography.sm.copyWith(color: AppColors.primary),
        navTitleTextStyle: AppTypography.md.copyWith(fontWeight: FontWeight.w600),
        pickerTextStyle: AppTypography.md,
        dateTimePickerTextStyle: AppTypography.md,
      ),
    );
  }
}
