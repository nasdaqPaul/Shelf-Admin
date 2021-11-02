import { Inject, Injectable } from '@angular/core';
import { Toast, Modal } from 'bootstrap';
import { BS_TOKEN } from './bootsratp.service';

@Injectable({
  providedIn: 'root',
})
export default class NotificationService {
  constructor(@Inject(BS_TOKEN)private bootstrap: any) {

  }

  alert(id: string) {
    const toastEl = document.getElementById(id);
    const toast = new Toast(toastEl!);
    toast.show();
  }

  showDialog(confirmDeleteLocalArticle: string) {
    console.log('dialog');
    console.log('id ', confirmDeleteLocalArticle);
    const modal = new Modal(document.getElementById(confirmDeleteLocalArticle)!);

    modal.show();
  }
}
