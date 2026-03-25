import 'package:dio/dio.dart';
import '../../../../core/utils/api_client.dart';
import '../models/user_model.dart';

class AuthRepository {
  final Dio _dio = ApiClient().dio;

  Future<void> getOtp(String phone) async {
    await _dio.post('/auth/otp', data: {'phone': phone});
  }

  Future<Map<String, dynamic>> login(String phone, String code) async {
    final response = await _dio.post('/auth/login', data: {
      'phone': phone,
      'code': code,
    });
    return response.data['data'];
  }

  Future<void> register({
    required String nickname,
    required String phone,
    required String password,
    required String firstPetName,
  }) async {
    await _dio.post('/auth/register', data: {
      'nickname': nickname,
      'phone': phone,
      'password': password,
      'first_pet_name': firstPetName,
    });
  }
}
