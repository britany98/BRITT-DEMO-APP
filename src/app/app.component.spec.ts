import { TestBed } from '@angular/core/testing';
import { DemoComponent } from './app.component';

describe('DemoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DemoComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DemoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'BRITT-DEMO-app'`, () => {
    const fixture = TestBed.createComponent(DemoComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('BRITT-DEMO-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DemoComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('BRITT-DEMO-app app is running!');
  });
});
