import 'dart:convert';

import 'package:smartops_mobile/core/dio_client.dart';
import 'package:smartops_mobile/models/user_model.dart';

class UserService {
  Future<bool> registerUser(User user) async {
    try {
      final response = await DioClient.dio.post(
        "/users/register",
        data: user.toJson(),
      );
      if (response.statusCode == 201) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  Future<void> loginUser(String username, String password) async {
    try {
      await DioClient.dio.post(
        "/users/login",
        data: jsonEncode({"username": username, "password": password}),
      );
    } catch (e) {
      rethrow;
    }
  }
}
