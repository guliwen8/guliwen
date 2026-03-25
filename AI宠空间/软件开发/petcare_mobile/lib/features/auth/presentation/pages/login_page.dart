import 'package:flutter/cupertino.dart';
import '../../../../core/constants/colors.dart';
import '../../../../core/constants/spacing.dart';
import '../../../../core/constants/typography.dart';
import '../../../../core/widgets/primary_button.dart';
import '../../../../core/widgets/custom_input.dart';
import '../widgets/otp_input.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _accountController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoginMode = true;
  bool _isLoading = false;

  void _handleSubmit() {
    setState(() {
      _isLoading = true;
    });
    // Mocking login/register API call
    Future.delayed(const Duration(milliseconds: 800), () {
      setState(() {
        _isLoading = false;
      });
      // Navigate to home
      Navigator.of(context).pushReplacementNamed('/home');
    });
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: AppColors.background,
      navigationBar: CupertinoNavigationBar(
        backgroundColor: Colors.transparent,
        border: null,
        trailing: CupertinoButton(
          padding: EdgeInsets.zero,
          child: const Icon(CupertinoIcons.xmark, color: AppColors.text3),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.s5),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: AppSpacing.s6),
              Text(_isLoginMode ? '登录账号' : '注册新账号', style: AppTypography.h1),
              const SizedBox(height: AppSpacing.s2),
              Text(
                '商用级安全账户中心',
                style: AppTypography.caption,
              ),
              const SizedBox(height: AppSpacing.s8),
              
              // Mode Switcher
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: AppColors.surface2,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: CupertinoButton(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        color: _isLoginMode ? AppColors.surface3 : Colors.transparent,
                        borderRadius: BorderRadius.circular(8),
                        child: Text(
                          '登录',
                          style: AppTypography.sm.copyWith(
                            color: _isLoginMode ? AppColors.primary : AppColors.text3,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        onPressed: () => setState(() => _isLoginMode = true),
                      ),
                    ),
                    Expanded(
                      child: CupertinoButton(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        color: !_isLoginMode ? AppColors.surface3 : Colors.transparent,
                        borderRadius: BorderRadius.circular(8),
                        child: Text(
                          '注册',
                          style: AppTypography.sm.copyWith(
                            color: !_isLoginMode ? AppColors.primary : AppColors.text3,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        onPressed: () => setState(() => _isLoginMode = false),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.s6),

              CustomInput(
                controller: _accountController,
                placeholder: '手机号 / 账号',
                keyboardType: TextInputType.text,
              ),
              const SizedBox(height: AppSpacing.s4),
              CustomInput(
                controller: _passwordController,
                placeholder: '登录密码',
                keyboardType: TextInputType.visiblePassword,
                obscureText: true,
              ),
              if (!_isLoginMode) ...[
                const SizedBox(height: AppSpacing.s4),
                const CustomInput(
                  placeholder: '确认密码',
                  keyboardType: TextInputType.visiblePassword,
                  obscureText: true,
                ),
              ],
              const SizedBox(height: AppSpacing.s6),
              PrimaryButton(
                text: _isLoginMode ? '立即登录' : '注册并登录',
                isLoading: _isLoading,
                onPressed: _handleSubmit,
              ),
              const SizedBox(height: AppSpacing.s4),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text(
                      '忘记密码？',
                      style: AppTypography.xs.copyWith(color: AppColors.accent),
                    ),
                    onPressed: () {},
                  ),
                ],
              ),
              const Spacer(),
              Center(
                child: Text(
                  '登录即代表您同意服务协议和隐私政策',
                  style: AppTypography.xs.copyWith(color: AppColors.text3),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
