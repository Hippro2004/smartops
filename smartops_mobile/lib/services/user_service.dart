import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:smartops_mobile/api/api_error.dart';
import 'package:smartops_mobile/core/dio_client.dart';
import 'package:smartops_mobile/models/user_model.dart';

class UserService {
  Future<String> registerUser(User user) async {
    try {
      final response = await DioClient.dio.post(
        "/users/register",
        data: user.toJson(),
      );

      return response.data["username"] as String;
    } on DioException catch (e) {
      throw ApiError.fromDio(e);
    }
  }

  Future<String> loginUser({
    required String username,
    required String password,
  }) async {
    try {
      final res = await DioClient.dio.post(
        "/users/login",
        data: {"username": username, "password": password},
      );
      return res.data["username"] as String;
    } on DioException catch (e) {
      throw ApiError.fromDio(e);
    }
  }
}
