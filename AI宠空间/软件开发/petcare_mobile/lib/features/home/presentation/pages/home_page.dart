import 'package:flutter/cupertino.dart';
import '../../../../core/constants/colors.dart';
import '../../../../core/constants/spacing.dart';
import '../../../../core/constants/typography.dart';
import 'hero_section.dart';
import 'pet_status_card.dart';
import '../../auth/presentation/pages/login_page.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: AppColors.background,
      child: CustomScrollView(
        slivers: [
          CupertinoSliverNavigationBar(
            largeTitle: const Text('AI 宠空间'),
            backgroundColor: AppColors.background,
            border: null,
            trailing: CupertinoButton(
              padding: EdgeInsets.zero,
              child: const Text('登录 / 注册', style: TextStyle(fontSize: 14, color: AppColors.primary)),
              onPressed: () {
                Navigator.of(context).push(
                  CupertinoPageRoute(builder: (context) => const LoginPage()),
                );
              },
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.s4),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const HeroSection(),
                  const SizedBox(height: AppSpacing.s4),
                  Text('爱宠状态', style: AppTypography.lg),
                  const SizedBox(height: AppSpacing.s3),
                  const PetStatusCard(),
                  const SizedBox(height: AppSpacing.s6),
                  Text('预约服务', style: AppTypography.lg),
                  const SizedBox(height: AppSpacing.s3),
                  _buildServiceGrid(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServiceGrid() {
    final services = [
      {'name': '精细洗护', 'price': '¥88起', 'icon': '🛁'},
      {'name': '美容造型', 'price': '¥158起', 'icon': '✂️'},
      {'name': '驱虫服务', 'price': '¥45起', 'icon': '🐜'},
      {'name': '体检报告', 'price': '¥120起', 'icon': '📋'},
    ];

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: AppSpacing.s3,
        crossAxisSpacing: AppSpacing.s3,
        childAspectRatio: 1.4,
      ),
      itemCount: services.length,
      itemBuilder: (context, index) {
        final service = services[index];
        return Container(
          padding: const EdgeInsets.all(AppSpacing.s3),
          decoration: BoxDecoration(
            color: AppColors.surface1,
            borderRadius: BorderRadius.circular(AppSpacing.radius2),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(service['icon']!, style: const TextStyle(fontSize: 24)),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(service['name']!, style: AppTypography.sm.copyWith(fontWeight: FontWeight.w600)),
                  Text(service['price']!, style: AppTypography.xs.copyWith(color: AppColors.primary)),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}
