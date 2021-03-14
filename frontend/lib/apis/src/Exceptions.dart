import '../../models/Failure.dart';

class UnauthorizedFailure extends Failure {
  UnauthorizedFailure() : super("Non sei autorizzato.");
}

class NotFoundFailure extends Failure {
  NotFoundFailure() : super("Non è stato possibile trovare il contenuto richiesto.");
}

class ClientFailure extends Failure {
  ClientFailure() : super("Qualcosa è andato storto. Prova a verificare se l'app è aggiornata.");
}

class ServerFailure extends Failure {
  ServerFailure() : super("Errore del server.");
}

class UnexpectedFailure extends Failure {
  UnexpectedFailure() : super("Errore non riconosciuto.");
}