import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThongtindiemdanhPage } from './thongtindiemdanh.page';

describe('ThongtindiemdanhPage', () => {
  let component: ThongtindiemdanhPage;
  let fixture: ComponentFixture<ThongtindiemdanhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtindiemdanhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThongtindiemdanhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
