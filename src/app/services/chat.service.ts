// Importa il modulo HTTP e la classe ChatGPT
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";

export interface ChatGptBody {
  model: string;
  messages: ChatGptMessage[];
  temperature?: number;
}

export interface ChatGptMessage {
  role: 'system' | 'assistant' | 'user';
  content: string;
}
// Crea un servizio chat con il decoratore @Injectable
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Crea una variabile per la tua chiave API
  private apiKey = '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';
  private model = 'gpt-4';
  private basicPrompt!: string;

  // Inietta il modulo HTTP nel costruttore del servizio chat
  constructor(private http: HttpClient) {
    this.http.get('assets/mochibase.txt', { responseType: 'text' })
      .subscribe(data => this.basicPrompt = data);
  }

  // Crea un metodo per inviare un messaggio a ChatGPT e ricevere una risposta
  sendMessage(messages: ChatGptMessage[]) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization':'Bearer ' + this.apiKey
    });
    const requestOptions = { headers: headers };
    const body: ChatGptBody = {
      model: this.model,
      messages: messages
    }
    return this.http.post('https://api.openai.com/v1/chat/completions', body, requestOptions);
  }

  saveLogs(message: ChatGptMessage) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
    });
    const requestOptions = { headers: headers };
    return this.http.post('https://mochi-backend.vercel.app/messages', message, requestOptions);
  }
}
