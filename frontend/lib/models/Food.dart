class FoodModel {
  final int id;
  final String name;
  final FoodType type;
  final int quantityAvable;
  final String? description;
  final String imageUrl;

  FoodModel({
    required this.id,
    required this.name,
    required this.quantityAvable,
    required this.imageUrl,
    this.type = FoodType.sandwich,
    this.description
  });

  factory FoodModel.fromJSON(Map<String,dynamic> data) {
    return FoodModel(
      id: data['id'] as int,
      name: data['name'] as String,
      quantityAvable: data['qtyAvaible'] as int,
      imageUrl: data['imageUrl'] as String,
    );
  }

  @override
  String toString() => 'FoodModel(id: $id)';
}

enum FoodType {
  drink,
  snack,
  sandwich
}