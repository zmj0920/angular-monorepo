import { Directive, Injectable, Input, OnInit, TemplateRef, inject } from '@angular/core';

@Injectable()
export class FormRefSourceService {
  private static renderSource: {
    [key: string]: TemplateRef<void | undefined>;
  } = {};

  add(path: string, ref: TemplateRef<void>) {
    FormRefSourceService.renderSource[path] = ref;
  }

  getRender(path: string): TemplateRef<any> {
    return FormRefSourceService.renderSource[path];
  }
}

@Directive({
  selector: '[ngFormRef]'
})
export class NgFormRefDirective implements OnInit {
  private readonly source = inject(FormRefSourceService);
  private readonly ref = inject(TemplateRef);
  @Input() ngFormRef!: string;

  ngOnInit(): void {
    this.source.add(this.ngFormRef, this.ref);
  }
}
