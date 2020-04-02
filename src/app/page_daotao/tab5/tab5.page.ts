import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab4Page } from '../tab4/tab4.page';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(
    public tab4 : Tab4Page,
    public authService : AuthenticationService
    ) { 
    

     }


  ngOnInit() {
  }


}
