import 'package:flutter/material.dart';
import 'package:frontend/provider/CartProvider.dart';
import 'package:frontend/provider/HomeProvider.dart';
import 'package:frontend/screens/HomeScreen.dart';
import 'package:frontend/screens/LoginScreen.dart';
import 'package:provider/provider.dart';

class RistoroApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<HomeProvider>(create: (context) => HomeProvider()),
        ChangeNotifierProvider<CartProvider>(create: (context) => CartProvider()),
      ],
      child: MaterialApp(
        title: "Ristoro Gobetti Volta",
        theme: ThemeData(fontFamily: "Raleway", primarySwatch: Colors.orange, appBarTheme: AppBarTheme(titleTextStyle: TextStyle(color: Colors.white))),
        routes: {
          '/': (context) => HomeScreen(),
          'login': (context) => LoginScreen(),
        },
      ),
    );
  }
}