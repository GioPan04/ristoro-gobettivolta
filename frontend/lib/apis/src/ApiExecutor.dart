import 'dart:convert';

import 'package:flutter/foundation.dart';

import '../../models/Failure.dart';
import 'package:http/http.dart' as http;
import 'package:path/path.dart' as Path;

import 'Exceptions.dart';

abstract class ApiExecutor {

  bool get useHttps => true;
  
  /// The base domain where request should be made
  String get domain => kReleaseMode ? 'pangio.freemyip.com' : 'linux300.pangio.lan';

  /// The base path for api methods
  String get apiPath => kReleaseMode ? 'api' : 'ristoro/api';

  /// You should override this method
  String get methodPath => '';

  Map<String,String> get authenticatedHeaders => {
    'Authorization': '--authcode--'
  };

  Uri _generateUri(String name) {
    String path = Path.join(apiPath, methodPath, name); 
    if(useHttps) {
      return Uri.https(domain, path);
    } else {
      return Uri.http(domain, path);
    }
  }

  /// Execute a [GET] request and return the parsed json body
  Future<Map<String,dynamic>> get(String path, {bool requireAuth = true}) async {
    final String body = await getBody(path, requireAuth: requireAuth);
    return jsonDecode(body);
  }

  /// Execute a [GET] request and return the plain text body
  Future<String> getBody(String path, {bool requireAuth = true}) async {
    Uri uri = _generateUri(path);
    try {
      http.Response res = await http.get(uri, headers: requireAuth ? authenticatedHeaders : null);
      checkError(res.statusCode);
      return res.body;
    } catch (e) {
      if(e is Failure) throw e;

      throw UnexpectedFailure();
    }
  }

  static void checkError(int statusCode) {
    if(statusCode == 200 || statusCode == 201) return;
    if(statusCode == 401 || statusCode == 403) throw UnauthorizedFailure();
    if(statusCode == 404) throw NotFoundFailure();
    if(statusCode >= 400 && statusCode < 500) throw ClientFailure();
    if(statusCode >= 500 && statusCode < 600) throw ServerFailure();
    throw UnexpectedFailure();
  }
}