import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:frontend/models/Food.dart';

class CartProvider with ChangeNotifier, DiagnosticableTreeMixin {
  List<FoodModel> _orders = [];
  List<FoodModel> get orders => _orders;
  Map<FoodModel,int> get countedOrders {

    // This should be the "dart way"
    final counterMap = <FoodModel,int>{};

    for(final order in orders) {
      counterMap[order] = (counterMap[order] ?? 0) + 1;
    }

    return counterMap;

    // This is the "classic way"
    // int previousId = orders.first.id;
    // List<Order> result = [Order(food: orders.first, ammount: 1)];
    
    // for(int i = 1; i < orders.length; i++) {
    //   if(orders[i].id != previousId) {
    //     previousId = orders[i].id;
    //     result.add(Order(food: orders[i], ammount: 0));
    //   }
    //   result.last.ammount++;
    // }
    // return result;
  }

  double get totalPrice => _orders.fold<double>(0, (ammount, food) => ammount + food.price);

  void addToCart(FoodModel food) {
    _orders.add(food);
    // Insertion sort
    _orders.sort((a, b) => a.name.compareTo(b.name));
    notifyListeners();
  }

  void removeFromCart(FoodModel model) {
    int pos = _orders.indexWhere((element) => element.id == model.id);
    _orders.removeAt(pos);
    // Insertion sort
    _orders.sort((a, b) => a.name.compareTo(b.name));
    notifyListeners();
  }

  // Useful for DevTools
  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(IterableProperty('orders', _orders));
  }
}