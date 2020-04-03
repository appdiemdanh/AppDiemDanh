import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiemdanhPage } from './diemdanh.page';

describe('DiemdanhPage', () => {
  let component: DiemdanhPage;
  let fixture: ComponentFixture<DiemdanhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiemdanhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiemdanhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
