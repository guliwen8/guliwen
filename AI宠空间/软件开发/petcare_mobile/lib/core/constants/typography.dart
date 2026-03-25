import 'package:flutter/cupertino.dart';
import 'package:google_fonts/google_fonts.dart';
import 'colors.dart';

class AppTypography {
  static TextStyle base({
    double fontSize = 14,
    FontWeight fontWeight = FontWeight.w400,
    Color color = AppColors.text1,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: color,
      height: height != null ? height / fontSize : null,
    );
  }

  static final xs = base(fontSize: 12, height: 18);
  static final sm = base(fontSize: 14, height: 22);
  static final md = base(fontSize: 16, height: 24);
  static final lg = base(fontSize: 20, fontWeight: FontWeight.w700, height: 30);
  static final xl = base(fontSize: 28, fontWeight: FontWeight.w800, height: 36);

  static final h1 = xl;
  static final h2 = lg;
  static final body = md;
  static final caption = xs.copyWith(color: AppColors.text3);
}
