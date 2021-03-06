import 'package:flutter/material.dart';
import 'package:frontend/provider/CartProvider.dart';
import 'package:provider/provider.dart';

class CartScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final CartProvider state = Provider.of(context);
    return Scaffold(
      appBar: AppBar(
        title: Text('Carrello'),
      ),
      body: Builder(
        builder: (context) {
          if(state.orders.isEmpty) return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.no_food_outlined, size: 48.0, color: Colors.black38,),
                SizedBox(height: 10),
                Text("Non hai niente nel carrello")
              ],
            ) 
          );

          return ListView.builder(
            itemCount: state.countedOrders.length,
            itemBuilder: (context, i) {
              final data = state.countedOrders;
              final food = data.keys.elementAt(i);
              final ammount = data[food]!;
              final price = food.price * ammount;

              return ListTile(
                title: Text(food.name),
                trailing: Text('x$ammount ($price€)'),
                leading: IconButton(
                  icon: Icon(Icons.remove_circle_outline),
                  onPressed: () => state.removeFromCart(food),
                ),
              );
            }
          );
        },
      ),
      floatingActionButton: state.orders.isNotEmpty 
        ? FloatingActionButton.extended(
          onPressed: () {},
          label: Text('PAGA ${state.totalPrice.toStringAsFixed(2)}€'),
        )
        : null,
    );
  }
}