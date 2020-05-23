import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { XacthucEmailPage } from './xacthuc-email.page';

describe('XacthucEmailPage', () => {
  let component: XacthucEmailPage;
  let fixture: ComponentFixture<XacthucEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XacthucEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(XacthucEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
