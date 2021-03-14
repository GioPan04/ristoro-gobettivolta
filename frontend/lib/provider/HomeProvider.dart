import 'package:flutter/widgets.dart';
import 'package:frontend/apis/Api.dart';
import 'package:frontend/models/Food.dart';

class HomeProvider with ChangeNotifier {

  final MenuApi api = MenuApi();

  List<FoodModel>? _food;

  bool get hasLoaded => _food != null;
  List<FoodModel>? get food => _food;

  Future<void> loadData() async {
    _food = await api.avaibleFood();
    notifyListeners();
  }
}