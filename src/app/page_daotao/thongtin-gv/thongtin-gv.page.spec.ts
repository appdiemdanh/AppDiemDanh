import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThongtinGvPage } from './thongtin-gv.page';

describe('ThongtinGvPage', () => {
  let component: ThongtinGvPage;
  let fixture: ComponentFixture<ThongtinGvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinGvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThongtinGvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
