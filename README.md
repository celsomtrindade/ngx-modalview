# NGX ModalDialog

> Disclaimer
>
> This project is based on [Ngx Simple Modal](https://github.com/kevcjones/ngx-modalview). I have no interest in take the credits of building this package, but since it wasn't being mantained and it's the only project I know that works pretty well with Angular, I decided to create my own variation to keep up with the support.
>
> If you are interested in help this project, you are more then welcome to do so!

## Version

We will use a version system to match Angular core version, following the practice of a bunch of other modules out there. This way you'll know which version to use based on your Angular project version and the current version of NgxModalView.

## Helping

If you want to help the project being mantained, please do so. Either by reporting new issues or creting PR's to fix things or improve the module. Feel free to reach out and help.

## Features

It is a library to makes modals easier in Angular (16+), has no dependencies, but plays well with bootstrap or other frameworks.

✅  Create clear and reusable modal components;
✅  It makes managing modals painless and clearer;
✅  Draggable modals;
✅  Extend the ModalComponent class and implement any content you want;

## Table of Contents

- [Worked on](#worked-on)
- [Installation](#installation)
- [Quick start](#quickstart)
- [How to create a draggable modal](#)
- [Bootstrap](#what-if-i-want-to-use-bootstrap-3-or-4)

## Worked on

- Angular 16+ with new ng-packagr updates supplied by the Angular tooling team themselves :bowtie:

## Installation
```shell
$ npm install ngx-modalview
```
or
```shell
$ yarn add ngx-modalview
```

## Quickstart

### Step 0. assuming you want to use our built in styles

To create a custom modal box, you can start with the following example, wich is going to create a modal with a header, body and footer. The css already provide a transparency overlay, opacity and slide animation.

Inside your angular-cli.json update your styles sections to include our CSS
```
"styles": [
  "styles.css",
  "../node_modules/ngx-modalview/styles/ngx-modal.css"
],
```

#### But i use SASS/SCSS?

We got you covered, you can `@import '../node_modules/ngx-modalview/styles/ngx-modal.scss'` into what ever root based scss global style you want. Update the relative path depending on where you want to pull it in.

#### Assumed HTML template if you want our base styles

```html
<div class="modal-content">
    <div class="modal-header">
      <!-- Your Title -->
    </div>
    <div class="modal-body">
      <!-- Modal custom content -->
    </div>
    <div class="modal-footer">
      <!--
        Footer to add button control
        ex.: <button (click)="close()">Cancel</button>
      -->
    </div>
</div>
```


### Step 1. Import the '**NgxModalView**' module

app.module.ts:
```typescript
import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { NgxModalView } from 'ngx-modalview';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgxModalView
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
By default, modal placeholder will be added to AppComponent.
But you can select custom placeholder (i.e. document body):

```typescript
imports: [
    ...
    NgxModalView.forRoot({container: document.body})
  ]
```

If you want a container that is not yet in the DOM during the intial load you can pass a promiseLike function instead to container e.g.

```typescript
imports: [
    ...
    NgxModalView.forRoot({container: elementPromisingFn()})
  ]
```

where `elementPromisingFn` is anything you want as long as its resolvement returns a nativeElement node from the DOM.

#### Setting up modal defaults globally

An optional second parameter takes a global object of type NgxModalOptions (all fields required).. you can spread
these with the `defaultNgxModalOptions` if you like.

```typescript
imports: [
    ...
    NgxModalView.forRoot({container: 'modal-container'}, {...defaultNgxModalOptions, ...{
      closeOnEscape: true,
      closeOnClickOutside: true,
      wrapperDefaultClasses: 'modal fade-anim',
      wrapperClass: 'in',
      animationDuration: 400,
      autoFocus: true
    }})

  ]
```

OR, if you need to control behaviour more granularly, you can provide the configuration in modules or locally like so

```typescript
provide:[
  {
    provide: DefaultNgxModalOptionConfig,
    useValue: {...defaultNgxModalOptions, ...{ closeOnEscape: true, closeOnClickOutside: true }}
  }
]
```


### Step 2. Create your modal component
Your modal is expected to be extended from **NgxModalComponent**.
**NgxModalService** is generic class with two arguments:
1) input modal data type (data to initialize component);
2) modal result type;

Therefore **NgxModalService** is supposed to be a constructor argument of **NgxModalComponent**.

confirm.component.ts:
```typescript
import { Component } from '@angular/core';
import { NgxModalComponent } from "ngx-modalview";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({
    selector: 'confirm',
    template: `
      <div class="modal-content">
        <div class="modal-header">
          <h4>{{title || 'Confirm'}}</h4>
        </div>
        <div class="modal-body">
          <p>{{message || 'Are you sure?'}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" (click)="close()" >Cancel</button>
          <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
        </div>
      </div>
    `
})
export class ConfirmComponent extends NgxModalComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor() {
    super();
  }
  confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close();
  }
}
```

### Step 3. Register created component to module
Add component to **declarations**.

app.module.ts:
```typescript
    import { NgModule} from '@angular/core';
    import { CommonModule } from "@angular/common";
    import { BrowserModule } from '@angular/platform-browser';
    import { NgxModalView } from 'ngx-modalview';
    import { ConfirmComponent } from './confirm.component';
    import { AppComponent } from './app.component';
    @NgModule({
      declarations: [
        AppComponent,
        ConfirmComponent
      ],
      imports: [
        CommonModule,
        BrowserModule,
        NgxModalView
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule {}
```

### Step 4. Usage

app.component.ts
```typescript
    import { Component } from '@angular/core';
    import { ConfirmComponent } from './confirm.component';
    import { NgxModalService } from "ngx-modalview";

    @Component({
      selector: 'app',
      template: `
        <div class="modal-content">
          <div class="modal-header">
            <h4>Confirm</h4>
          </div>
          <div class="modal-body">
            <p>Are you sure?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="showConfirm()">Show confirm</button>
          </div>
        </div>
      `
    })
    export class AppComponent {
        constructor(private NgxModalService:NgxModalService) {}
        showConfirm() {
            let disposable = this.NgxModalService.addModal(ConfirmComponent, {
                  title: 'Confirm title',
                  message: 'Confirm message'
                })
                .subscribe((isConfirmed)=>{
                    //We get modal result
                    if(isConfirmed) {
                        alert('accepted');
                    }
                    else {
                        alert('declined');
                    }
                });
            //We can close modal calling disposable.unsubscribe();
            //If modal was not closed manually close it by timeout
            setTimeout(()=>{
                disposable.unsubscribe();
            },10000);
        }
    }
```

## How to create a draggable modal

So you want to be able to move the modal around. We got that too. It is as simple as adding `draggable: true` to the options. This will default to adding a drag handler to the entire modal. With this you can move the modal around.

```typescript
imports: [
  NgxModalView.forRoot({...}, {
      ...
      draggable: true
      ...
    })
],
```
or when adding the modal
```typescript
this.NgxModalService
  .addModal(PromptComponent, {
    title: 'Name dialog',
  }, {
    draggable: true
  })
```

The `draggable` class with automatically be attached to the modal component. The class can be customized through the `draggableClass` option property.

### Custom drag handler
You can specify which element should be used as drag handler by using `ViewChild` and naming the property `handle`.
```typescript
@ViewChild('handle', {static: true}) handle: ElementRef;
```
Then in your view add `#handle` to the element you want to use as the drag handler. The `drag-handler` class will automatically be attached to this element.

```angular2html
<div class="modal-content">
  <div class="modal-header" #handle>
    <h4>Title</h4>
  </div>
  <div class="modal-body">
    Bla bla bla
  </div>
  <div class="modal-footer">
    Footer modal
  </div>
</div>
```

## What if i want to use Bootstrap 3 or 4?

We got you! An example boostrap alert modal component.

```typescript
import { Component } from '@angular/core';
import { NgxModalComponent } from 'ngx-modalview';

export interface AlertModel {
  title: string;
  message: string;
}

@Component({
  selector: 'alert',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Alert!'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'TADAA-AM!'}}</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="close()">OK</button>
                   </div>
                </div>
             </div>`
})
export class AlertComponent extends NgxModalComponent<AlertModel, null> implements AlertModel {
  title: string;
  message: string;
  constructor() {
    super();
  }
}
```

As you can see, the implementation is completely in your control. We're just here to help you create, configure, add, track inputs, and remove.

## Documentation

### NgxModalComponent
Super class of all modal components.
#### Class Overview
```typescript
/**
* Dialog abstract class
* @template T1 - input modal data
* @template T2 - modal result
*/
abstract abstract class NgxModalComponent<T1, T2> implements T1, OnDestroy {
    /**
    * Constructor
    * @param {NgxModalService} NgxModalService - instance of NgxModalService
    */
    constructor(NgxModalService: NgxModalService)

    /**
    * Dialog result
    * @type {T2}
    */
    protected result:T2

    /**
    * Closes modal
    */
    public close:Function

    /**
    * OnDestroy handler
    * Sends modal result to observer
    */
    public ngOnDestroy:Function
}
```

### NgxModalOptions
```typescript
interface NgxModalOptions {

  /**
  * clicking outside your content will be close the modal.
  * @default false
  * @type {boolean}
  */
  closeOnClickOutside?: boolean;

  /**
  * Flag to close modal by click on backdrop (outside modal)
  * @default false
  * @type {boolean}
  */
  closeOnEscape: boolean;

  /**
  * Class to put in document body while modal is open
  * @default 'modal-open'
  * @type {string}
  */
  bodyClass: string;


  /**
  * Default classes which live in modal wrapper. Change if you need to for your own css requirements
  * @default 'modal fade'
  * @type {string}
  */
  wrapperDefaultClasses: string,

  /**
  * Class we add and remove from modal when we add it/ remove it
  * @default 'in'
  * @type {string}
  */
  wrapperClass: string,
  /**
  * Time we wait while adding and removing to let animation play
  * @type {string}
  * @default 300
  */
  animationDuration: number;

  /**
  * FInds teh first focusable element in the page and applies focus on open  after closing restores focus back to previous
  * @type {boolean}
  * @default false
  */
  autoFocus: number;
}
```

### NgxModalService
Service to show and hide modals

### Class Overview
```typescript
class NgxModalService {
    /**
    * Adds modal
    * @param {Type<NgxModalComponent<T1, T2>} component - modal component
    * @param {T1?} data - Initialization data for component (optional) to add to component instance and can be used in component code or template
    * @param {NgxModalOptions?} Dialog options
    * @return {Observable<T2>} - returns Observable to get modal result
    */
    public addModal<T1, T2>(component:Type<NgxModalComponent<T1, T2>>, data?:T1, options: NgxModalOptions): Observable<T2> => {}

    /**
     * Remove a modal externally
     * @param [NgxModalComponent} component
     */
    public removeModal(component: NgxModalComponent<any, any>): void;

    /**
     * Removes all open modals in one go
     */
    public removeAll(): void {

}
```
