import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DangkyPage } from './dangky.page';

describe('DangkyPage', () => {
  let component: DangkyPage;
  let fixture: ComponentFixture<DangkyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangkyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DangkyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
