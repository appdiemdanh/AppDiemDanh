import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChitietVanghocPage } from './chitiet-vanghoc.page';

describe('ChitietVanghocPage', () => {
  let component: ChitietVanghocPage;
  let fixture: ComponentFixture<ChitietVanghocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietVanghocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChitietVanghocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
