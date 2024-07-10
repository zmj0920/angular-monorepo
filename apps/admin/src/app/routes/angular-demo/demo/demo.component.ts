import { Component, ElementRef, Input, booleanAttribute, numberAttribute, output } from '@angular/core';

function trimString(value: string | undefined) {
  return value?.trim() ?? '';
}
@Component({
  selector: 'app-demo',
  // standalone: true, 独立组件
  // imports: [CommonModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  // alias别名
  onNameChange = output<string>({
    alias: 'ngxNameChange'
  });
  // @Input({required: true}) value = 0; //必须始终具有值
  // transform 函数来在 Angular 设置输入时更改输入的值。
  @Input({ transform: (val: any) => trimString(val), alias: 'sliderValue' })
  label = '';
  // booleanAttribute 模拟了标准 HTML 布尔属性 的行为，属性的 存在表示 "true" 值。然而，Angular 的
  // booleanAttribute 将字面字符串 "false" 视为布尔值 false。
  // numberAttribute 尝试将给定值解析为数字，如果解析失败则产生 NaN。
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: numberAttribute }) number = 0;
  // afterRender 和 afterNextRender 必须在 注入上下文中调用，通常是在组件的构造函数中。
  // afterNextRender	当所有组件都已渲染到 DOM 时运行一次。
  // afterRender	每次所有组件都渲染到 DOM 时运行。

  constructor(elementRef: ElementRef) {
    // 可以选择性地指定一个 phase。该阶段让你可以控制 DOM 操作的顺序，在 写操作之前进行 读操作，以最小化 布局抖动。
    // afterRender(
    //   () => {
    //     // Focus the first input element in this component.
    //     elementRef.nativeElement.querySelector('input')?.focus();
    //   },
    //   { phase: AfterRenderPhase.Read }
    // );
  }
}
