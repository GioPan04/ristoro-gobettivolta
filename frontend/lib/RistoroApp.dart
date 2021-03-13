import 'package:flutter/material.dart';
import 'package:frontend/screens/HomeScreen.dart';

class RistoroApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Ristoro Gobetti Volta",
      routes: {
        '/': (context) => HomeScreen(),
      },
    );
  }
}