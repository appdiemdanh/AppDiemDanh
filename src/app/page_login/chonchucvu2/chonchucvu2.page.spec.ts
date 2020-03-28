import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Chonchucvu2Page } from './chonchucvu2.page';

describe('Chonchucvu2Page', () => {
  let component: Chonchucvu2Page;
  let fixture: ComponentFixture<Chonchucvu2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chonchucvu2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Chonchucvu2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
