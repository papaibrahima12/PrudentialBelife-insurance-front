import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMotifComponent } from './details-motif.component';

describe('DetailsMotifComponent', () => {
  let component: DetailsMotifComponent;
  let fixture: ComponentFixture<DetailsMotifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsMotifComponent]
    });
    fixture = TestBed.createComponent(DetailsMotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
