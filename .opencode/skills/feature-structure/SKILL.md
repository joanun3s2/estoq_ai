---
name: feature-structure
description: Use when creating, moving, or organizing code in the estoq_ai Angular + Ionic app - new features, pages (smart components), dumb components, services with real/mock implementations, models, routes, or shared utilities/directives/pipes/consts. Enforces the feature-first folder layout, file/class naming, and the real-vs-mock service switch.
---

# Feature-first structure (Angular + Ionic)

Standard for all code under `src/app/**`. Follow it whenever you add, move, or
rename app code. Do not invent new top-level folders.

## Golden rules

1. **Feature-first.** Everything belongs to a feature, `core`, or `shared`.
   Never create a folder at `src/app/` root other than `core`, `features`,
   `shared`, and the `app.*` bootstrap files.
2. **A page is the smart component.** Only pages inject services and hold
   state. Components under a page are dumb: they take `input()` and emit
   `output()`.
3. **Features are isolated.** A feature must never import from another feature.
   Promote shared code to `shared/` (or `core/` if it is a singleton).
4. **`core/` = app-wide singletons** (one instance for app lifetime).
   **`shared/` = stateless, reusable, no singletons.**
5. **Standalone only.** Import just the Ionic components each component needs
   from `@ionic/angular` (no `IonicModule`). Angular 22 is standalone by
   default - do not add `standalone: true`.
6. **No barrels.** No `index.ts` re-export files. Import from the exact file.
7. **Aliases.** Use `@app/*` and `@env/*` imports, never deep `../../..`.
8. **Services come in real + mock pairs.** Switch with `environment.useMocks`.
   See the recipe below.
9. **All UI text lives in `shared/consts/texts.ts`** of the feature, exported as
   one `<FEATURE>_TEXTS` object. Never hardcode user-facing strings in templates,
   components, or routes. Routes read their header title from `texts.ts` via
   `data: { title: HOME_TEXTS.title }`.

## Directory layout

```
src/app/
├── core/                          # app-wide singletons (loaded once)
│   ├── guards/
│   ├── interceptors/
│   ├── models/                    # global domain models
│   └── services/                  # auth, storage, api-client, ...
├── features/
│   └── <feature>/
│       ├── <feature>.routes.ts
│       ├── models/                # feature-only models
│       ├── pages/
│       │   └── <page>/
│       │       ├── <page>.page.ts|html|scss|spec.ts   # SMART component
│       │       └── components/    # DUMB components for this page
│       │           └── <comp>/<comp>.component.ts|html|scss
│       ├── shared/                # OPTIONAL: reuse within this feature only
│       │   └── consts/texts.ts    # feature texts (e.g. HOME_TEXTS)
│       └── services/
│           ├── <name>.service.ts        # contract (interface + InjectionToken)
│           ├── <name>.http.service.ts   # real implementation
│           ├── <name>.mock.service.ts   # mocked implementation
│           ├── <name>.providers.ts      # picks real/mock via flag
│           └── mocks/
│               └── <name>.mocks.ts      # fixtures used by the mock service
├── shared/                        # cross-feature, stateless, reusable
│   ├── components/  directives/  pipes/  utils/  consts/  models/
├── app.component.ts|html|scss
└── app.routes.ts
```

## Naming conventions

| Thing                | File                              | Class / symbol              | Selector             |
| -------------------- | --------------------------------- | --------------------------- | -------------------- |
| Feature routes       | `orders.routes.ts`                | `ORDER_ROUTES`              | -                    |
| Page (smart)         | `order-list.page.ts`              | `OrderListPage`             | `app-order-list`     |
| Dumb component       | `order-card.component.ts`         | `OrderCardComponent`        | `app-order-card`     |
| Service contract     | `order.service.ts`                | `OrderService`, `ORDER_SERVICE` | -                |
| Real service         | `order.http.service.ts`           | `OrderHttpService`          | -                    |
| Mock service         | `order.mock.service.ts`           | `OrderMockService`          | -                    |
| Provider factory     | `order.providers.ts`              | `provideOrderService`       | -                    |
| Mock fixtures        | `order.mocks.ts`                  | `ORDERS_MOCK`, `orderMock()`| -                    |
| Model                | `order.model.ts`                  | `Order`                     | -                    |
| Util                 | `format-currency.util.ts`         | `formatCurrency`            | -                    |
| Const                | `order-status.const.ts`           | `ORDER_STATUS`              | -                    |
| Directive            | `highlight.directive.ts`          | `HighlightDirective`        | `[appHighlight]`     |
| Pipe                 | `time-ago.pipe.ts`                | `TimeAgoPipe`               | `timeAgo`            |
| Feature texts        | `shared/consts/texts.ts`          | `HOME_TEXTS` (nested keys)  | -                    |

Files are `kebab-case` with a role dot-suffix. Classes are `PascalCase` with a
role suffix.

## Where does code go?

| Code                                     | Location                                    |
| ---------------------------------------- | ------------------------------------------- |
| Screen the user navigates to             | `features/<f>/pages/<page>/`                |
| Presentational piece used by 1 page      | that page's `components/`                   |
| Presentational piece used by 2+ pages in the same feature | `features/<f>/shared/components/` |
| Presentational piece used by 2+ features | `shared/components/`                        |
| Stateful data access for a feature       | `features/<f>/services/` (contract+http+mock) |
| App-wide singleton (auth, token, api)    | `core/services/`                            |
| Model used by one feature                | `features/<f>/models/`                      |
| Model used across features               | `shared/models/` (or `core/models/`)        |
| Pure helper function                      | `shared/utils/`                             |
| Literal/enum/config map                  | `shared/consts/`                            |

## One-time setup

`environment.useMocks` and `environment.apiUrl` drive the service switch. Both
environment files must declare them:

`src/environments/environment.ts`
```ts
export const environment = {
  production: false,
  useMocks: true,
  apiUrl: 'http://localhost:3000',
};
```

`src/environments/environment.prod.ts`
```ts
export const environment = {
  production: true,
  useMocks: false,
  apiUrl: 'https://api.example.com',
};
```

Add these aliases to `tsconfig.json` `compilerOptions` so imports stay short
(TypeScript 6+ resolves `paths` relative to `tsconfig.json`, so no `baseUrl`):

```json
"paths": {
  "@app/*": ["./src/app/*"],
  "@env/*": ["./src/environments/*"]
}
```

The first HTTP service also requires `provideHttpClient()` in `src/main.ts`:

```ts
import { provideHttpClient } from '@angular/common/http';
// ...
providers: [ /* ... */ provideHttpClient() ],
```

## Recipe: new feature

1. Create `src/app/features/<feature>/` with `pages/`, `services/`, `models/`,
   and `<feature>.routes.ts`.
2. Add the feature to `src/app/app.routes.ts`:

```ts
{
  path: 'orders',
  loadChildren: () =>
    import('@app/features/orders/orders.routes').then((m) => m.ORDER_ROUTES),
},
```

3. `<feature>.routes.ts` providers array lists the feature's service factories:

```ts
import { Routes } from '@angular/router';
import { provideOrderService } from './services/order.providers';

export const ORDER_ROUTES: Routes = [
  {
    path: '',
    providers: [provideOrderService()],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@app/features/orders/pages/order-list/order-list.page').then(
            (m) => m.OrderListPage,
          ),
      },
    ],
  },
];
```

## Recipe: new page (smart component)

`order-list.page.ts`
```ts
import { Component, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { ORDER_SERVICE } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, OrderCardComponent],
})
export class OrderListPage {
  private readonly orderService = inject(ORDER_SERVICE);
  readonly orders = this.toSignal(this.orderService.getAll(), []);

  private toSignal<T>(source: Observable<T>, initial: T) {
    return toSignal(source, { initialValue: initial });
  }
}
```

- Only pages call services. Pass data down through component inputs.
- Add the page to its feature `<feature>.routes.ts`.

## Recipe: new dumb component

`order-card.component.ts`
```ts
import { Component, input, output } from '@angular/core';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  imports: [],
})
export class OrderCardComponent {
  readonly order = input.required<Order>();
  readonly selected = output<Order>();
}
```

- No service injection. Use `input()` / `output()` (signals).
- Use `OnPush`-friendly, stateless logic only.

## Recipe: new service with real + mock

Create all five files inside `features/<feature>/services/`.

`order.service.ts` - contract only, no implementation imports
```ts
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

export interface OrderService {
  getAll(): Observable<Order[]>;
  getById(id: string): Observable<Order>;
}

export const ORDER_SERVICE = new InjectionToken<OrderService>('OrderService');
```

`order.http.service.ts` - real implementation
```ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order.model';
import { OrderService } from './order.service';

@Injectable()
export class OrderHttpService implements OrderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/orders`;

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }
}
```

`order.mock.service.ts` - mocked implementation
```ts
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderService } from './order.service';
import { ORDERS_MOCK } from './mocks/order.mocks';

@Injectable()
export class OrderMockService implements OrderService {
  getAll(): Observable<Order[]> {
    return of(ORDERS_MOCK).pipe(delay(300));
  }

  getById(id: string): Observable<Order> {
    return of({ ...ORDERS_MOCK[0], id }).pipe(delay(200));
  }
}
```

`mocks/order.mocks.ts` - fixtures
```ts
import { Order } from '../../models/order.model';

export const ORDERS_MOCK: Order[] = [
  { id: '1', total: 42, status: 'open' },
];

export function orderMock(overrides: Partial<Order> = {}): Order {
  return { id: '1', total: 0, status: 'open', ...overrides };
}
```

`order.providers.ts` - the single switch point
```ts
import { Provider } from '@angular/core';
import { environment } from '@env/environment';
import { OrderHttpService } from './order.http.service';
import { OrderMockService } from './order.mock.service';
import { ORDER_SERVICE } from './order.service';

export function provideOrderService(): Provider {
  return {
    provide: ORDER_SERVICE,
    useClass: environment.useMocks ? OrderMockService : OrderHttpService,
  };
}
```

Consume only through the token, never the concrete classes:

```ts
private readonly orderService = inject(ORDER_SERVICE);
```

Never import a `*.http.service.ts` or `*.mock.service.ts` outside its
`<name>.providers.ts`.

## Checklist before finishing

- [ ] Folder lives under the correct `core` / `features/<f>` / `shared` location.
- [ ] Files use `kebab-case` + role suffix; classes use `PascalCase` + suffix.
- [ ] Page is the only place injecting services; components are dumb.
- [ ] No import from another feature.
- [ ] Standalone components; only required Ion components imported.
- [ ] No `index.ts` barrels; imports use `@app/*` / `@env/*`.
- [ ] Service has all five files and is consumed via its `InjectionToken`.
- [ ] `nvm use && npm run lint && npm run build` pass.
