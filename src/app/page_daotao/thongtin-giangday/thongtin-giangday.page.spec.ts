import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThongtinGiangdayPage } from './thongtin-giangday.page';

describe('ThongtinGiangdayPage', () => {
  let component: ThongtinGiangdayPage;
  let fixture: ComponentFixture<ThongtinGiangdayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinGiangdayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThongtinGiangdayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
