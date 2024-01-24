import { AfterViewInit, ContentChild, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements AfterViewInit {

  constructor(private r2: Renderer2) { }

  toggleColor = false;

  @ContentChild('dropdownBtn', { static: true }) dropdownBtn!: ElementRef<HTMLButtonElement>;
  @ContentChild('menu', { static: true }) menu!: ElementRef<HTMLDListElement>;

  // @HostListener('click') changeColor() {
  //   this.toggleColor = !this.toggleColor;
  // }
  @HostListener('click', ['$event']) onClick(event: any) {
    event.stopImmediatePropagation();
    this.toggleColor = !this.toggleColor;
    event.stopPropagation();
  }

  ngAfterViewInit(): void {
    this.r2.listen(this.dropdownBtn.nativeElement, 'click', () => {
      this.dropdownBtn.nativeElement.style.color = this.toggleColor ? 'rgb(155, 155, 155)' : 'black';
      this.menu.nativeElement.classList.toggle('show');
    });
    this.r2.listen(this.menu.nativeElement, 'click', () => {
      this.menu.nativeElement.classList.remove('show');
      this.dropdownBtn.nativeElement.style.color = 'rgb(155, 155, 155)';
    })
    this.r2.listen('window', 'click', () => {
      this.menu.nativeElement.classList.remove('show');
      this.dropdownBtn.nativeElement.style.color = 'rgb(155, 155, 155)';
      this.toggleColor = false;
    })
  }
}
