import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http'
// import { AuthService } from './services/auth/auth.service';
import { RequestHandlerService} from './services/request-handler.service';
// import { AuthGuard } from './guards/auth.guard';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { InjectionToken } from '@angular/core';
import { FirebaseOptions } from 'firebase/app';
import { LoadingComponent } from './components/loading/loading.component';
import { DailyClientComponent } from './components/daily-client/daily-client.component';
import { ConsolidateOutputComponent } from './components/consolidate-output/consolidate-output.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowfileComponent } from './components/showfile/showfile.component';
import { DmopGridsComponent } from './components/dmop-grids/dmop-grids.component';
import { FormsModule } from '@angular/forms';
export const FIREBASE_OPTIONS = new InjectionToken<FirebaseOptions>('FirebaseOptions');
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoadingComponent,
    DailyClientComponent,
    ConsolidateOutputComponent,
    ShowfileComponent,
    DmopGridsComponent,
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    // LoginComponent, // Export LoginComponent for use in other modules
  ],
  // providers: [AuthGuard,AuthService,RequestHandlerService],
  providers: [RequestHandlerService],
    // { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
