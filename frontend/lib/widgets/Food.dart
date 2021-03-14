import 'package:flutter/material.dart';
import 'package:frontend/models/Food.dart';
import 'package:frontend/widgets/common/ImagedCard.dart';

class Food extends StatelessWidget {
  
  final FoodModel data;

  const Food(this.data, {Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return ImagedCard(
      image: Image.network(data.imageUrl, fit: BoxFit.cover),
      content: Text(data.name, style: Theme.of(context).textTheme.headline6),
      action: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Text("Rimanenti: ${data.quantityAvable}"),
          ),
          Spacer(),
          TextButton.icon(
            onPressed: () => {},
            label: Text("Ordina"),
            icon: Icon(Icons.add_shopping_cart),
            style: ButtonStyle(),
          )
        ],
      )
    );
  }
}