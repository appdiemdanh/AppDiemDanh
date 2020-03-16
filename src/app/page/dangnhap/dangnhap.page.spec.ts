import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DangnhapPage } from './dangnhap.page';

describe('DangnhapPage', () => {
  let component: DangnhapPage;
  let fixture: ComponentFixture<DangnhapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangnhapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DangnhapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
