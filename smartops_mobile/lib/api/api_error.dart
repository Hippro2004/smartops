import 'package:dio/dio.dart';

class ApiError {
  final int? status;
  final String code;
  final String? message;
  final Map<String, String> fieldErrors;

  ApiError({
    this.status,
    required this.code,
    this.message,
    this.fieldErrors = const {},
  });

  factory ApiError.fromDio(DioException e) {
    final res = e.response;

    if (res == null) return ApiError(code: "NETWORK_ERROR ");

    final data = res.data;
    if (data is Map) {
      final errors = <String, String>{};
      final raw = data['errors'];
      if (raw is Map) {
        raw.forEach((k, v) => errors[k.toString()] = v.toString());
      }
      return ApiError(
        status: res.statusCode,
        code: (data['code'] ?? 'UNKNOWN').toString(),
        message: data['message']?.toString(),
        fieldErrors: errors,
      );
    }

    return ApiError(status: res.statusCode, code: "UNKNOWN");
  }
}
