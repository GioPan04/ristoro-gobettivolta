import 'package:flutter/material.dart';
import 'package:frontend/models/Food.dart';

class Food extends StatelessWidget {
  
  final FoodModel data;

  const Food(this.data, {Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(data.name, style: Theme.of(context).textTheme.headline6,),
        ],
      ),
    );
  }
}