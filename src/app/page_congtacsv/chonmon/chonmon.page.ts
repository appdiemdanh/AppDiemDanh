import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chonmon',
  templateUrl: './chonmon.page.html',
  styleUrls: ['./chonmon.page.scss'],
})
export class ChonmonPage implements OnInit {

  constructor(
    public router : Router,) {
   }

  ngOnInit() {
  }
  chonlop(){
    this.router.navigate(['chonlop'])
  }
}
