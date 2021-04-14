import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:frontend/models/Food.dart';

class CartProvider with ChangeNotifier, DiagnosticableTreeMixin {
  List<FoodModel> _orders = [];
  List<FoodModel> get orders => _orders;
  double get ammount => _orders.fold<double>(0, (ammount, food) => ammount + food.id);

  void addToCart(FoodModel food) {
    _orders.add(food);
    notifyListeners();
  }

  // Useful for DevTools
  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(IterableProperty('orders', _orders));
  }
}