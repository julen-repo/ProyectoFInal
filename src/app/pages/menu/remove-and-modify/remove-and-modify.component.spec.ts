import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAndModifyComponent } from './remove-and-modify.component';

describe('RemoveAndModifyComponent', () => {
  let component: RemoveAndModifyComponent;
  let fixture: ComponentFixture<RemoveAndModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveAndModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveAndModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
