import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LichsudiemdanhPage } from './lichsudiemdanh.page';

describe('LichsudiemdanhPage', () => {
  let component: LichsudiemdanhPage;
  let fixture: ComponentFixture<LichsudiemdanhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichsudiemdanhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LichsudiemdanhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
