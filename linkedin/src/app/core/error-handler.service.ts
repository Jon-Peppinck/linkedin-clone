import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(public toastController: ToastController) {}

  async presentToast(errorMessage: string) {
    const toast = await this.toastController.create({
      header: 'Error occurred',
      message: errorMessage,
      duration: 2000,
      color: 'danger',
      buttons: [
        {
          icon: 'bug',
          text: 'dismiss',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(`${operation} failed: ${error.message}`); // TODO: remove in prod
      return of(result as T).pipe(tap(() => this.presentToast(error.message)));
    };
  }
}
