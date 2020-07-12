import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  selectedUser: User;
  @Input() user$: Observable<User[]>;

  constructor(private router: Router) { }
  ngOnInit() {

  }


  onSelect(user: User) {
    this.selectedUser = user;
    localStorage.setItem('user', JSON.stringify(user));

    this.router.navigateByUrl(`/user/${user.id.name}`);
  }

}
