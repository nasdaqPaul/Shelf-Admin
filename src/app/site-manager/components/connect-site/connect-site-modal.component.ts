import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Alert } from 'bootstrap';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'connect-site',
  templateUrl: './connect-site-modal.component.html',
  styleUrls: ['./connect-site-modal.component.css'],
})
export class ConnectSiteModalComponent implements OnInit {
  connectSiteForm = new FormGroup({
    host: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  showFailedAuthAlert = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  connect() {
    console.log(this.connectSiteForm.value);
    this.authService.connect(this.connectSiteForm.value).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) this.showFailedAuthAlert = true;
      throw error;
    })).subscribe();
  }
}
