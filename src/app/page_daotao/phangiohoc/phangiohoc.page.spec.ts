import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhangiohocPage } from './phangiohoc.page';

describe('PhangiohocPage', () => {
  let component: PhangiohocPage;
  let fixture: ComponentFixture<PhangiohocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhangiohocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhangiohocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
