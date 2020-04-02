import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThongtinsvPage } from './thongtinsv.page';

describe('ThongtinsvPage', () => {
  let component: ThongtinsvPage;
  let fixture: ComponentFixture<ThongtinsvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinsvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThongtinsvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
