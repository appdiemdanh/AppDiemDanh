import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChonmonPage } from './chonmon.page';

describe('ChonmonPage', () => {
  let component: ChonmonPage;
  let fixture: ComponentFixture<ChonmonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonmonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChonmonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
