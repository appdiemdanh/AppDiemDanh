import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChonlopPage } from './chonlop.page';

describe('ChonlopPage', () => {
  let component: ChonlopPage;
  let fixture: ComponentFixture<ChonlopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonlopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChonlopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
