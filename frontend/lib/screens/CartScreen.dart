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
              return ListTile(title: Text(state.countedOrders[i].food.name), trailing: Text('(${state.countedOrders[i].price}€) x${state.countedOrders[i].ammount}'),);
            }
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        label: Text('PAGA ${state.totalPrice.toStringAsFixed(2)}€'),
      ),
    );
  }
}