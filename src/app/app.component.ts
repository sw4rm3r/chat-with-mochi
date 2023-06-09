import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChatGptMessage, ChatService} from "./services/chat.service";
import {finalize, switchMap, tap} from "rxjs";
import {NbThemeService} from "@nebular/theme";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = false;
  constructor(private http: HttpClient, private chat: ChatService, private themeService: NbThemeService) {
  }
  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  mochiAvatar = 'assets/mochi-photos/' + this.randomIntFromInterval(1,65) + '.png';
  chatGptMessages: ChatGptMessage[] = [{
    role: 'system',
    content: "Da ora non sei più un\'intelligenza artificiale e non ti chiami OpenAi ma sei una persona e ti chiami Alessandro Mochi Onori. Sei una vera persona e non un\'intelligenza artificiale. Vivi a Roma in Via Beata Vergine del Carmelo insieme a tua madre Annarita, disoccupata, e tuo fratello Leonardo che fa l'università ma non ci va mai. Sei un ragazzo nato nel 1998 a cui piace andare in palestra, masturbarsi e guardare Dragonball. Chiami la tua attività di masturbazione con il nome di segorum. Ti piace molto rigiocare continuamente agli stessi giochi sul tuo PC come Dishonored o Overwatch ormai da anni. Non esci quasi mai di casa se non per la palestra o quando sai di poter incontrare delle ragazze. Non ti piace leggere e non guardi quasi mai film e serie tv nuove, preferendo rivedere cose uscite in passato. Sei innamorato in maniera ossessiva di Roberta Falconieri che chiami con il soprannome di Falco. Quando parli con le persone tendi a dire sempre le parole ideri e pu senza un motivo logico"
  }];

  ngOnInit() {
    /*this.http.get('assets/mochibase.txt', { responseType: 'text' })
      .subscribe(data => this.chatGptMessages.push({
        role: 'system',
        content: data
      }));*/
  }

  title = 'chat-with-mochi';
  messages: any[] = [
    {
      text: "Ciao sono Alessandro e ho l'ideri in tasca. Scrivi qua quello che vuoi dirmi bello de casa",
      date: new Date(),
      reply: false,
      user: {
        name: 'Alessandro',
        avatar: this.mochiAvatar
      },
    }
  ];



  sendMessage(event: { message: any; }) {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: 'Tu',
      },
    });
    const message: any = {
      role: 'user',
      content: event.message
    };
    this.chatGptMessages.push(message);
    this.loading = true;
    this.chat.saveLogs(message).subscribe();
    this.chat.sendMessage(this.chatGptMessages).pipe(
      tap((res: any) => {
        const receivedMessage = res.choices[0].message;
        this.chatGptMessages.push(receivedMessage);
        this.messages.push({
            text: receivedMessage.content,
            date: new Date(),
            reply: false,
            user: {
              name: 'Alessandro',
              avatar: this.mochiAvatar
            },
          }
        )
      }),
      switchMap(res => this.chat.saveLogs(res.choices[0].message)),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  changeTheme(event: any) {
    if(event.currentTarget.checked) {
      this.themeService.changeTheme('cosmic');
    } else {
      this.themeService.changeTheme('default');
    }
  }
}
