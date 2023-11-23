import { AfterViewInit, ContentChild, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements AfterViewInit {

  constructor(private r2: Renderer2) { }

  toggleColor = false;

  @ContentChild('dropdownBtn', { static: true }) dropdownBtn!: ElementRef<HTMLButtonElement>;
  @ContentChild('menu', { static: true }) menu!: ElementRef<HTMLDListElement>;

  @HostListener('click') changeColor() {
    this.toggleColor = !this.toggleColor;
  }
  
  ngAfterViewInit(): void {
    this.r2.listen(this.dropdownBtn.nativeElement, 'click', () => {
      this.dropdownBtn.nativeElement.style.color = this.toggleColor ? 'rgb(155, 155, 155)' : 'black';
      this.menu.nativeElement.classList.toggle('show');
    })
  }
}
