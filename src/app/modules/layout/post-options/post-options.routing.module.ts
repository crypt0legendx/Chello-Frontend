import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [    
    // { path: '', component: TimedPostComponent },
    // { path: 'photo-post', component: PhotoPostComponent },
    // { path: 'video-post', component: TimedPostComponent },
    // { path: 'audio-post', component: TimedPostComponent },
    // { path: 'fancam-post', component: FancamComponent },
    // { path: '*', redirectTo: 'photo-post'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostOptionsRoutingModule { }

