import { Routes } from '@angular/router';

export const routes: Routes = [
    // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
    { path: '', redirectTo: '/auth', pathMatch: "full" },
    { path: 'auth', loadChildren: () =>
        import('./auth/auth.module').then(m => m.AuthModule), 
    },
    { path: 'home', loadComponent: () =>
        import('./components/home/home.component').then(c => c.HomeComponent), 
    },
    { path: 'about-me', loadComponent: () =>
        import('./components/about-me/about-me.component').then(c => c.AboutMeComponent), 
    },
    // La ruta comodin debe ir siempre al final
    //{ path: '**', component: HomeComponent },
];