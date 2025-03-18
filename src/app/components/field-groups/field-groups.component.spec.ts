import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGroupsComponent } from './field-groups.component';

describe('FieldGroupsComponent', () => {
  let component: FieldGroupsComponent;
  let fixture: ComponentFixture<FieldGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
