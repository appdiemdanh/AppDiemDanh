import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChonchucvuPage } from './chonchucvu.page'

describe('ChonchucvuPage', () => {
  let component: ChonchucvuPage;
  let fixture: ComponentFixture<ChonchucvuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonchucvuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChonchucvuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
