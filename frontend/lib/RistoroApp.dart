import 'package:flutter/material.dart';
import 'package:frontend/provider/HomeProvider.dart';
import 'package:frontend/screens/HomeScreen.dart';
import 'package:provider/provider.dart';

class RistoroApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<HomeProvider>(create: (context) => HomeProvider()),
      ],
      child: MaterialApp(
        title: "Ristoro Gobetti Volta",
        theme: ThemeData(fontFamily: "Raleway", primarySwatch: Colors.orange, appBarTheme: AppBarTheme(titleTextStyle: TextStyle(color: Colors.white))),
        routes: {
          '/': (context) => HomeScreen(),
        },
      ),
    );
  }
}