import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  amount: string;
  gender: string;

  users: Observable<User[]>;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onDefine() {
    if (this.gender != null && this.gender !== '') {
      this.gender = this.gender.toLowerCase();
    }

    this.userService.getUsers(this.amount, this.gender)
    .subscribe(
      (data) => { // Success
        this.users = data['results'];
      },
      (error) => {
        console.error(error);
      }
    );
  }


}
