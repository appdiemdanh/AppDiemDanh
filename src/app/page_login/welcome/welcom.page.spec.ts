import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelcomPage } from './welcom.page';

describe('WelcomPage', () => {
  let component: WelcomPage;
  let fixture: ComponentFixture<WelcomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
