import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThongtinSvPage } from './thongtin-sv.page';

describe('ThongtinSvPage', () => {
  let component: ThongtinSvPage;
  let fixture: ComponentFixture<ThongtinSvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinSvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThongtinSvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
