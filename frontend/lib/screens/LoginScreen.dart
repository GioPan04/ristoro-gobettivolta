import 'package:flutter/material.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';

class LoginScreen extends StatelessWidget {

  Future<void> login(BuildContext context) async {
    print('Logging in with remote server...');
      
    try {
      final result = await FlutterWebAuth.authenticate(url: 'https://pangio.freemyip.com/ristoro/api/auth/login', callbackUrlScheme: 'ristorogv');
      final token = Uri.parse(result).queryParameters['token'];
      debugPrint(token);
    } catch (e) {
      debugPrint('Something went wrong during user authentication!');
      debugPrint(e.toString());
      showDialog(context: context, builder: (_) => LoginErrorDialog());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Login"),
      ),
      body: Stack(
        // alignment: Alignment.center,
        children: [
          Positioned(
            child: Text("Benvenuto!", style: Theme.of(context).textTheme.headline4, textAlign: TextAlign.center),
            top: 20,
            left: 0,
            right: 0,
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text("Effettua il login con il tuo account istituzionale per continuare.", textAlign: TextAlign.center),
                SizedBox(height: 10),
                ElevatedButton(onPressed: () => login(context), child: Text("ACCEDI")),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class LoginErrorDialog extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text("Opss..."),
      content: Text("Sembra che qualcosa sia andato storto durante il login. Contatta l'amministratore di sistemi per risolvere il problema"),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: Text("UFFA, OK"))
      ],
    );
  }
}