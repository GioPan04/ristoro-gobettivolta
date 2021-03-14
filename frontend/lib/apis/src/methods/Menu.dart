import '../ApiExecutor.dart';
import '../../../models/Food.dart';

class MenuApi extends ApiExecutor {
  
  @override
  String get methodPath => 'menu';

  Future<List<FoodModel>> avaibleFood() async {
    Map<String,dynamic> data = await get('', requireAuth: false);
    return data['menu'].map<FoodModel>((json) => FoodModel.fromJSON(json)).toList();
  }
}