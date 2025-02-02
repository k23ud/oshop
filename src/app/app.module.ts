import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"oshop-713a0","appId":"1:141112207523:web:c99ec43229b230776fb716","storageBucket":"oshop-713a0.firebasestorage.app","apiKey":"AIzaSyBRzkoUiy8JoIqUB6UbilTRatu9egQoMQY","authDomain":"oshop-713a0.firebaseapp.com","messagingSenderId":"141112207523","measurementId":"G-QDY1198C0Q"})),
    provideAuth(() => getAuth()),
    AuthService,
    AuthGuardService,
    UserService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    AdminAuthGuardService,
    provideDatabase(() => getDatabase()),
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
