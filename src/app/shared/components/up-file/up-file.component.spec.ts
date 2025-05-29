import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpFileComponent } from './up-file.component';

describe('UpFileComponent', () => {
  let component: UpFileComponent;
  let fixture: ComponentFixture<UpFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
