import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateUsersComponent } from './pages/menu/create/create-users/create-users.component';
import { CreateCategoriesComponent } from './pages/menu/create/create-categories/create-categories.component';
import { CreateProductsComponent } from './pages/menu/create/create-products/create-products.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/menu/orders/orders.component';
import { RemoveAndModifyComponent } from './pages/menu/remove-and-modify/remove-and-modify.component';
import { ImportComponent } from './pages/menu/import/import.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'createUsers',
        component: CreateUsersComponent
    },
    {
        path: 'createCategories',
        component: CreateCategoriesComponent
    },
    {
        path: 'createProducts',
        component: CreateProductsComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'remove_and_modify',
        component: RemoveAndModifyComponent
    },
    {
        path: 'import',
        component: ImportComponent
    }
];
