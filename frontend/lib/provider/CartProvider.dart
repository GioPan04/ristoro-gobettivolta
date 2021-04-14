import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:frontend/models/Food.dart';
import "package:collection/collection.dart";

class CartProvider with ChangeNotifier, DiagnosticableTreeMixin {
  List<FoodModel> _orders = [];
  List<FoodModel> get orders => _orders;
  List<Order> get countedOrders {
    // This should be the "dart way", but it's pretty confusing...
    // 
    // Map<int,List<FoodModel>> values = groupBy<FoodModel,int>(orders, (food) => food.id);
    // return values.entries.map<Order>((value) => Order(food: value.value.first, ammount: value.value.length)).toList();

    // This is the "classic way", and I think I'll use this one
    int previousId = orders.first.id;
    List<Order> result = [Order(food: orders.first, ammount: 1)];
    
    for(int i = 1; i < orders.length; i++) {
      if(orders[i].id != previousId) {
        previousId = orders[i].id;
        result.add(Order(food: orders[i], ammount: 0));
      }
      result.last.ammount++;
    }
    return result;
  }

  double get totalPrice => _orders.fold<double>(0, (ammount, food) => ammount + food.id);

  void addToCart(FoodModel food) {
    _orders.add(food);
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

class Order {
  final FoodModel food;
  int ammount;

  Order({
    required this.food,
    required this.ammount
  });

  double get price => food.price * ammount;
  
}