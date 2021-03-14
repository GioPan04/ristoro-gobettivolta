class FoodModel {
  final int id;
  final String name;
  final FoodType type;
  final int quantityAvable;
  final String? description;

  FoodModel({
    required this.id,
    required this.name,
    required this.quantityAvable,
    this.type = FoodType.sandwich,
    this.description
  });

  factory FoodModel.fromJSON(Map<String,dynamic> data) {
    return FoodModel(
      id: data['id'] as int,
      name: data['name'] as String,
      quantityAvable: data['qtyAvaible'] as int
    );
  }
}

enum FoodType {
  drink,
  snack,
  sandwich
}