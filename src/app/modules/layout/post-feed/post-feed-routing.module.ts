import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
