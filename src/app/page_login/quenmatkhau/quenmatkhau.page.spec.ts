import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuenmatkhauPage } from './quenmatkhau.page';

describe('QuenmatkhauPage', () => {
  let component: QuenmatkhauPage;
  let fixture: ComponentFixture<QuenmatkhauPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuenmatkhauPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuenmatkhauPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
