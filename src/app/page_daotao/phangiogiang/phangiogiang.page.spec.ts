import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhangiogiangPage } from './phangiogiang.page';

describe('PhangiogiangPage', () => {
  let component: PhangiogiangPage;
  let fixture: ComponentFixture<PhangiogiangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhangiogiangPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhangiogiangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
