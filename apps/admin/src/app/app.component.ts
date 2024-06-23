import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import {
  lastValueFrom,
  throwError,
  of,
  BehaviorSubject,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
} from 'rxjs';
@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit, OnDestroy {
  // 选项卡切换
  private tabChange$ = new Subject<number>();
  private subscription!: Subscription;
  constructor(private msg: NzMessageService) {}
  ngOnInit(): void {
    console.log(111);
    this.msg.success('123');
  }
  title = 'admin';

  //lastValueFrom 错误处理方式
  async lastValueFromTest() {
    const observableWithError = throwError(
      () => new Error('Something went wrong!')
    );
    // 方式一
    try {
      // 尝试从一个可能会抛出错误的 Observable 获取最后一个值
      const result = await lastValueFrom(observableWithError);
      console.log('Result:', result);
    } catch (error: any) {
      console.log('Caught an error:', error.message); // 输出错误信息
    }

    //方式二
    lastValueFrom(observableWithError)
      .then((value) => {
        console.log('Result:', value); // 输出: Result: Default Value
      })
      .catch((error) => {
        // 如果 catchError 中再次抛出错误，这里会捕获
        console.log('Uncaught error:', error);
      });
  }

  behaviorSubjectTest() {
    // 状态管理：在应用程序中，BehaviorSubject 可以用来存储和管理全局状态，如用户登录状态、主题设置等。当状态改变时，所有订阅它的组件都能自动更新。新加入的组件会立即得到当前的状态值，无需额外的初始化逻辑。

    // 跨组件通信：在复杂的前端应用中，不同组件之间可能需要共享数据。使用 BehaviorSubject 可以方便地实现组件间的数据传递，尤其是在非父子关系的组件间。

    // 缓存数据：对于需要频繁查询但不经常改变的数据，可以通过 BehaviorSubject 缓存起来。这样，新订阅的组件可以直接获取到缓存的最新数据，而不需要再次发起请求。

    // 表单管理：在表单处理中，可以使用 BehaviorSubject 来保存表单的状态或值。这样，不仅可以实时反映表单的变化，还可以在页面刷新后恢复表单的最新状态。

    // 实时更新：对于需要实时更新显示的信息，如聊天消息、股票价格等，BehaviorSubject 可以确保新订阅的用户立即看到当前的最新信息，同时也能持续接收之后的更新。
    //     // 创建一个 BehaviorSubject，并设置初始值
    const userStatus = new BehaviorSubject<any | null>({
      username: 'Alice1',
      loggedIn: false,
    });

    // 当用户登录时，发送新的状态
    // userStatus.next({ username: 'Alice', loggedIn: true });

    // 组件A订阅用户状态
    userStatus.subscribe((status) => {
      console.log('Component A:', status);
    });

    // 用户登出
    userStatus.next(null);

    // 新的组件B订阅，立即收到最新的状态（这里是null）
    userStatus.subscribe((status) => {
      console.log('Component B:', status);
    });
  }

  // 处理多次触发问题
  distinctUntilChangedTest() {
    // 用户输入处理
    // searchInput.valueChanges.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged()
    // ).subscribe(query => {
    //   // 发起搜索请求或执行验证逻辑
    // });

    this.subscription = this.tabChange$
      .pipe(
        debounceTime(300), // 等待300毫秒后再执行
        distinctUntilChanged()
      )
      .subscribe((index) => {
        // 接收参数
      });
  }

  ngOnDestroy(): void {
    // 清理订阅，防止内存泄漏
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
