import {
  Directive,
  Injectable,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Injectable()
export class FormRefSourceService {
  private static renderSource: any = {};

  add(path: string, ref: TemplateRef<void>) {
    FormRefSourceService.renderSource[path] = ref;
  }

  getRender(path: string) {
    return FormRefSourceService.renderSource[path];
  }
}

@Directive({
  selector: '[ngFormRef]',
})
export class NgFormRefDirective implements OnInit {
  @Input() ngFormRef!: string;

  constructor(
    private templateRef: TemplateRef<void>,
    private source: FormRefSourceService
  ) {}

  ngOnInit(): void {
    this.source.add(this.ngFormRef, this.templateRef);
  }
}
