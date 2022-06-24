import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostOptionsModule } from '../post-options/post-options.module';
import { PostFeedComponent } from './components/post-feed.component';
const routes: Routes = [
  	
  {
    path: '',
    component: PostFeedComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostFeedRoutingModule { }
