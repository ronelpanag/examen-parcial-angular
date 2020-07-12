import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  user: User;
  constructor(
    private usersService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /*let id = this.route.snapshot.params["id"];
    if(id) {
      this
        .usersService
        .getUserById(id)
        .subscribe(
          result => this.user = result
        )
    }*/

    const data = JSON.parse(localStorage.getItem('user'));
    this.user = data;
    this.user.location.street = `${data.location.street.number} ${data.location.street.name}`;
  }
  ngOnDestroy(): void {
    localStorage.removeItem('user');
  }
}
