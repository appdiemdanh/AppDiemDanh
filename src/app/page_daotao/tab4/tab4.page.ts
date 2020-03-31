import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  isChecked = ""
  id = ""
  listsinhvien : any
  tenlop = "CD18DĐ1"

  constructor(private afDB : AngularFireDatabase) {
    //this.Sapxepkitu();
   }

  ngOnInit() {
    this.afDB.list(`/danhsachsinhvienk18/` + this.tenlop).valueChanges().subscribe(res=>{this.listsinhvien = res}) 
  }
  //
  getValues(event)
  {
    this.isChecked = event.detail.checked;
    this.id = event.target.id;
    console.log(this.id);
    console.log(this.isChecked);
  }
  //
  Sapxepkitu()
   {
     this.listsinhvien.sort(function(a, b) {
       return a.D[0].localeCompare(b.D[0]);
     });
    
     var newsinhvien = {};
    
     for (var i = 0; i < this.listsinhvien.length; i++) {
       var c = this.listsinhvien[i].D[0].toUpperCase();
       if (newsinhvien[c] && newsinhvien[c].length >= 0)
         newsinhvien[c].push(this.listsinhvien[i]);
       else {
         newsinhvien[c] = [];
         newsinhvien[c].push(this.listsinhvien[i]);
       }
     }
    
     //console.log(newsinhvien);
   }
  //

}
