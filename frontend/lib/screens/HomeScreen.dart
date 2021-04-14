import 'package:flutter/material.dart';
import 'package:frontend/provider/CartProvider.dart';
import 'package:frontend/widgets/Food.dart';
import '../provider/HomeProvider.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {


  @override
  void initState() { 
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      Provider.of<HomeProvider>(context, listen: false).loadData();
    });
  }


  @override
  Widget build(BuildContext context) {
    final CartProvider cart = Provider.of(context);
    return Scaffold(
      appBar: AppBar(
        title: Text("Ristoro Gobetti Volta"),
        actions: [
          IconButton(icon: Icon(Icons.ac_unit), onPressed: () => Navigator.pushNamed(context, 'login'))
        ],
      ),
      body: Consumer<HomeProvider>(
        builder: (context, state, _) {
          final menu = state.food;
          if(menu == null) return Center(child: CircularProgressIndicator());
          return ListView.builder(
            itemCount: menu.length,
            itemBuilder: (context, i) => Food(menu[i], onOrderTapped: () => cart.addToCart(menu[i]))
          );
        }
      ),
      floatingActionButton: cart.orders.isNotEmpty
        ? FloatingActionButton(
          onPressed: () {},
          tooltip: 'Vai al carrello',
          child: Icon(Icons.shopping_cart_outlined),
        )
        : null,
    );
  }
}